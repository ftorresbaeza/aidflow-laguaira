'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Avoid Next.js PNG import issues — use a CSS div pin
const pinIcon = L.divIcon({
  html: `<div style="
    width:22px;height:22px;
    background:#10b981;
    border:3px solid white;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 2px 6px rgba(0,0,0,0.35);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  className: '',
});

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const prev = useRef({ lat, lng });
  useEffect(() => {
    if (prev.current.lat !== lat || prev.current.lng !== lng) {
      map.flyTo([lat, lng], 17, { animate: true, duration: 0.8 });
      prev.current = { lat, lng };
    }
  }, [lat, lng, map]);
  return null;
}

function DraggableMarker({
  lat,
  lng,
  onMove,
}: {
  lat: number;
  lng: number;
  onMove: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  useMapEvents({
    click(e) {
      onMove(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      draggable
      position={[lat, lng]}
      icon={pinIcon}
      ref={markerRef}
      eventHandlers={{
        dragend() {
          const m = markerRef.current;
          if (m) {
            const p = m.getLatLng();
            onMove(p.lat, p.lng);
          }
        },
      }}
    />
  );
}

interface Props {
  lat: number;
  lng: number;
  onMove: (lat: number, lng: number) => void;
}

export function CheckpointMapPicker({ lat, lng, onMove }: Props) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: 260 }}>
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater lat={lat} lng={lng} />
        <DraggableMarker lat={lat} lng={lng} onMove={onMove} />
      </MapContainer>
    </div>
  );
}
