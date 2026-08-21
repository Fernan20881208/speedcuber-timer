import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Text,
} from 'react-native-paper';

import ZaidSurface from './ZaidSurface';

interface Props {
  timeMs: number;

  improvementMs:
    | number
    | null;
}

function formatTime(
  milliseconds: number,
) {
  return (
    milliseconds / 1000
  ).toFixed(3);
}

export default function PBOverlay({
  timeMs,
  improvementMs,
}: Props) {
  return (
    <View
      pointerEvents="none"
      style={styles.overlay}>
      <ZaidSurface
        style={styles.card}
        material="clear"
        cornerRadius={28}
        refractionHeight={64}
        bevelWidth={14}
        dispersionStrength={0.14}>
        <Text
          variant="headlineSmall"
          style={styles.label}>
          🏆 NUEVO PB
        </Text>

        <Text
          variant="displaySmall"
          style={styles.time}>
          {formatTime(
            timeMs,
          )}
        </Text>

        <Text
          variant="bodyLarge">
          {improvementMs === null
            ? 'Primer tiempo válido'
            : `-${formatTime(
                improvementMs,
              )} s`}
        </Text>
      </ZaidSurface>
    </View>
  );
}

const styles =
  StyleSheet.create({
    overlay: {
      position: 'absolute',

      top: 40,
      left: 20,
      right: 20,

      zIndex: 100,

      alignItems:
        'center',
    },

    card: {
      paddingHorizontal: 30,
      paddingVertical: 20,

      borderRadius: 28,

      alignItems:
        'center',
    },

    label: {
      fontWeight: 'bold',
    },

    time: {
      marginVertical: 6,

      fontWeight: 'bold',
    },
  });
