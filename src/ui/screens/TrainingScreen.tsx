import React, {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Button,
  Text,
  TextInput,
} from 'react-native-paper';

import {
  useTraining,
} from '../../features/training/TrainingContext';

import ZaidSurface from '../components/zaid/ZaidSurface';

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

        <ZaidSurface
          style={styles.card}
          cornerRadius={24}
          refractionHeight={58}
          dispersionStrength={0.11}>
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
        </ZaidSurface>

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

      <ZaidSurface
        style={styles.formCard}
        cornerRadius={26}
        refractionHeight={58}
        dispersionStrength={0.10}>
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
      </ZaidSurface>

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
      backgroundColor: 'transparent',
    },

    card: {
      padding: 20,
      borderRadius: 24,
      gap: 8,
    },

    formCard: {
      padding: 16,
      borderRadius: 26,
      gap: 10,
    },
  });
