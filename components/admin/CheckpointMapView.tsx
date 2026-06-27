'use client';

import { useState, useCallback, useRef, useEffect, Fragment } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

type QRType = 'DYNAMIC' | 'STATIC';

interface Checkpoint {
  id: string;
  name: string;
  building: string | null;
  floor: string | null;
  sector: string | null;
  lat: number | null;
  lng: number | null;
  gpsRadius: number | null;
  qrType: QRType;
  order: number | null;
  isActive: boolean;
}

interface Props {
  checkpoints: Checkpoint[];
  onMapClick?: (lat: number, lng: number) => void;
  onCheckpointClick?: (checkpoint: Checkpoint) => void;
  onMarkerDragEnd?: (id: string, lat: number, lng: number) => void;
  pendingPin?: { lat: number; lng: number } | null;
  onPendingPinDragEnd?: (lat: number, lng: number) => void;
  pendingOrder?: number;
  addMode?: boolean;
  editingId?: string | null;
  center?: { lat: number; lng: number };
  flyTo?: { lat: number; lng: number };
  height?: string;
}

const mapContainerStyle = (height: string) => ({ width: '100%', height });

function getPinSvg(number: number, label?: string, color = '#f59e0b'): string {
  if (label) {
    const maxLen = 18;
    const display = label.length > maxLen ? label.slice(0, maxLen) + '…' : label;
    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="68" viewBox="0 0 80 68">
        <g transform="translate(22,0)">
          <path fill="${color}" stroke="white" stroke-width="2" d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z"/>
          <circle cx="18" cy="18" r="12" fill="white"/>
          <text x="18" y="23" text-anchor="middle" fill="#374151" font-size="13" font-weight="bold" font-family="Arial,sans-serif">${number}</text>
        </g>
        <rect x="1" y="50" width="78" height="17" rx="4" fill="rgba(17,24,39,0.75)"/>
        <text x="40" y="63" text-anchor="middle" fill="white" font-size="10" font-family="Arial,sans-serif">${display}</text>
      </svg>`
    )}`;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
      <path fill="${color}" stroke="white" stroke-width="2" d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z"/>
      <circle cx="18" cy="18" r="12" fill="white"/>
      <text x="18" y="23" text-anchor="middle" fill="#374151" font-size="14" font-weight="bold" font-family="Arial,sans-serif">${number}</text>
    </svg>`
  )}`;
}

export function CheckpointMapView({
  checkpoints,
  onMapClick,
  onCheckpointClick,
  onMarkerDragEnd,
  pendingPin,
  onPendingPinDragEnd,
  pendingOrder = 1,
  addMode = false,
  center,
  flyTo,
  editingId,
  height = '100%',
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });
  const [selectedCp, setSelectedCp] = useState<Checkpoint | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const circlesRef = useRef<Map<string, google.maps.Circle>>(new Map());

  const validCheckpoints = checkpoints.filter(
    (cp): cp is Checkpoint & { lat: number; lng: number } => cp.lat !== null && cp.lng !== null
  );

  const defaultCenter = useRef(
    center ??
    (validCheckpoints.length > 0
      ? { lat: validCheckpoints[0].lat, lng: validCheckpoints[0].lng }
      : { lat: -33.4569, lng: -70.6483 })
  );

  useEffect(() => {
    if (flyTo && mapRef.current) {
      mapRef.current.panTo(flyTo);
      mapRef.current.setZoom(17);
    }
  }, [flyTo]);

  // Imperatively manage circles so old overlays are always destroyed on move/delete
  useEffect(() => {
    if (!mapInstance) return;
    const activeIds = new Set(
      validCheckpoints.filter(cp => cp.gpsRadius && cp.gpsRadius > 0).map(cp => cp.id)
    );
    // Remove circles for deleted or radius-cleared checkpoints
    for (const [id, circle] of circlesRef.current) {
      if (!activeIds.has(id)) {
        circle.setMap(null);
        circlesRef.current.delete(id);
      }
    }
    // Create or update
    for (const cp of validCheckpoints) {
      if (!cp.gpsRadius || cp.gpsRadius <= 0) continue;
      const existing = circlesRef.current.get(cp.id);
      if (existing) {
        existing.setCenter({ lat: cp.lat, lng: cp.lng });
        existing.setRadius(cp.gpsRadius);
      } else {
        const circle = new google.maps.Circle({
          map: mapInstance,
          center: { lat: cp.lat, lng: cp.lng },
          radius: cp.gpsRadius,
          strokeColor: '#10b981',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#10b981',
          fillOpacity: 0.15,
        });
        circlesRef.current.set(cp.id, circle);
      }
    }
  }, [mapInstance, validCheckpoints]);

  // Destroy all circles on unmount
  useEffect(() => {
    return () => {
      for (const circle of circlesRef.current.values()) circle.setMap(null);
      circlesRef.current.clear();
    };
  }, []);


  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng && onMapClick) onMapClick(e.latLng.lat(), e.latLng.lng());
    },
    [onMapClick]
  );

  if (!isLoaded || typeof google === 'undefined') {
    return (
      <div style={mapContainerStyle(height)} className="bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle(height)}
      center={defaultCenter.current}
      zoom={17}
      options={{
        mapTypeId: 'hybrid',
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: 'greedy',
        draggableCursor: addMode ? 'crosshair' : undefined,
        clickableIcons: false,
      }}
      onClick={handleMapClick}
      onLoad={(map) => {
        mapRef.current = map;
        setMapInstance(map);
        setTimeout(() => google.maps.event.trigger(map, 'resize'), 50);
      }}
    >
      {validCheckpoints.map((cp, index) => {
        const order = cp.order ?? index + 1;
        return (
          <Fragment key={cp.id}>
            <Marker
              position={{ lat: cp.lat, lng: cp.lng }}
              icon={{
                url: getPinSvg(order, cp.name, '#10b981'),
                scaledSize: new google.maps.Size(80, 68),
                anchor: new google.maps.Point(40, 48),
              }}
              draggable={!!onMarkerDragEnd && editingId === cp.id}
              onClick={() => {
                setSelectedCp(cp);
                onCheckpointClick?.(cp);
              }}
              onDragEnd={(e) => {
                if (e.latLng && onMarkerDragEnd) onMarkerDragEnd(cp.id, e.latLng.lat(), e.latLng.lng());
              }}
              title={cp.name}
            />
          </Fragment>
        );
      })}

      {pendingPin && (
        <Marker
          position={pendingPin}
          draggable
          icon={{
            url: getPinSvg(pendingOrder, undefined, '#f97316'),
            scaledSize: new google.maps.Size(36, 48),
            anchor: new google.maps.Point(18, 48),
          }}
          onDragEnd={(e) => {
            if (e.latLng && onPendingPinDragEnd) onPendingPinDragEnd(e.latLng.lat(), e.latLng.lng());
          }}
          zIndex={1000}
        />
      )}

      {selectedCp && selectedCp.lat && selectedCp.lng && (
        <InfoWindow
          position={{ lat: selectedCp.lat, lng: selectedCp.lng }}
          onCloseClick={() => setSelectedCp(null)}
        >
          <div className="p-1 min-w-[160px]">
            <p className="font-semibold text-sm text-gray-900">{selectedCp.name}</p>
            {(selectedCp.building || selectedCp.floor || selectedCp.sector) && (
              <p className="text-xs text-gray-500 mt-0.5">
                {[selectedCp.building, selectedCp.floor && `Piso ${selectedCp.floor}`, selectedCp.sector]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1 font-mono">
              {selectedCp.lat.toFixed(6)}, {selectedCp.lng.toFixed(6)}
            </p>
            {selectedCp.gpsRadius && (
              <p className="text-xs text-emerald-600 mt-0.5">Radio: {selectedCp.gpsRadius}m</p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">
              {selectedCp.qrType === 'DYNAMIC' ? 'QR Dinámico' : 'QR Estático'}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
