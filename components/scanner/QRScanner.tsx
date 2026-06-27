'use client';

import { useEffect, useRef, useState, useCallback } from 'react';


interface QRScannerProps {
  onScan: (decodedText: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  
  const [active, setActive]             = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [zoom, setZoom]                 = useState(1);
  const [maxZoom, setMaxZoom]           = useState(5);
  const [zoomSupported, setZoomSupported] = useState(false);
  const [flashSupported, setFlashSupported] = useState(false);
  const [flashOn, setFlashOn]           = useState(false);
  const [capturing, setCapturing]       = useState(false);
  const [engine, setEngine]             = useState<'BarcodeDetector' | 'jsQR' | null>(null);

  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const streamRef   = useRef<MediaStream | null>(null);
  const rafRef      = useRef<number | null>(null);
  const doneRef     = useRef(false);
  const zoomingRef  = useRef(false);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cache jsQR module so we don't re-import on every frame
  const jsQRRef     = useRef<((data: Uint8ClampedArray, w: number, h: number, opts?: any) => any) | null>(null);

  const stopScanner = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
    zoomingRef.current = false;
    setActive(false);
    setFlashSupported(false);
    setFlashOn(false);
    setZoomSupported(false);
    setZoom(1);
    setEngine(null);
  }, []);

  const startScanner = useCallback(async () => {
    if (!videoRef.current) return;
    setError(null);
    doneRef.current = false;

    try {
      // Try environment camera first (mobile), then any camera (PC)
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
      } catch {
        // Fallback to any camera for PC
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        });
      }
      if (!stream) throw new Error('No camera available');
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setActive(true);

      const track = stream.getVideoTracks()[0];
      const caps = track.getCapabilities() as any;

      // Zoom
      if (caps?.zoom) {
        setZoomSupported(true);
        setMaxZoom(caps.zoom.max ?? 5);
        setZoom(caps.zoom.min ?? 1);
      }

      // Flash / torch
      if (caps?.torch) setFlashSupported(true);

      // Autofocus
      setTimeout(() => {
        track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as any] }).catch(() => {});
      }, 300);

      // ── Engine selection ──────────────────────────────────────────────────
      const BD = (window as any).BarcodeDetector;
      const hasBD = typeof BD === 'function';

      if (hasBD) {
        setEngine('BarcodeDetector');
        const detector = new BD({ formats: ['qr_code'] });
        const loop = async () => {
          const v = videoRef.current;
          if (!v || v.readyState < 2) { rafRef.current = requestAnimationFrame(loop); return; }
          if (!zoomingRef.current) {
            try {
              const codes = await detector.detect(v);
              if (codes.length > 0 && !doneRef.current) {
                doneRef.current = true;
                const value = codes[0].rawValue;
                stopScanner();
                onScan(value);
                return;
              }
            } catch { /* ignore decode errors */ }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

      } else {
        // jsQR fallback — import once and cache
        setEngine('jsQR');
        if (!jsQRRef.current) {
          jsQRRef.current = (await import('jsqr')).default;
        }
        const jsQR = jsQRRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const loop = () => {
          const v = videoRef.current;
          if (!v || v.readyState < 2) { rafRef.current = requestAnimationFrame(loop); return; }
          canvas.width = v.videoWidth;
          canvas.height = v.videoHeight;
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          if (!zoomingRef.current) {
            const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(data, width, height, { inversionAttempts: 'dontInvert' });
            if (code?.data && !doneRef.current) {
              doneRef.current = true;
              const value = code.data;
              stopScanner();
              onScan(value);
              return;
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      }
    } catch {
      setError('Error al acceder a la cámara');
    }
  }, [onScan, stopScanner]);

  const applyZoom = async (level: number) => {
    const z = Math.max(1, Math.min(level, maxZoom));
    zoomingRef.current = true;
    if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = setTimeout(() => { zoomingRef.current = false; }, 800);
    try {
      const track = streamRef.current?.getVideoTracks()[0];
      await track?.applyConstraints({ advanced: [{ zoom: z } as any] });
      setZoom(z);
    } catch { /* ignore */ }
  };

  const handleTapFocus = async (e: React.MouseEvent<HTMLVideoElement>) => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    try {
      await track.applyConstraints({ advanced: [{ focusMode: 'manual', pointOfInterest: { x, y } } as any] });
      setTimeout(() => track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as any] }).catch(() => {}), 1500);
    } catch { /* ignore */ }
  };

  const toggleFlash = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    const next = !flashOn;
    try {
      await track.applyConstraints({ advanced: [{ torch: next } as any] });
      setFlashOn(next);
    } catch { /* ignore */ }
  };

  /** Manual capture: run detection on the current frame */
  const handleCapture = async () => {
    const v = videoRef.current;
    if (!v || capturing) return;
    setCapturing(true);
    try {
      const BD = (window as any).BarcodeDetector;
      const hasBD = typeof BD === 'function';

      if (hasBD) {
        const detector = new BD({ formats: ['qr_code'] });
        const codes = await detector.detect(v);
        if (codes.length > 0 && !doneRef.current) {
          doneRef.current = true;
          const value = codes[0].rawValue;
          stopScanner();
          onScan(value);
          return;
        }
      } else {
        if (!jsQRRef.current) jsQRRef.current = (await import('jsqr')).default;
        const jsQR = jsQRRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = v.videoWidth;
        canvas.height = v.videoHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(v, 0, 0);
        // Try both normal and inverted on manual capture for better hit rate
        const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(data, width, height, { inversionAttempts: 'attemptBoth' });
        if (code?.data && !doneRef.current) {
          doneRef.current = true;
          const value = code.data;
          stopScanner();
          onScan(value);
          return;
        }
      }
      setError('No se detectó un QR válido');
      setTimeout(() => setError(null), 3000);
    } catch {
      setError('No se detectó un QR válido');
      setTimeout(() => setError(null), 3000);
    } finally {
      setCapturing(false);
    }
  };

  useEffect(() => {
    // Auto-start only on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      startScanner().catch(() => {});
    }
    return stopScanner;
  }, [startScanner, stopScanner]);

  return (
    <div className="space-y-3">
      {/* Camera viewport */}
      <div className="relative rounded-2xl overflow-hidden bg-black" style={{ minHeight: 'min(62vh, 420px)' }}>
        <video
          ref={videoRef}
          onClick={handleTapFocus}
          playsInline
          muted
          className="w-full h-full object-cover cursor-crosshair"
          style={{ minHeight: 'min(62vh, 420px)' }}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Engine badge */}
        {active && engine && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="text-xs text-white/60 font-mono">{engine}</span>
          </div>
        )}

        {/* Scan overlay */}
        {active && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-56 h-56">
              <span className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
              <p className="absolute -bottom-7 left-0 right-0 text-center text-white/60 text-xs">
                {'Toca para enfocar'}
              </p>
            </div>
          </div>
        )}

        {/* Zoom controls */}
        {active && zoomSupported && (
          <div className="absolute right-3 bottom-4 flex flex-col items-center gap-1.5 z-10">
            <button
              onPointerDown={(e) => { e.preventDefault(); applyZoom(zoom + 0.5); }}
              className="w-11 h-11 rounded-full bg-black/60 text-white text-2xl font-light flex items-center justify-center backdrop-blur-sm active:bg-black/80"
            >+</button>
            <span className="text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {zoom.toFixed(1)}×
            </span>
            <button
              onPointerDown={(e) => { e.preventDefault(); applyZoom(zoom - 0.5); }}
              className="w-11 h-11 rounded-full bg-black/60 text-white text-2xl font-light flex items-center justify-center backdrop-blur-sm active:bg-black/80"
            >−</button>
          </div>
        )}

        {/* Flash toggle */}
        {active && flashSupported && (
          <button
            onClick={toggleFlash}
            className={`absolute left-3 bottom-4 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm z-10 transition-colors ${
              flashOn ? 'bg-yellow-400 text-black' : 'bg-black/60 text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </p>
      )}

      {/* Actions */}
      {active ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCapture}
            disabled={capturing}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            {capturing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0010.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            )}
            <span>{capturing ? 'Procesando...' : 'Capturar'}</span>
          </button>
          <button onClick={stopScanner} className="btn-secondary py-3 text-sm">
            {'Detener cámara'}
          </button>
        </div>
      ) : (
        <button onClick={startScanner} className="btn-primary w-full">
          {'Iniciar cámara'}
        </button>
      )}

      <p className="text-center text-xs text-gray-400">
        {'Detección automática de QR'}
      </p>
    </div>
  );
}