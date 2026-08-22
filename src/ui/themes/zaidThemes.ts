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

/**
 * Liquid Glass deliberately avoids opaque Material containers.
 * Native LiquidGlassView provides the material; Paper only supplies text,
 * icons and very light translucent state layers above it.
 */
export const zaidLiquidGlassTheme = {
  ...MD3DarkTheme,

  dark: true,

  colors: {
    ...MD3DarkTheme.colors,

    primary: '#F1E9FF',
    onPrimary: '#21172F',
    primaryContainer: 'rgba(255, 255, 255, 0.11)',
    onPrimaryContainer: '#FCF8FF',

    secondary: '#BDEFFF',
    onSecondary: '#08252D',
    secondaryContainer: 'rgba(255, 255, 255, 0.08)',
    onSecondaryContainer: '#EDFBFF',

    tertiary: '#FFD0E8',
    onTertiary: '#321426',
    tertiaryContainer: 'rgba(255, 255, 255, 0.07)',
    onTertiaryContainer: '#FFF4FA',

    background: 'transparent',
    onBackground: '#F8F5FF',

    surface: 'rgba(8, 10, 18, 0.10)',
    onSurface: '#F8F5FF',

    surfaceVariant: 'rgba(255, 255, 255, 0.06)',
    onSurfaceVariant: '#E6E1EC',

    surfaceDisabled: 'rgba(255, 255, 255, 0.045)',
    onSurfaceDisabled: 'rgba(248, 245, 255, 0.38)',
    surfaceTint: 'transparent',

    inverseSurface: 'rgba(247, 243, 255, 0.92)',
    inverseOnSurface: '#17151C',
    inversePrimary: '#68558D',

    outline: 'rgba(255, 255, 255, 0.30)',
    outlineVariant: 'rgba(255, 255, 255, 0.13)',

    error: '#FFC1BC',
    onError: '#4A0808',
    errorContainer: 'rgba(255, 92, 92, 0.14)',
    onErrorContainer: '#FFE9E7',

    scrim: 'rgba(0, 0, 0, 0.46)',
    backdrop: 'rgba(0, 0, 0, 0.34)',

    elevation: {
      level0: 'transparent',
      level1: 'rgba(255, 255, 255, 0.025)',
      level2: 'rgba(255, 255, 255, 0.040)',
      level3: 'rgba(255, 255, 255, 0.055)',
      level4: 'rgba(255, 255, 255, 0.070)',
      level5: 'rgba(255, 255, 255, 0.085)',
    },
  },
};
