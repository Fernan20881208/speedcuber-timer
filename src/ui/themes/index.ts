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
      // Temporal.
      // Liquid Glass real se agregará después.
      baseTheme = combinedDarkTheme;
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
