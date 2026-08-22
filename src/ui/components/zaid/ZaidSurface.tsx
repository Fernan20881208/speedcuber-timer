import React from 'react';

import {
  StyleSheet,
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
 * One visual surface API for the whole app.
 *
 * - Liquid Glass mode -> real native LiquidGlassView with a subtle common edge.
 * - Other modes -> normal react-native-paper Surface.
 */
export default function ZaidSurface({
  children,
  style,
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
        style={[
          styles.glass,
          {borderRadius: cornerRadius},
          style,
        ]}
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
      style={style}
      elevation={elevation}>
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  glass: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.24)',
  },
});
