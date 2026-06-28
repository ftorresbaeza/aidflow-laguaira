'use client';

import { useCallback, useEffect, useState } from 'react';
import { getLocalDB, type ScanRecord } from '@/lib/db/local-db';
import { recordScan } from '@/lib/actions/admin';

const MAX_HISTORY = 50;

export function useScanQueue() {
  const [pendingCount, setPendingCount] = useState(0);
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [syncing, setSyncing] = useState(false);

  async function reload() {
    const db = getLocalDB();
    if (!db) return;
    const count = await db.pendingScans.where('synced').equals(0).count();
    setPendingCount(count);
    const recent = await db.scanHistory.orderBy('scannedAt').reverse().limit(30).toArray();
    setHistory(recent);
  }

  useEffect(() => { reload(); }, []);

  async function saveToHistory(record: Omit<ScanRecord, 'id'>) {
    const db = getLocalDB();
    if (!db) return;
    await db.scanHistory.add(record);
    // Keep only MAX_HISTORY entries
    const all = await db.scanHistory.orderBy('scannedAt').toArray();
    if (all.length > MAX_HISTORY) {
      const toDelete = all.slice(0, all.length - MAX_HISTORY).map((s) => s.id!);
      await db.scanHistory.bulkDelete(toDelete);
    }
    await reload();
  }

  async function queueScan(token: string, location?: string) {
    const db = getLocalDB();
    if (!db) return;
    await db.pendingScans.add({ token, location, queuedAt: Date.now(), synced: false });
    await reload();
  }

  const syncPending = useCallback(async () => {
    const db = getLocalDB();
    if (!db) return;
    const pending = await db.pendingScans.where('synced').equals(0).toArray();
    if (pending.length === 0) return;

    setSyncing(true);
    for (const scan of pending) {
      try {
        const result = await recordScan(scan.token, scan.location);
        if (result.success && result.delivery) {
          await db.pendingScans.update(scan.id!, { synced: true });
          await saveToHistory({
            token: scan.token,
            scannedAt: scan.queuedAt,
            location: scan.location,
            delivery: result.delivery,
          });
        } else {
          // QR inválido — nunca se va a sincronizar, descartar
          await db.pendingScans.delete(scan.id!);
        }
      } catch {
        // Todavía sin conexión, dejar en cola
        break;
      }
    }
    await db.pendingScans.where('synced').equals(1).delete();
    await reload();
    setSyncing(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sincronizar automáticamente al recuperar conexión
  useEffect(() => {
    window.addEventListener('online', syncPending);
    return () => window.removeEventListener('online', syncPending);
  }, [syncPending]);

  return { pendingCount, history, syncing, queueScan, saveToHistory, syncPending };
}
