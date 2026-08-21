// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {Milliseconds} from '../../../lib/stif';
import {Pressable, StyleSheet, Vibration} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';

import {readyHaptic} from '../../../features/haptics/haptics';
import {Button} from 'react-native-paper';
import {Inspection} from '../../../lib/constants';
import InspectionTime from './InspectionTime';
import {useTimer} from '../../hooks';
import {useTranslation} from 'react-i18next';

interface InspectionTimerProps {
  onInspectionComplete?: () => void;
  onCancel?: () => void;
  inspectionDuration?: Milliseconds;
  stackmatDelay?: Milliseconds;
  overtimeUntilDnf?: Milliseconds;
}

const FIRST_WARNING_MILLIS = 8000;
const SECOND_WARNING_MILLIS = 12000;

export default function InspectionTimer({
  onInspectionComplete = () => {},
  onCancel = () => {},
  inspectionDuration = Inspection.DEFAULT_DURATION_MILLIS,
  stackmatDelay = Inspection.DEFAULT_STACKMAT_DELAY_MILLIS,
  overtimeUntilDnf = Inspection.DEFAULT_OVERTIME_UNTIL_DNF_MILLIS,
}: InspectionTimerProps) {
  const {t} = useTranslation();
  const {timer, elapsed} = useTimer();
  const [ready, setReady] = useState(false);
  const [startMillis, setStartMillis] = useState(Infinity);

  const completedRef = useRef(false);
  const warningsRef = useRef<Set<number>>(new Set());

  const elapsedMillis = elapsed.valueOf();

  const endInspection = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    setReady(false);

    if (timer.isRunning()) {
      timer.stop();
    }

    // Let React finish the current timer render before switching PracticeView
    // from INSPECTION to SOLVING.
    setTimeout(() => onInspectionComplete(), 0);
  }, [onInspectionComplete, timer]);

  useEffect(() => {
    // Zaid Speedcube Timer behaviour: inspection lasts exactly 15 seconds
    // (or the configured inspectionDuration). If the user has not manually
    // started sooner, automatically enter the solve timer at that point.
    if (
      !completedRef.current &&
      timer.isRunning() &&
      elapsedMillis >= inspectionDuration
    ) {
      endInspection();
    }
  }, [elapsedMillis, endInspection, inspectionDuration, timer]);

  useEffect(() => {
    for (const warning of [FIRST_WARNING_MILLIS, SECOND_WARNING_MILLIS]) {
      if (
        elapsedMillis >= warning &&
        !warningsRef.current.has(warning)
      ) {
        warningsRef.current.add(warning);
        Vibration.vibrate();
      }
    }
  }, [elapsedMillis]);

  function handlePressIn() {
    if (timer.isRunning()) {
      setStartMillis(new Date().valueOf());
    }
  }

  function handleLongPress() {
    if (timer.isRunning()) {
      setReady(true);
      readyHaptic();
    }
  }

  function handlePressOut() {
    if (
      timer.isRunning() &&
      new Date().valueOf() - startMillis > stackmatDelay
    ) {
      endInspection();
    }
  }

  return (
    <Pressable
      style={styles.container}
      delayLongPress={stackmatDelay}
      onPressIn={handlePressIn}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}>
      <InspectionTime
        ready={ready}
        elapsed={elapsedMillis}
        inspectionDuration={inspectionDuration}
        stackmatDelay={stackmatDelay}
        overtimeUntilDnf={overtimeUntilDnf}
      />
      <Button onPress={onCancel} mode="contained-tonal">
        {t('common.cancel')}
      </Button>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
