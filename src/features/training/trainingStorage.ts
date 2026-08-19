import AsyncStorage
  from '@react-native-async-storage/async-storage';

export interface TrainingSession {
  id: string;

  name: string;

  targetTimeMs:
    number;

  targetSolves?:
    number;

  createdAt: number;

  attemptIds:
    string[];
}

export interface NewTrainingSession {
  name: string;

  targetTimeMs:
    number;

  targetSolves?:
    number;
}

const SESSIONS_KEY =
  '@zaid_speedcube_timer/training_sessions';

const ACTIVE_SESSION_KEY =
  '@zaid_speedcube_timer/active_training_session';

export async function loadTrainingSessions():
  Promise<
    TrainingSession[]
  > {
  try {
    const raw =
      await AsyncStorage.getItem(
        SESSIONS_KEY,
      );

    if (!raw) {
      return [];
    }

    return JSON.parse(
      raw,
    );
  } catch (error) {
    console.warn(
      'Could not load training sessions',
      error,
    );

    return [];
  }
}

async function saveTrainingSessions(
  sessions:
    TrainingSession[],
) {
  await AsyncStorage.setItem(
    SESSIONS_KEY,
    JSON.stringify(
      sessions,
    ),
  );
}

export async function createTrainingSession(
  input:
    NewTrainingSession,
): Promise<
  TrainingSession
> {
  const sessions =
    await loadTrainingSessions();

  const session:
    TrainingSession = {
    id:
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,

    name:
      input.name,

    targetTimeMs:
      input.targetTimeMs,

    targetSolves:
      input.targetSolves,

    createdAt:
      Date.now(),

    attemptIds: [],
  };

  await saveTrainingSessions([
    ...sessions,
    session,
  ]);

  await AsyncStorage.setItem(
    ACTIVE_SESSION_KEY,
    session.id,
  );

  return session;
}

export async function loadActiveTrainingSession():
  Promise<
    TrainingSession | null
  > {
  const id =
    await AsyncStorage.getItem(
      ACTIVE_SESSION_KEY,
    );

  if (!id) {
    return null;
  }

  const sessions =
    await loadTrainingSessions();

  return (
    sessions.find(
      session =>
        session.id === id,
    ) ?? null
  );
}

export async function appendAttemptToTrainingSession(
  sessionId: string,
  attemptId: string,
): Promise<
  TrainingSession | null
> {
  const sessions =
    await loadTrainingSessions();

  const index =
    sessions.findIndex(
      session =>
        session.id ===
        sessionId,
    );

  if (index < 0) {
    return null;
  }

  const session =
    sessions[index];

  if (
    session.attemptIds.includes(
      attemptId,
    )
  ) {
    return session;
  }

  const updated: TrainingSession = {
    ...session,

    attemptIds: [
      ...session.attemptIds,
      attemptId,
    ],
  };

  sessions[index] =
    updated;

  await saveTrainingSessions(
    sessions,
  );

  return updated;
}

export async function clearActiveTrainingSession() {
  await AsyncStorage.removeItem(
    ACTIVE_SESSION_KEY,
  );
}
