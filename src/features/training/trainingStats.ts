import {
  STIF,
} from '../../lib/stif';

import {
  Attempt,
} from '../../lib/stif/wrappers';

import {
  TrainingSession,
} from './trainingStorage';

export interface TrainingStats {
  completed:
    number;

  successful:
    number;

  currentStreak:
    number;

  bestStreak:
    number;

  bestTimeMs:
    number | null;
}

export function calculateTrainingStats(
  attempts:
    ArrayLike<
      STIF.Attempt
    >,
  session:
    TrainingSession,
): TrainingStats {
  const ids =
    new Set(
      session.attemptIds,
    );

  let completed = 0;
  let successful = 0;

  let currentStreak = 0;
  let bestStreak = 0;

  let bestTimeMs:
    number | null =
    null;

  for (
    let index = 0;
    index < attempts.length;
    index++
  ) {
    const rawAttempt =
      attempts[index];

    if (
      !ids.has(
        rawAttempt.id,
      )
    ) {
      continue;
    }

    completed++;

    const attempt =
      new Attempt(
        rawAttempt,
      );

    const result =
      attempt.result();

    const validTime =
      typeof result ===
        'number' &&
      Number.isFinite(
        result,
      );

    if (
      validTime &&
      (
        bestTimeMs ===
          null ||
        result <
          bestTimeMs
      )
    ) {
      bestTimeMs =
        result;
    }

    const success =
      validTime &&
      result <
        session.targetTimeMs;

    if (success) {
      successful++;

      currentStreak++;

      bestStreak =
        Math.max(
          bestStreak,
          currentStreak,
        );
    } else {
      currentStreak = 0;
    }
  }

  return {
    completed,
    successful,
    currentStreak,
    bestStreak,
    bestTimeMs,
  };
}
