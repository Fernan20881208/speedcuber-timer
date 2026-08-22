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

          // Navigation must reveal GlassBackdrop. Native glass is applied to
          // cards, bars, drawers and modals instead of tinting the whole scene.
          background: 'transparent',
          card: 'rgba(255, 255, 255, 0.055)',
          border: 'rgba(255, 255, 255, 0.13)',
          notification: '#F1E9FF',
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

    roundness:
      resolvedMode === 'liquidGlass'
        ? 5
        : 2,

    fonts,
  };
}
