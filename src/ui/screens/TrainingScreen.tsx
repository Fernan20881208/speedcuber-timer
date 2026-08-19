import React, {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Button,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';

import {
  useTraining,
} from '../../features/training/TrainingContext';

export default function TrainingScreen() {
  const {
    activeSession,
    startSession,
    endSession,
  } = useTraining();

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
    return (
      <ScrollView
        contentContainerStyle={
          styles.container
        }>
        <Text
          variant="headlineMedium">
          Sesión activa
        </Text>

        <Surface
          style={styles.card}>
          <Text
            variant="titleLarge">
            {
              activeSession.name
            }
          </Text>

          <Text>
            Meta: Sub{' '}
            {(
              activeSession.targetTimeMs /
              1000
            ).toFixed(2)}
          </Text>

          <Text>
            Solves:{' '}
            {
              activeSession
                .attemptIds
                .length
            }
            {activeSession.targetSolves
              ? ` / ${activeSession.targetSolves}`
              : ''}
          </Text>
        </Surface>

        <Button
          mode="contained"
          onPress={() => {
            void endSession();
          }}>
          Finalizar sesión
        </Button>
      </ScrollView>
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

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }>
      <Text
        variant="headlineMedium">
        Nueva sesión
      </Text>

      <TextInput
        label="Nombre"
        value={name}
        onChangeText={
          setName
        }
        style={styles.input}
      />

      <TextInput
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

      <Button
        mode="contained"
        disabled={!valid}
        onPress={() => {
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
        }}>
        Iniciar sesión
      </Button>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 24,
      gap: 16,
    },

    input: {
      marginTop: 4,
    },

    card: {
      padding: 20,
      borderRadius: 20,
      gap: 8,
    },
  });
