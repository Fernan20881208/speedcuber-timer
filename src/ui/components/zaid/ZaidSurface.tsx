import React from 'react';

import {
  ViewProps,
} from 'react-native';

import {
  Surface,
} from 'react-native-paper';

import {
  useAppearance,
} from '../../../features/appearance/AppearanceContext';

import LiquidGlass, {
  LiquidGlassMaterial,
} from './LiquidGlass';

interface ZaidSurfaceProps extends ViewProps {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  material?: LiquidGlassMaterial;
  cornerRadius?: number;
  refractionHeight?: number;
  bevelWidth?: number;
  dispersionStrength?: number;
  dynamicBackground?: boolean;
  sensorHighlight?: boolean;
  adaptiveTint?: boolean;
}

/**
 * Paper Surface in normal themes, real native LiquidGlassView in Liquid Glass mode.
 * This lets the same screens keep working in Light/Dark/AMOLED without branching.
 */
export default function ZaidSurface({
  children,
  elevation = 1,
  material = 'regular',
  cornerRadius = 24,
  refractionHeight = 54,
  bevelWidth = 12,
  dispersionStrength = 0.10,
  dynamicBackground = true,
  sensorHighlight = true,
  adaptiveTint = true,
  ...viewProps
}: ZaidSurfaceProps) {
  const {mode} = useAppearance();

  if (mode === 'liquidGlass') {
    return (
      <LiquidGlass
        {...viewProps}
        material={material}
        cornerRadius={cornerRadius}
        refractionHeight={refractionHeight}
        bevelWidth={bevelWidth}
        dispersionStrength={dispersionStrength}
        dynamicBackground={dynamicBackground}
        sensorHighlight={sensorHighlight}
        adaptiveTint={adaptiveTint}>
        {children}
      </LiquidGlass>
    );
  }

  return (
    <Surface
      {...viewProps}
      elevation={elevation}>
      {children}
    </Surface>
  );
}
