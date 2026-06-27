'use client';

import dynamic from 'next/dynamic';
import { useJsApiLoader } from '@react-google-maps/api';

const CheckpointMapPicker = dynamic(
  () => import('./CheckpointMapPicker').then((m) => m.CheckpointMapPicker),
  { ssr: false, loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" /> }
);

const GoogleMapPicker = dynamic(
  () => import('./GoogleMapPicker').then((m) => m.GoogleMapPicker),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

interface Props {
  lat: number;
  lng: number;
  onMove: (lat: number, lng: number) => void;
  mapType?: 'google' | 'leaflet';
}

function MapFallbackInner({ lat, lng, onMove }: Omit<Props, 'mapType'>) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });

  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <GoogleMapPicker lat={lat} lng={lng} onMove={onMove} />
    </div>
  );
}

export function MapFallback({ lat, lng, onMove, mapType = 'google' }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (mapType === 'leaflet' || !apiKey) {
    return (
      <div className="h-full w-full">
        <CheckpointMapPicker lat={lat} lng={lng} onMove={onMove} />
      </div>
    );
  }

  return <MapFallbackInner lat={lat} lng={lng} onMove={onMove} />;
}
