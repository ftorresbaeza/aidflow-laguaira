'use client';

import { useEffect, useRef, useState } from 'react';
import { getLocalDB, type FormDraft } from '@/lib/db/local-db';
import type { RegistrationInput } from '@/lib/actions/registration';

export function useFormDraft() {
  const [pending, setPending] = useState<{ data: Partial<RegistrationInput>; step: number } | null>(null);
  const [ready, setReady] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount: check for existing draft
  useEffect(() => {
    const db = getLocalDB();
    if (!db) { setReady(true); return; }
    db.formDraft.get(1).then((draft) => {
      if (draft && draft.data.fullName) {
        setPending({ data: draft.data, step: draft.step });
      }
      setReady(true);
    });
  }, []);

  // Save form state to IndexedDB, debounced 800ms
  function scheduleSave(data: Partial<RegistrationInput>, step: number) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const db = getLocalDB();
      if (!db) return;
      const record: FormDraft = { id: 1, data, step, savedAt: Date.now() };
      db.formDraft.put(record);
    }, 800);
  }

  async function clearDraft() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const db = getLocalDB();
    if (db) await db.formDraft.delete(1);
    setPending(null);
  }

  return { pending, ready, scheduleSave, clearDraft };
}
