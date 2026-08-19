import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  RadioButton,
  Text,
  useTheme,
} from 'react-native-paper';

import {
  AppearanceMode,
} from '../../features/appearance/appearanceStorage';

import {
  useAppearance,
} from '../../features/appearance/AppearanceContext';

import LiquidGlass
  from '../components/zaid/LiquidGlass';

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

  const theme =
    useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor:
          theme.colors.background,
      }}
      contentContainerStyle={
        styles.container
      }>

      <Text
        variant="headlineMedium"
        style={
          styles.title
        }>
        Apariencia
      </Text>

      <Text
        variant="bodyMedium"
        style={
          styles.description
        }>
        Selecciona el estilo visual de
        Zaid Speedcube Timer.
      </Text>

      <RadioButton.Group
        value={
          mode
        }
        onValueChange={value => {
          void setMode(
            value as AppearanceMode,
          );
        }}>

        {OPTIONS.map(
          option => (
            <RadioButton.Item
              key={
                option.value
              }
              label={
                option.label
              }
              value={
                option.value
              }
            />
          ),
        )}

      </RadioButton.Group>

      {mode ===
        'amoled' && (
        <View
          style={
            styles.amoledInfo
          }>

          <Text
            variant="titleMedium">
            AMOLED
          </Text>

          <Text
            variant="bodyMedium"
            style={
              styles.secondaryText
            }>
            Negro puro para pantallas
            OLED y AMOLED.
          </Text>

        </View>
      )}

      {mode ===
        'liquidGlass' && (
        <View
          style={
            styles.liquidSection
          }>

          <Text
            variant="titleMedium"
            style={
              styles.liquidTitle
            }>
            Vista previa
          </Text>

          <Text
            variant="bodySmall"
            style={
              styles.secondaryText
            }>
            Esta tarjeta utiliza el
            componente Liquid Glass
            nativo de Android.
          </Text>

          <View
            style={
              styles.glassDemo
            }>

            {/*
             * Fondo visible detrás del
             * cristal.
             *
             * Liquid Glass necesita
             * contenido detrás para que
             * la refracción se note.
             */}

            <View
              style={
                styles.glassBackdrop
              }>

              <View
                style={[
                  styles.glow,
                  styles.glowBlue,
                ]}
              />

              <View
                style={[
                  styles.glow,
                  styles.glowPurple,
                ]}
              />

              <View
                style={[
                  styles.glow,
                  styles.glowCyan,
                ]}
              />

              <Text
                style={[
                  styles.backdropText,
                  {
                    color:
                      theme.colors
                        .onBackground,
                  },
                ]}>
                ZAID
              </Text>

              <Text
                style={[
                  styles.backdropText2,
                  {
                    color:
                      theme.colors
                        .onBackground,
                  },
                ]}>
                SPEEDCUBE
              </Text>

              <Text
                style={[
                  styles.backdropText3,
                  {
                    color:
                      theme.colors
                        .onBackground,
                  },
                ]}>
                TIMER
              </Text>

            </View>

            <LiquidGlass
              style={
                styles.glassCard
              }

              material="regular"

              cornerRadius={
                28
              }

              refractionHeight={
                66
              }

              bevelWidth={
                14
              }

              dispersionStrength={
                0.12
              }

              dynamicBackground={
                true
              }

              sensorHighlight={
                true
              }

              adaptiveTint={
                true
              }>

              <View
                style={
                  styles.glassContent
                }>

                <Text
                  variant=
                    "titleLarge"
                  style={
                    styles.glassHeading
                  }>
                  Liquid Glass
                </Text>

                <Text
                  variant=
                    "bodyMedium">
                  Zaid Speedcube Timer
                </Text>

                <View
                  style={
                    styles.glassStats
                  }>

                  <View
                    style={
                      styles.stat
                    }>

                    <Text
                      variant=
                        "labelMedium">
                      PB
                    </Text>

                    <Text
                      variant=
                        "titleMedium">
                      8.421
                    </Text>

                  </View>

                  <View
                    style={
                      styles.stat
                    }>

                    <Text
                      variant=
                        "labelMedium">
                      AO5
                    </Text>

                    <Text
                      variant=
                        "titleMedium">
                      10.31
                    </Text>

                  </View>

                  <View
                    style={
                      styles.stat
                    }>

                    <Text
                      variant=
                        "labelMedium">
                      RACHA
                    </Text>

                    <Text
                      variant=
                        "titleMedium">
                      🔥 6
                    </Text>

                  </View>

                </View>

              </View>

            </LiquidGlass>

          </View>

          <Text
            variant="bodySmall"
            style={
              styles.glassHint
            }>
            Inclina ligeramente el
            teléfono para comprobar el
            highlight dinámico del
            cristal.
          </Text>

        </View>
      )}

    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 24,

      paddingBottom:
        48,
    },

    title: {
      marginBottom:
        8,
    },

    description: {
      marginBottom:
        20,

      opacity:
        0.8,
    },

    secondaryText: {
      opacity:
        0.7,
    },

    amoledInfo: {
      marginTop:
        24,

      padding:
        18,

      borderRadius:
        20,

      backgroundColor:
        '#000000',

      borderWidth:
        1,

      borderColor:
        '#262626',
    },

    liquidSection: {
      marginTop:
        26,
    },

    liquidTitle: {
      marginBottom:
        4,
    },

    glassDemo: {
      height:
        260,

      marginTop:
        18,

      overflow:
        'hidden',

      borderRadius:
        32,

      position:
        'relative',

      backgroundColor:
        '#080812',
    },

    glassBackdrop: {
      ...StyleSheet.absoluteFillObject,

      overflow:
        'hidden',
    },

    glow: {
      position:
        'absolute',

      borderRadius:
        999,
    },

    glowBlue: {
      width:
        180,

      height:
        180,

      left:
        -45,

      top:
        -35,

      backgroundColor:
        '#274CFF',

      opacity:
        0.75,
    },

    glowPurple: {
      width:
        190,

      height:
        190,

      right:
        -55,

      bottom:
        -50,

      backgroundColor:
        '#8B3DFF',

      opacity:
        0.75,
    },

    glowCyan: {
      width:
        90,

      height:
        90,

      right:
        35,

      top:
        20,

      backgroundColor:
        '#00D4FF',

      opacity:
        0.65,
    },

    backdropText: {
      position:
        'absolute',

      left:
        18,

      top:
        28,

      fontSize:
        28,

      fontWeight:
        '900',

      opacity:
        0.28,

      letterSpacing:
        2,
    },

    backdropText2: {
      position:
        'absolute',

      right:
        12,

      bottom:
        48,

      fontSize:
        22,

      fontWeight:
        '900',

      opacity:
        0.24,

      letterSpacing:
        2,
    },

    backdropText3: {
      position:
        'absolute',

      left:
        40,

      bottom:
        12,

      fontSize:
        18,

      fontWeight:
        '800',

      opacity:
        0.2,

      letterSpacing:
        4,
    },

    glassCard: {
      position:
        'absolute',

      left:
        24,

      right:
        24,

      top:
        62,

      height:
        140,
    },

    glassContent: {
      flex:
        1,

      paddingHorizontal:
        18,

      paddingVertical:
        14,

      justifyContent:
        'center',

      alignItems:
        'center',
    },

    glassHeading: {
      fontWeight:
        '700',
    },

    glassStats: {
      width:
        '100%',

      flexDirection:
        'row',

      justifyContent:
        'space-around',

      marginTop:
        12,
    },

    stat: {
      alignItems:
        'center',

      minWidth:
        60,
    },

    glassHint: {
      marginTop:
        12,

      opacity:
        0.65,

      textAlign:
        'center',
    },
  });
