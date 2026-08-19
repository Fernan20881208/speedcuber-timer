import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  TrainingSession,
  NewTrainingSession,
  appendAttemptToTrainingSession,
  clearActiveTrainingSession,
  createTrainingSession,
  loadActiveTrainingSession,
} from './trainingStorage';

interface TrainingContextValue {
  activeSession:
    TrainingSession | null;

  startSession: (
    input:
      NewTrainingSession,
  ) => Promise<void>;

  endSession:
    () => Promise<void>;

  recordAttempt: (
    attemptId: string,
  ) => Promise<void>;
}

const TrainingContext =
  createContext<
    TrainingContextValue | undefined
  >(undefined);

export function TrainingProvider({
  children,
}: PropsWithChildren) {
  const [
    activeSession,
    setActiveSession,
  ] =
    useState<
      TrainingSession | null
    >(null);

  useEffect(() => {
    let mounted = true;

    loadActiveTrainingSession()
      .then(session => {
        if (mounted) {
          setActiveSession(
            session,
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function startSession(
    input:
      NewTrainingSession,
  ) {
    const session =
      await createTrainingSession(
        input,
      );

    setActiveSession(
      session,
    );
  }

  async function endSession() {
    await clearActiveTrainingSession();

    setActiveSession(
      null,
    );
  }

  async function recordAttempt(
    attemptId: string,
  ) {
    if (!activeSession) {
      return;
    }

    const updated =
      await appendAttemptToTrainingSession(
        activeSession.id,
        attemptId,
      );

    if (updated) {
      setActiveSession(
        updated,
      );
    }
  }

  return (
    <TrainingContext.Provider
      value={{
        activeSession,
        startSession,
        endSession,
        recordAttempt,
      }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const context =
    useContext(
      TrainingContext,
    );

  if (!context) {
    throw new Error(
      'useTraining must be used inside TrainingProvider',
    );
  }

  return context;
}
