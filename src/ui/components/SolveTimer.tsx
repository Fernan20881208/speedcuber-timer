// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {Pressable, StyleSheet} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import * as React from 'react';
import {Text} from 'react-native-paper';

import Time from './Time';
import {Timer} from '../../lib/timers';
import ZaidSurface from './zaid/ZaidSurface';

interface SolveTimerProps {
  onStopTimer: (duration: Date) => void;
}

const SolveTimer: React.FC<SolveTimerProps> = ({onStopTimer}) => {
  const [timer] = useState(new Timer());
  const [elapsed, setElapsed] = useState(new Date(0));
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (!timer.isStarted()) {
      timer.start();
    }

    const interval = setInterval(() => {
      setElapsed(new Date(timer.elapsedMilliseconds()));
    }, 20);

    return () => clearInterval(interval);
  }, [timer]);

  function handleOnPressIn() {
    if (stoppedRef.current) {
      return;
    }

    stoppedRef.current = true;

    if (timer.isRunning()) {
      timer.stop();
    }

    const finalElapsed = new Date(timer.elapsedMilliseconds());
    setElapsed(finalElapsed);
    onStopTimer(finalElapsed);
  }

  return (
    <Pressable
      style={styles.container}
      onPressIn={handleOnPressIn}>
      <ZaidSurface
        pointerEvents="none"
        style={styles.timerGlass}
        material="regular"
        cornerRadius={36}
        refractionHeight={76}
        bevelWidth={16}
        dispersionStrength={0.13}>
        <Time elapsed={elapsed} />
      </ZaidSurface>

      <Text
        pointerEvents="none"
        variant="labelMedium"
        style={styles.hint}>
        TOCA PARA DETENER
      </Text>
    </Pressable>
  );
};

export default SolveTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 18,
    gap: 14,
  },

  timerGlass: {
    width: '92%',
    minHeight: 190,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 22,
    borderRadius: 36,
  },

  hint: {
    opacity: 0.48,
    letterSpacing: 1.4,
  },
});
