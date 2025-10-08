import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ocean-notes';

/**
 * PUBLIC_INTERFACE
 * useLocalNotes
 * Hook to encapsulate localStorage load/save for notes.
 */
export function useLocalNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setNotes(parsed);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load notes from localStorage', e);
    }
  }, []);

  const saveAll = useCallback((list) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save notes to localStorage', e);
    }
  }, []);

  return { notes, saveAll, setNotes };
}
