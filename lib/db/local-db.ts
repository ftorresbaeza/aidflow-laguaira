import Dexie, { Table } from 'dexie';
import type { RegistrationInput } from '@/lib/actions/registration';

export interface FormDraft {
  id: 1;
  data: Partial<RegistrationInput>;
  step: number;
  savedAt: number;
}

export interface PendingScan {
  id?: number;
  token: string;
  location?: string;
  queuedAt: number;
  synced: boolean;
}

export interface ScanRecord {
  id?: number;
  token: string;
  scannedAt: number;
  location?: string;
  delivery: {
    id: string;
    fullName: string;
    cedula: string;
    personRole: string;
    plate?: string | null;
    destSector: string;
    recipient: string;
    aidType: string;
    quantity: string;
    priority: string;
    status: string;
  };
}

class AidFlowDB extends Dexie {
  formDraft!: Table<FormDraft, number>;
  pendingScans!: Table<PendingScan, number>;
  scanHistory!: Table<ScanRecord, number>;

  constructor() {
    super('aidflow-laguaira');
    this.version(1).stores({
      formDraft: 'id',
      pendingScans: '++id, synced, queuedAt',
      scanHistory: '++id, scannedAt',
    });
  }
}

let _instance: AidFlowDB | null = null;

export function getLocalDB(): AidFlowDB | null {
  if (typeof window === 'undefined') return null;
  if (!_instance) _instance = new AidFlowDB();
  return _instance;
}
