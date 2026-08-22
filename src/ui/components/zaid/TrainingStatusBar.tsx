import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Text,
} from 'react-native-paper';

import {
  useTraining,
} from '../../../features/training/TrainingContext';

import {
  calculateTrainingStats,
} from '../../../features/training/trainingStats';

import {
  useAttempts,
} from '../../../persistence/hooks';

import {
  useCompetitiveEvent,
} from '../../hooks/useCompetitiveEvent';

import ZaidSurface from './ZaidSurface';

export default function TrainingStatusBar() {
  const {
    activeSession,
  } = useTraining();

  const [
    event,
  ] =
    useCompetitiveEvent();

  const attempts =
    useAttempts({
      event,
      sortDirection:
        'ascending',
    });

  if (!activeSession) {
    return null;
  }

  const stats =
    calculateTrainingStats(
      attempts,
      activeSession,
    );

  const targetSeconds =
    (
      activeSession.targetTimeMs /
      1000
    ).toFixed(2);

  return (
    <ZaidSurface
      style={styles.container}
      material="clear"
      cornerRadius={24}
      refractionHeight={52}
      bevelWidth={10}
      dispersionStrength={0.11}>
      <View
        style={styles.headingRow}>
        <View
          style={styles.titleBlock}>
          <Text
            variant="titleMedium"
            numberOfLines={1}
            style={styles.title}>
            {activeSession.name}
          </Text>

          <Text
            variant="bodySmall"
            style={styles.subtitle}>
            Objetivo · Sub {targetSeconds}
          </Text>
        </View>

        <Text
          variant="labelLarge"
          style={styles.progress}>
          {stats.completed}
          {activeSession.targetSolves
            ? ` / ${activeSession.targetSolves}`
            : ''}
        </Text>
      </View>

      <View
        style={styles.statsRow}>
        <View
          style={styles.stat}>
          <Text
            variant="titleMedium"
            style={styles.statValue}>
            {stats.successful}
          </Text>
          <Text
            variant="labelSmall"
            style={styles.statLabel}>
            SUB-X
          </Text>
        </View>

        <View
          style={styles.divider}
        />

        <View
          style={styles.stat}>
          <Text
            variant="titleMedium"
            style={styles.statValue}>
            {stats.currentStreak}
          </Text>
          <Text
            variant="labelSmall"
            style={styles.statLabel}>
            RACHA
          </Text>
        </View>

        <View
          style={styles.divider}
        />

        <View
          style={styles.stat}>
          <Text
            variant="titleMedium"
            style={styles.statValue}>
            {stats.bestStreak}
          </Text>
          <Text
            variant="labelSmall"
            style={styles.statLabel}>
            MEJOR
          </Text>
        </View>
      </View>
    </ZaidSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderRadius: 24,
  },

  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  titleBlock: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 1,
    opacity: 0.72,
  },

  progress: {
    opacity: 0.78,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    paddingTop: 9,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.16)',
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontWeight: '800',
  },

  statLabel: {
    marginTop: 1,
    opacity: 0.62,
    letterSpacing: 0.8,
  },

  divider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});
