// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {Milliseconds} from '../../../lib/stif';
import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';

import {readyHaptic} from '../../../features/haptics/haptics';
import {Button} from 'react-native-paper';
import {Inspection} from '../../../lib/constants';
import InspectionTime from './InspectionTime';
import {useTimer} from '../../hooks';
import {useTranslation} from 'react-i18next';
import ZaidSurface from '../zaid/ZaidSurface';

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

    setTimeout(() => onInspectionComplete(), 0);
  }, [onInspectionComplete, timer]);

  useEffect(() => {
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
    <View style={styles.container}>
      <Pressable
        style={styles.timerPressArea}
        delayLongPress={stackmatDelay}
        onPressIn={handlePressIn}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}>
        <ZaidSurface
          style={styles.timerGlass}
          material="regular"
          cornerRadius={34}
          refractionHeight={72}
          bevelWidth={15}
          dispersionStrength={0.13}>
          <InspectionTime
            ready={ready}
            elapsed={elapsedMillis}
            inspectionDuration={inspectionDuration}
            stackmatDelay={stackmatDelay}
            overtimeUntilDnf={overtimeUntilDnf}
          />
        </ZaidSurface>
      </Pressable>

      <ZaidSurface
        style={styles.cancelGlass}
        material="clear"
        cornerRadius={20}
        refractionHeight={42}
        bevelWidth={8}
        dispersionStrength={0.09}>
        <Button
          onPress={onCancel}
          mode="text"
          contentStyle={styles.cancelContent}>
          {t('common.cancel')}
        </Button>
      </ZaidSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 18,
  },

  timerPressArea: {
    width: '100%',
    alignItems: 'center',
  },

  timerGlass: {
    width: '88%',
    minHeight: 238,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  cancelGlass: {
    alignSelf: 'center',
    minWidth: 150,
    borderRadius: 20,
  },

  cancelContent: {
    minHeight: 44,
  },
});
