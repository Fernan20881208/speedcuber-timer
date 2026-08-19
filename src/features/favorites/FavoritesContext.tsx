import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  loadFavoriteAttemptIds,
  saveFavoriteAttemptIds,
} from './favoritesStorage';

interface FavoritesContextValue {
  favoriteIds:
    ReadonlySet<string>;

  isFavorite: (
    attemptId: string,
  ) => boolean;

  toggleFavorite: (
    attemptId: string,
  ) => void;

  removeFavorite: (
    attemptId: string,
  ) => void;
}

const FavoritesContext =
  createContext<
    FavoritesContextValue | undefined
  >(undefined);

export function FavoritesProvider({
  children,
}: PropsWithChildren) {
  const [
    favoriteIds,
    setFavoriteIds,
  ] =
    useState<
      Set<string>
    >(
      new Set(),
    );

  useEffect(() => {
    let mounted = true;

    loadFavoriteAttemptIds()
      .then(ids => {
        if (mounted) {
          setFavoriteIds(
            new Set(ids),
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  function isFavorite(
    attemptId: string,
  ) {
    return favoriteIds.has(
      attemptId,
    );
  }

  function toggleFavorite(
    attemptId: string,
  ) {
    setFavoriteIds(
      previous => {
        const next =
          new Set(previous);

        if (
          next.has(attemptId)
        ) {
          next.delete(
            attemptId,
          );
        } else {
          next.add(
            attemptId,
          );
        }

        void saveFavoriteAttemptIds(
          Array.from(next),
        );

        return next;
      },
    );
  }

  function removeFavorite(
    attemptId: string,
  ) {
    setFavoriteIds(
      previous => {
        if (
          !previous.has(
            attemptId,
          )
        ) {
          return previous;
        }

        const next =
          new Set(previous);

        next.delete(
          attemptId,
        );

        void saveFavoriteAttemptIds(
          Array.from(next),
        );

        return next;
      },
    );
  }

  const value =
    useMemo(
      () => ({
        favoriteIds,

        isFavorite,

        toggleFavorite,

        removeFavorite,
      }),
      [
        favoriteIds,
      ],
    );

  return (
    <FavoritesContext.Provider
      value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(
      FavoritesContext,
    );

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider',
    );
  }

  return context;
}
