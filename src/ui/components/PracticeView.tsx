// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AttemptBuilder,
  MessageStreamBuilder,
  SolutionBuilder,
} from '../../lib/stif/builders';

import PuzzleRegistry, {
  MessageSubscription,
} from './smartpuzzles/SmartPuzzleRegistry';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  useAttemptCreator,
  useAttempts,
  useSolveRecordingCreator,
} from '../../persistence/hooks';

import {
  useEffect,
  useState,
} from 'react';

import {
  Attempt,
} from '../../lib/stif/wrappers';

import {
  GeneratedScramble,
} from './scrambles/types';

import InspectionTimer
  from './inspection/InspectionTimer';

import {
  STIF,
} from '../../lib/stif';

import ScramblingView
  from './scrambles/ScramblingView';

import SolveTimer
  from './SolveTimer';

import {
  parseReconstruction,
} from '../../lib/recordings/parseReconstruction';

import {
  useCompetitiveEvent,
} from '../hooks/useCompetitiveEvent';

import {
  useTraining,
} from '../../features/training/TrainingContext';

import TrainingStatusBar
  from './zaid/TrainingStatusBar';

import PBOverlay
  from './zaid/PBOverlay';

import {
  pbHaptic,
  startHaptic,
  stopHaptic,
} from '../../features/haptics/haptics';

enum TimerState {
  SCRAMBLING = 0,
  INSPECTION = 1,
  SOLVING = 2,
}

interface WIPSolution {
  scramble: GeneratedScramble;
  builder: SolutionBuilder;
  messages?: MessageStreamBuilder;
  messageSubscription?: MessageSubscription;
}

function emptyAttemptForEvent(
  event: STIF.CompetitiveEvent,
): Attempt {
  const attempt = new AttemptBuilder()
    .setEvent(event)
    .setInspectionStart(0)
    .setTimerStart(0)
    .setTimerStop(0);

  event.puzzles
    .map(puzzle => {
      return new SolutionBuilder()
        .setPuzzle(puzzle)
        .setScramble([])
        .build();
    })
    .forEach(solution => {
      attempt.addSolution(solution);
    });

  return attempt
    .wrapped()
    .build();
}

export default function PracticeView() {
  const {
    recordAttempt,
  } = useTraining();

  const createAttempt =
    useAttemptCreator();

  const createRecording =
    useSolveRecordingCreator();

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

  const [
    inspectionStart,
    setInspectionStart,
  ] =
    useState(0);

  const [
    timerStart,
    setTimerStart,
  ] =
    useState(0);

  const [
    timerState,
    setTimerState,
  ] =
    useState(
      TimerState.SCRAMBLING,
    );

  const [
    lastAttempt,
    setLastAttempt,
  ] =
    useState(
      emptyAttemptForEvent(
        event,
      ),
    );

  const [
    wipSolutions,
    setSolutions,
  ] =
    useState<
      WIPSolution[]
    >([]);

  const [
    newPB,
    setNewPB,
  ] =
    useState<{
      timeMs: number;
      improvementMs:
        number | null;
    } | null>(null);

  useEffect(() => {
    setLastAttempt(
      emptyAttemptForEvent(
        event,
      ),
    );
  }, [event]);

  function nextTimerState() {
    const next =
      (timerState + 1) % 3;

    setTimerState(
      next,
    );
  }

  function handleInspectionBegin(
    scrambles:
      GeneratedScramble[],
  ) {
    setInspectionStart(
      new Date().getTime(),
    );

    setSolutions(
      scrambles.map(
        scramble => {
          return {
            scramble,

            builder:
              new SolutionBuilder()
                .setPuzzle(
                  scramble.puzzle,
                )
                .setScramble(
                  scramble.algorithm,
                ),

            ...(() => {
              if (
                scramble.smartPuzzle
              ) {
                const messages =
                  new MessageStreamBuilder()
                    .setSmartPuzzle(
                      scramble.smartPuzzle,
                    );

                const subscription =
                  PuzzleRegistry
                    .addMessageListener(
                      scramble.smartPuzzle,
                      message =>
                        messages
                          .addMessages([
                            message,
                          ]),
                    );

                return {
                  messages,

                  messageSubscription:
                    subscription,
                };
              }

              return {};
            })(),
          };
        },
      ),
    );

    nextTimerState();
  }

  function handleInspectionComplete() {
    const now =
      new Date().getTime();

    setTimerStart(
      now,
    );

    const didNotStart =
      now -
        inspectionStart >
      17_000;

    if (didNotStart) {
      console.log(
        'DNF Detected',
      );

      const attempt =
        assembleAttempt();

      persistAttempt(
        attempt,
      );

      setTimerState(
        TimerState.SCRAMBLING,
      );
    } else {
      startHaptic();

      nextTimerState();
    }
  }

  function getPreviousPB():
    number | null {
    let best:
      number | null =
      null;

    for (
      let index = 0;
      index <
      attempts.length;
      index++
    ) {
      const attempt =
        new Attempt(
          attempts[index],
        );

      const result =
        attempt.result();

      if (
        typeof result !==
          'number' ||
        !Number.isFinite(
          result,
        )
      ) {
        continue;
      }

      if (
        best === null ||
        result < best
      ) {
        best = result;
      }
    }

    return best;
  }

  function detectPB(
    attempt:
      STIF.Attempt,
  ) {
    const wrappedAttempt =
      new Attempt(
        attempt,
      );

    const result =
      wrappedAttempt.result();

    if (
      typeof result !==
        'number' ||
      !Number.isFinite(
        result,
      )
    ) {
      return;
    }

    const previousPB =
      getPreviousPB();

    const isPB =
      previousPB === null ||
      result < previousPB;

    if (!isPB) {
      return;
    }

    const improvement =
      previousPB === null
        ? null
        : previousPB -
          result;

    setNewPB({
      timeMs:
        result,

      improvementMs:
        improvement,
    });

    pbHaptic();

    setTimeout(() => {
      setNewPB(
        null,
      );
    }, 2500);
  }

  function handleSolveComplete() {
    const attempt =
      assembleAttempt();

    stopHaptic();

    detectPB(
      attempt,
    );

    persistAttempt(
      attempt,
    );

    nextTimerState();
  }

  function assembleAttempt() {
    const now =
      new Date().getTime();

    const didNotStart =
      timerStart <
      inspectionStart;

    const attempt =
      new AttemptBuilder()
        .setEvent(
          event,
        )
        .setInspectionStart(
          inspectionStart,
        )
        .setTimerStart(
          didNotStart
            ? now
            : timerStart,
        )
        .setTimerStop(
          now,
        );

    wipSolutions
      .map(wip => {
        const recording =
          wip.messages?.build();

        if (recording) {
          const reconstruction =
            parseReconstruction(
              recording,
              wip.scramble
                .algorithm,
              timerStart,
            );

          reconstruction
            .forEach(
              phase =>
                wip.builder
                  .addSolutionPhase(
                    phase,
                  ),
            );
        }

        if (
          wip.messageSubscription
        ) {
          wip
            .messageSubscription
            .remove();
        }

        return wip
          .builder
          .build();
      })
      .forEach(
        solution =>
          attempt
            .addSolution(
              solution,
            ),
      );

    return attempt.build();
  }

  function persistAttempt(
    attempt:
      STIF.Attempt,
  ) {
    createAttempt(
      attempt,
    );

    void recordAttempt(
      attempt.id,
    );

    setLastAttempt(
      new Attempt(
        attempt,
      ),
    );

    wipSolutions
      .forEach(
        (wip, idx) => {
          const recording =
            wip.messages?.build();

          if (recording) {
            createRecording(
              attempt
                .solutions[idx]
                .id,

              recording,
            );
          }
        },
      );
  }

  return (
    <View
      style={
        styles.container
      }>
      <TrainingStatusBar />

      <View
        style={
          styles.timerArea
        }>
        {timerState ===
          TimerState.SCRAMBLING && (
          <ScramblingView
            previousAttempt={
              lastAttempt.stif()
            }
            onPress={
              handleInspectionBegin
            }
          />
        )}

        {timerState ===
          TimerState.INSPECTION && (
          <InspectionTimer
            onInspectionComplete={
              handleInspectionComplete
            }
            onCancel={() => {
              setTimerState(
                TimerState.SCRAMBLING,
              );
            }}
          />
        )}

        {timerState ===
          TimerState.SOLVING && (
          <SolveTimer
            onStopTimer={
              handleSolveComplete
            }
          />
        )}
      </View>

      {newPB && (
        <PBOverlay
          timeMs={
            newPB.timeMs
          }
          improvementMs={
            newPB
              .improvementMs
          }
        />
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },

    timerArea: {
      flex: 1,

      width: '100%',

      justifyContent:
        'center',

      alignItems:
        'center',
    },
  });
