import React from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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

import ZaidSurface
  from '../components/zaid/ZaidSurface';

interface ThemeOption {
  label: string;
  description: string;
  value: AppearanceMode;
}

const OPTIONS: ThemeOption[] = [
  {
    label: 'Sistema',
    description: 'Usa automáticamente el tema claro u oscuro de Android.',
    value: 'system',
  },
  {
    label: 'Claro',
    description: 'Superficies claras y alto contraste para uso de día.',
    value: 'light',
  },
  {
    label: 'Oscuro',
    description: 'Tema oscuro Material con superficies profundas.',
    value: 'dark',
  },
  {
    label: 'AMOLED',
    description: 'Negro puro para aprovechar pantallas OLED y AMOLED.',
    value: 'amoled',
  },
  {
    label: 'Liquid Glass',
    description: 'Cristal nativo con refracción, dispersión y reflejos dinámicos.',
    value: 'liquidGlass',
  },
];

export default function AppearanceScreen() {
  const {
    mode,
    setMode,
  } = useAppearance();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View>
          <Text
            variant="headlineMedium"
            style={styles.heading}>
            Apariencia
          </Text>

          <Text
            variant="bodyMedium"
            style={styles.lead}>
            Elige un estilo. Liquid Glass usa el componente nativo de Android en lugar de pintar tarjetas opacas.
          </Text>
        </View>

        <ZaidSurface
          style={styles.optionsCard}
          material="regular"
          cornerRadius={28}
          refractionHeight={60}
          bevelWidth={12}
          dispersionStrength={0.11}>
          {OPTIONS.map((option, index) => {
            const selected =
              mode === option.value;

            return (
              <React.Fragment
                key={option.value}>
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{checked: selected}}
                  onPress={() => {
                    void setMode(option.value);
                  }}
                  style={({pressed}) => [
                    styles.option,
                    selected && styles.optionSelected,
                    pressed && styles.optionPressed,
                  ]}>
                  <View
                    style={styles.optionCopy}>
                    <Text
                      variant="titleMedium"
                      style={selected ? styles.optionTitleSelected : undefined}>
                      {option.label}
                    </Text>

                    <Text
                      variant="bodySmall"
                      style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>

                  <RadioButton
                    value={option.value}
                    status={selected ? 'checked' : 'unchecked'}
                    onPress={() => {
                      void setMode(option.value);
                    }}
                  />
                </Pressable>

                {index < OPTIONS.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            );
          })}
        </ZaidSurface>

        {mode === 'liquidGlass' && (
          <ZaidSurface
            style={styles.previewCard}
            material="clear"
            cornerRadius={30}
            refractionHeight={68}
            bevelWidth={14}
            dispersionStrength={0.14}>
            <Text
              variant="labelLarge"
              style={styles.previewEyebrow}>
              LIQUID GLASS ACTIVO
            </Text>

            <Text
              variant="headlineSmall"
              style={styles.previewTitle}>
              Zaid Speedcube Timer
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.previewDescription}>
              Las tarjetas, navegación y controles comparten el mismo material para evitar colores sólidos mezclados.
            </Text>

            <View
              style={styles.previewStats}>
              <View
                style={styles.previewStat}>
                <Text
                  variant="titleLarge"
                  style={styles.previewValue}>
                  8.42
                </Text>
                <Text
                  variant="labelSmall"
                  style={styles.previewLabel}>
                  PB
                </Text>
              </View>

              <View style={styles.previewDivider} />

              <View
                style={styles.previewStat}>
                <Text
                  variant="titleLarge"
                  style={styles.previewValue}>
                  9.18
                </Text>
                <Text
                  variant="labelSmall"
                  style={styles.previewLabel}>
                  AO5
                </Text>
              </View>

              <View style={styles.previewDivider} />

              <View
                style={styles.previewStat}>
                <Text
                  variant="titleLarge"
                  style={styles.previewValue}>
                  12
                </Text>
                <Text
                  variant="labelSmall"
                  style={styles.previewLabel}>
                  RACHA
                </Text>
              </View>
            </View>
          </ZaidSurface>
        )}

        {mode === 'amoled' && (
          <ZaidSurface
            style={styles.infoCard}
            cornerRadius={24}
            elevation={1}>
            <Text
              variant="titleMedium"
              style={styles.infoTitle}>
              AMOLED
            </Text>
            <Text
              variant="bodyMedium"
              style={styles.infoBody}>
              Este modo conserva negro puro en el fondo y superficies para minimizar la emisión de píxeles.
            </Text>
          </ZaidSurface>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 34,
    gap: 18,
  },

  heading: {
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  lead: {
    marginTop: 5,
    opacity: 0.70,
    lineHeight: 20,
  },

  optionsCard: {
    borderRadius: 28,
    paddingVertical: 4,
  },

  option: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17,
    paddingRight: 8,
    paddingVertical: 10,
  },

  optionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.075)',
  },

  optionPressed: {
    opacity: 0.72,
  },

  optionCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },

  optionTitleSelected: {
    fontWeight: '800',
  },

  optionDescription: {
    marginTop: 2,
    opacity: 0.66,
    lineHeight: 17,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 17,
    marginRight: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },

  previewCard: {
    borderRadius: 30,
    padding: 20,
  },

  previewEyebrow: {
    opacity: 0.62,
    letterSpacing: 1.4,
  },

  previewTitle: {
    marginTop: 6,
    fontWeight: '800',
    letterSpacing: -0.4,
  },

  previewDescription: {
    marginTop: 7,
    opacity: 0.72,
    lineHeight: 20,
  },

  previewStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },

  previewStat: {
    flex: 1,
    alignItems: 'center',
  },

  previewValue: {
    fontWeight: '800',
  },

  previewLabel: {
    marginTop: 1,
    opacity: 0.58,
    letterSpacing: 0.8,
  },

  previewDivider: {
    width: StyleSheet.hairlineWidth,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  infoCard: {
    padding: 18,
    borderRadius: 24,
  },

  infoTitle: {
    fontWeight: '700',
  },

  infoBody: {
    marginTop: 5,
    opacity: 0.72,
    lineHeight: 20,
  },
});
