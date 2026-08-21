import {
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

export type ZaidThemeMode =
  | 'system'
  | 'light'
  | 'dark'
  | 'amoled'
  | 'liquidGlass';

export const zaidLightTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    primary: '#6750A4',
    secondary: '#625B71',
  },
};

export const zaidDarkTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    primary: '#D0BCFF',
    secondary: '#CCC2DC',
  },
};

export const zaidAmoledTheme = {
  ...MD3DarkTheme,

  dark: true,

  colors: {
    ...MD3DarkTheme.colors,

    primary: '#A78BFA',
    onPrimary: '#160B2D',

    primaryContainer: '#27134C',
    onPrimaryContainer: '#E9DDFF',

    secondary: '#67E8F9',
    onSecondary: '#00363D',

    background: '#000000',
    onBackground: '#FFFFFF',

    surface: '#000000',
    onSurface: '#FFFFFF',

    surfaceVariant: '#0A0A0A',
    onSurfaceVariant: '#E5E5E5',

    surfaceDisabled: '#080808',

    outline: '#404040',
    outlineVariant: '#262626',

    error: '#FFB4AB',

    elevation: {
      level0: 'transparent',

      level1: '#050505',
      level2: '#080808',
      level3: '#0A0A0A',
      level4: '#0D0D0D',
      level5: '#101010',
    },
  },
};

export const zaidLiquidGlassTheme = {
  ...MD3DarkTheme,

  dark: true,

  colors: {
    ...MD3DarkTheme.colors,

    primary: '#D8C6FF',
    onPrimary: '#28134F',

    primaryContainer: 'rgba(111, 72, 190, 0.38)',
    onPrimaryContainer: '#F0E7FF',

    secondary: '#9BE8F5',
    onSecondary: '#00363D',

    background: 'transparent',
    onBackground: '#F7F3FF',

    surface: 'rgba(18, 20, 31, 0.34)',
    onSurface: '#F7F3FF',

    surfaceVariant: 'rgba(40, 42, 57, 0.38)',
    onSurfaceVariant: '#E5E1EC',

    surfaceDisabled: 'rgba(18, 20, 31, 0.24)',

    outline: 'rgba(255, 255, 255, 0.32)',
    outlineVariant: 'rgba(255, 255, 255, 0.16)',

    error: '#FFB4AB',

    elevation: {
      level0: 'transparent',
      level1: 'rgba(18, 20, 31, 0.22)',
      level2: 'rgba(18, 20, 31, 0.28)',
      level3: 'rgba(18, 20, 31, 0.34)',
      level4: 'rgba(18, 20, 31, 0.40)',
      level5: 'rgba(18, 20, 31, 0.46)',
    },
  },
};
