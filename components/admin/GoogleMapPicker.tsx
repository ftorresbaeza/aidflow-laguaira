'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Props {
  lat: number;
  lng: number;
  onMove: (lat: number, lng: number) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  mapTypeId: 'hybrid' as const,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: false,
};

export function GoogleMapPicker({ lat, lng, onMove }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });
  const mapRef = useRef<google.maps.Map | null>(null);

  // Sync when parent updates coords (e.g. after GPS capture with "Usar mi ubicación")
  useEffect(() => {
    if (lat !== markerPosition.lat || lng !== markerPosition.lng) {
      setMarkerPosition({ lat, lng });
      mapRef.current?.panTo({ lat, lng });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setMarkerPosition({ lat: newLat, lng: newLng });
        onMove(newLat, newLng);
      }
    },
    [onMove]
  );

  const handleMarkerDragEnd = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setMarkerPosition({ lat: newLat, lng: newLng });
        onMove(newLat, newLng);
      }
    },
    [onMove]
  );

  if (!isLoaded || typeof google === 'undefined') {
    return (
      <div style={mapContainerStyle} className="bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={markerPosition}
      zoom={17}
      options={mapOptions}
      onClick={handleMapClick}
      onLoad={(map) => { mapRef.current = map; }}
    >
      <Marker
        position={markerPosition}
        draggable
        onDragEnd={handleMarkerDragEnd}
      />
    </GoogleMap>
  );
}
