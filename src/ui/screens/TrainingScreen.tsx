import React, {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Button,
  Text,
  TextInput,
} from 'react-native-paper';

import {
  useTraining,
} from '../../features/training/TrainingContext';
import {
  useAppearance,
} from '../../features/appearance/AppearanceContext';

import ZaidSurface from '../components/zaid/ZaidSurface';

export default function TrainingScreen() {
  const {
    activeSession,
    startSession,
    endSession,
  } = useTraining();

  const {
    mode,
  } = useAppearance();

  const useGlass =
    mode === 'liquidGlass';

  const [
    name,
    setName,
  ] =
    useState(
      '3x3 Practice',
    );

  const [
    targetSeconds,
    setTargetSeconds,
  ] =
    useState('12.00');

  const [
    targetSolves,
    setTargetSolves,
  ] =
    useState('50');

  if (activeSession) {
    const target =
      (
        activeSession.targetTimeMs /
        1000
      ).toFixed(2);

    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.container
          }>
          <View>
            <Text
              variant="headlineMedium"
              style={styles.heading}>
              Sesión activa
            </Text>
            <Text
              variant="bodyMedium"
              style={styles.lead}>
              Mantén el objetivo visible sin recargar el cronómetro.
            </Text>
          </View>

          <ZaidSurface
            style={styles.card}
            material="clear"
            cornerRadius={28}
            refractionHeight={62}
            bevelWidth={12}
            dispersionStrength={0.12}>
            <Text
              variant="headlineSmall"
              numberOfLines={2}
              style={styles.sessionName}>
              {activeSession.name}
            </Text>

            <View
              style={styles.metrics}>
              <View
                style={styles.metric}>
                <Text
                  variant="labelMedium"
                  style={styles.metricLabel}>
                  OBJETIVO
                </Text>
                <Text
                  variant="titleLarge"
                  style={styles.metricValue}>
                  Sub {target}
                </Text>
              </View>

              <View
                style={styles.metricDivider}
              />

              <View
                style={styles.metric}>
                <Text
                  variant="labelMedium"
                  style={styles.metricLabel}>
                  SOLVES
                </Text>
                <Text
                  variant="titleLarge"
                  style={styles.metricValue}>
                  {activeSession.attemptIds.length}
                  {activeSession.targetSolves
                    ? ` / ${activeSession.targetSolves}`
                    : ''}
                </Text>
              </View>
            </View>
          </ZaidSurface>

          {useGlass ? (
            <ZaidSurface
              style={styles.actionGlass}
              material="clear"
              cornerRadius={22}
              refractionHeight={46}
              bevelWidth={9}
              dispersionStrength={0.10}>
              <Button
                mode="text"
                contentStyle={styles.actionContent}
                onPress={() => {
                  void endSession();
                }}>
                Finalizar sesión
              </Button>
            </ZaidSurface>
          ) : (
            <Button
              mode="contained"
              contentStyle={styles.actionContent}
              onPress={() => {
                void endSession();
              }}>
              Finalizar sesión
            </Button>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  const seconds =
    Number(
      targetSeconds.replace(
        ',',
        '.',
      ),
    );

  const solves =
    Number.parseInt(
      targetSolves,
      10,
    );

  const valid =
    Number.isFinite(
      seconds,
    ) &&
    seconds > 0 &&
    Number.isFinite(
      solves,
    ) &&
    solves > 0;

  const start = () => {
    void startSession({
      name:
        name.trim() ||
        'Entrenamiento',

      targetTimeMs:
        Math.round(
          seconds *
            1000,
        ),

      targetSolves:
        solves,
    });
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }>
        <View>
          <Text
            variant="headlineMedium"
            style={styles.heading}>
            Nueva sesión
          </Text>
          <Text
            variant="bodyMedium"
            style={styles.lead}>
            Define un Sub-X y una cantidad de solves para entrenar con intención.
          </Text>
        </View>

        <ZaidSurface
          style={styles.formCard}
          material="regular"
          cornerRadius={28}
          refractionHeight={62}
          bevelWidth={12}
          dispersionStrength={0.11}>
          <TextInput
            mode="outlined"
            label="Nombre"
            value={name}
            onChangeText={
              setName
            }
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Objetivo en segundos"
            value={
              targetSeconds
            }
            onChangeText={
              setTargetSeconds
            }
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Cantidad de solves"
            value={
              targetSolves
            }
            onChangeText={
              setTargetSolves
            }
            keyboardType="number-pad"
            style={styles.input}
          />
        </ZaidSurface>

        {useGlass ? (
          <ZaidSurface
            style={styles.actionGlass}
            material="clear"
            cornerRadius={22}
            refractionHeight={46}
            bevelWidth={9}
            dispersionStrength={0.10}>
            <Button
              mode="text"
              disabled={!valid}
              contentStyle={styles.actionContent}
              onPress={start}>
              Iniciar sesión
            </Button>
          </ZaidSurface>
        ) : (
          <Button
            mode="contained"
            disabled={!valid}
            contentStyle={styles.actionContent}
            onPress={start}>
            Iniciar sesión
          </Button>
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
    paddingBottom: 32,
    gap: 16,
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

  input: {
    backgroundColor: 'transparent',
  },

  card: {
    padding: 20,
    borderRadius: 28,
    gap: 14,
  },

  sessionName: {
    fontWeight: '800',
  },

  metrics: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 4,
  },

  metric: {
    flex: 1,
    minWidth: 0,
  },

  metricLabel: {
    opacity: 0.58,
    letterSpacing: 1,
  },

  metricValue: {
    marginTop: 4,
    fontWeight: '800',
  },

  metricDivider: {
    width: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },

  formCard: {
    padding: 14,
    borderRadius: 28,
    gap: 10,
  },

  actionGlass: {
    borderRadius: 22,
  },

  actionContent: {
    minHeight: 50,
  },
});
