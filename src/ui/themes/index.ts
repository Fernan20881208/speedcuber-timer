import {
  adaptNavigationTheme,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {ColorSchemeName} from 'react-native';
import merge from 'deepmerge';

import {
  zaidAmoledTheme,
  zaidDarkTheme,
  zaidLightTheme,
  zaidLiquidGlassTheme,
} from './zaidThemes';

import {fonts} from './fonts';

import type {
  AppearanceMode,
} from '../../features/appearance/appearanceStorage';

const {
  LightTheme,
  DarkTheme,
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedLightTheme =
  merge(LightTheme, zaidLightTheme);

const combinedDarkTheme =
  merge(DarkTheme, zaidDarkTheme);

const combinedAmoledTheme =
  merge(DarkTheme, zaidAmoledTheme);

const combinedLiquidGlassTheme =
  merge(DarkTheme, zaidLiquidGlassTheme);

export function getTheme(
  mode: AppearanceMode,
  systemScheme: ColorSchemeName,
) {
  let resolvedMode: AppearanceMode = mode;

  if (mode === 'system') {
    resolvedMode =
      systemScheme === 'dark'
        ? 'dark'
        : 'light';
  }

  let baseTheme;

  switch (resolvedMode) {
    case 'light':
      baseTheme = combinedLightTheme;
      break;

    case 'amoled':
      baseTheme = combinedAmoledTheme;
      break;

    case 'liquidGlass':
      baseTheme = {
        ...combinedLiquidGlassTheme,
        colors: {
          ...combinedLiquidGlassTheme.colors,

          // React Navigation scene and drawer surfaces must remain translucent
          // so the native app-wide glass layer stays visible underneath.
          background: 'transparent',
          card: 'rgba(12, 14, 24, 0.70)',
          border: 'rgba(255, 255, 255, 0.16)',
          notification: '#D8C6FF',
        },
      };
      break;

    case 'dark':
    default:
      baseTheme = combinedDarkTheme;
      break;
  }

  return {
    ...baseTheme,

    roundness: 2,

    fonts,
  };
}
