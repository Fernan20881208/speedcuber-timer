import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useColorScheme,
} from 'react-native';

import {
  AppearanceMode,
  loadAppearanceMode,
  saveAppearanceMode,
} from './appearanceStorage';

import {
  getTheme,
} from '../../ui/themes';

interface AppearanceContextValue {
  mode: AppearanceMode;

  setMode: (
    mode: AppearanceMode,
  ) => Promise<void>;

  theme: ReturnType<typeof getTheme>;
}

const AppearanceContext =
  createContext<
    AppearanceContextValue | undefined
  >(undefined);

export function AppearanceProvider({
  children,
}: PropsWithChildren) {
  const systemScheme = useColorScheme();

  const [mode, setModeState] =
    useState<AppearanceMode>('system');

  useEffect(() => {
    let mounted = true;

    loadAppearanceMode().then(value => {
      if (mounted) {
        setModeState(value);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  async function setMode(
    newMode: AppearanceMode,
  ) {
    setModeState(newMode);

    await saveAppearanceMode(
      newMode,
    );
  }

  const theme = useMemo(
    () =>
      getTheme(
        mode,
        systemScheme,
      ),
    [
      mode,
      systemScheme,
    ],
  );

  return (
    <AppearanceContext.Provider
      value={{
        mode,
        setMode,
        theme,
      }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context =
    useContext(
      AppearanceContext,
    );

  if (!context) {
    throw new Error(
      'useAppearance must be used inside AppearanceProvider',
    );
  }

  return context;
}
