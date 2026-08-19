import React from 'react';

import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  RadioButton,
  Text,
} from 'react-native-paper';

import {
  AppearanceMode,
} from '../../features/appearance/appearanceStorage';

import {
  useAppearance,
} from '../../features/appearance/AppearanceContext';

interface ThemeOption {
  label: string;
  value: AppearanceMode;
}

const OPTIONS: ThemeOption[] = [
  {
    label: 'Sistema',
    value: 'system',
  },
  {
    label: 'Claro',
    value: 'light',
  },
  {
    label: 'Oscuro',
    value: 'dark',
  },
  {
    label: 'AMOLED',
    value: 'amoled',
  },
  {
    label: 'Liquid Glass',
    value: 'liquidGlass',
  },
];

export default function AppearanceScreen() {
  const {
    mode,
    setMode,
  } = useAppearance();

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }>
      <Text
        variant="headlineMedium"
        style={styles.title}>
        Apariencia
      </Text>

      <Text
        variant="bodyMedium"
        style={styles.description}>
        Selecciona el estilo visual de
        Zaid Speedcube Timer.
      </Text>

      <RadioButton.Group
        value={mode}
        onValueChange={value => {
          void setMode(
            value as AppearanceMode,
          );
        }}>
        {OPTIONS.map(option => (
          <RadioButton.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </RadioButton.Group>

      {mode === 'liquidGlass' && (
        <Text
          variant="bodySmall"
          style={styles.note}>
          Liquid Glass está preparado,
          pero por ahora usa el tema
          oscuro. El efecto nativo se
          integrará posteriormente.
        </Text>
      )}
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 24,
    },

    title: {
      marginBottom: 8,
    },

    description: {
      marginBottom: 20,
    },

    note: {
      marginTop: 20,
      opacity: 0.7,
    },
  });
