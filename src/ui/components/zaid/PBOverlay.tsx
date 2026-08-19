import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Surface,
  Text,
} from 'react-native-paper';

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
      <Surface
        style={styles.card}>
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
      </Surface>
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

      borderRadius: 24,

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
