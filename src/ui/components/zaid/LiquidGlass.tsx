import React from 'react';

import {
  Platform,
  requireNativeComponent,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

export type LiquidGlassMaterial =
  | 'regular'
  | 'clear';

export interface LiquidGlassProps
  extends ViewProps {
  style?:
    StyleProp<ViewStyle>;

  material?:
    LiquidGlassMaterial;

  cornerRadius?:
    number;

  refractionHeight?:
    number;

  bevelWidth?:
    number;

  dispersionStrength?:
    number;

  dynamicBackground?:
    boolean;

  sensorHighlight?:
    boolean;

  adaptiveTint?:
    boolean;
}

const NativeLiquidGlass =
  Platform.OS === 'android'
    ? requireNativeComponent<
        LiquidGlassProps
      >(
        'ZaidLiquidGlass',
      )
    : null;

export default function LiquidGlass({
  children,
  ...props
}: LiquidGlassProps) {
  if (
    Platform.OS !==
      'android' ||
    NativeLiquidGlass ===
      null
  ) {
    return (
      <View
        {...props}>
        {children}
      </View>
    );
  }

  return (
    <NativeLiquidGlass
      {...props}>
      {children}
    </NativeLiquidGlass>
  );
}
