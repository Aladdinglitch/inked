"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "ink-attraction-favorites";
const CHANGE_EVENT = "ink-attraction-favorites-change";
const EMPTY_FAVORITES = "[]";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(KEY) ?? EMPTY_FAVORITES;
}

export function useFavorites() {
  const serializedFavorites = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_FAVORITES);
  const favorites = useMemo(() => {
    try {
      return new Set(JSON.parse(serializedFavorites) as string[]);
    } catch {
      return new Set<string>();
    }
  }, [serializedFavorites]);

  const toggle = useCallback((id: string) => {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    window.localStorage.setItem(KEY, JSON.stringify([...next]));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [favorites]);

  return { favorites, toggle };
}
