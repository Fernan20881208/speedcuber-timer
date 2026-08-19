import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Surface,
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
    <Surface
      style={
        styles.container
      }>
      <View
        style={
          styles.row
        }>
        <View>
          <Text
            variant="titleMedium">
            {
              activeSession.name
            }
          </Text>

          <Text
            variant="bodySmall">
            Sub{' '}
            {targetSeconds}
          </Text>
        </View>

        <View
          style={
            styles.stats
          }>
          <Text>
            ✓{' '}
            {
              stats.successful
            }
            /
            {
              stats.completed
            }
          </Text>

          <Text>
            🔥{' '}
            {
              stats.currentStreak
            }
          </Text>

          <Text>
            🏆{' '}
            {
              stats.bestStreak
            }
          </Text>
        </View>
      </View>
    </Surface>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: '100%',

      paddingHorizontal: 16,
      paddingVertical: 10,
    },

    row: {
      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'space-between',
    },

    stats: {
      flexDirection:
        'row',

      gap: 14,
    },
  });
