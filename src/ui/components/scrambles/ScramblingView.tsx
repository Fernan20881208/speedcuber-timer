// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';

import {Attempt} from '../../../lib/stif/wrappers';
import AttemptTime from '../attempts/AttemptTime';
import {GeneratedScramble} from './types';
import {STIF} from '../../../lib/stif';
import Scrambles from './Scrambles';
import {useScrambles} from '../../hooks/useScrambles';
import {useState} from 'react';
import ZaidSurface from '../zaid/ZaidSurface';

interface ScramblingViewProps {
  previousAttempt: STIF.Attempt;
  onPress?: (scrambles: GeneratedScramble[]) => void;
}

export default function ScramblingView({
  previousAttempt,
  onPress = () => {},
}: ScramblingViewProps) {
  const scrambles = useScrambles(previousAttempt.event, previousAttempt.id);
  const [scrambleCardHeight, setScrambleCardHeight] = useState<number>();

  return (
    <Pressable
      style={styles.landing}
      onPress={() => onPress(scrambles)}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text
            variant="labelLarge"
            style={styles.eyebrow}>
            SCRAMBLE
          </Text>
          <Text
            variant="bodySmall"
            style={styles.hint}>
            Toca en cualquier parte para iniciar la inspección
          </Text>
        </View>

        <ZaidSurface
          style={styles.scrambleCard}
          material="regular"
          cornerRadius={32}
          refractionHeight={70}
          bevelWidth={14}
          dispersionStrength={0.12}
          onLayout={event => {
            setScrambleCardHeight(event.nativeEvent.layout.height);
          }}>
          <View style={styles.scrambleContent}>
            <Scrambles
              scrambles={scrambles}
              layoutHeightLimit={
                scrambleCardHeight
                  ? Math.max(120, scrambleCardHeight - 38)
                  : undefined
              }
            />
          </View>
        </ZaidSurface>

        <ZaidSurface
          style={styles.previousCard}
          material="clear"
          cornerRadius={26}
          refractionHeight={54}
          bevelWidth={10}
          dispersionStrength={0.10}>
          <Text
            variant="labelSmall"
            style={styles.previousLabel}>
            ÚLTIMO TIEMPO
          </Text>
          <View style={styles.previousTime}>
            <AttemptTime attempt={new Attempt(previousAttempt)} />
          </View>
        </ZaidSurface>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    width: '100%',
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 11,
  },

  heading: {
    paddingHorizontal: 4,
  },

  eyebrow: {
    opacity: 0.62,
    letterSpacing: 1.5,
  },

  hint: {
    marginTop: 2,
    opacity: 0.52,
  },

  scrambleCard: {
    flex: 1,
    minHeight: 190,
    width: '100%',
    borderRadius: 32,
  },

  scrambleContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  previousCard: {
    minHeight: 104,
    width: '100%',
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },

  previousLabel: {
    opacity: 0.52,
    letterSpacing: 1,
  },

  previousTime: {
    marginTop: 2,
  },
});
