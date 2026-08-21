import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Detailed content rendered behind the native LiquidGlassView.
 * Liquid Glass needs variation behind it for refraction/dispersion to be visible.
 */
export default function GlassBackdrop() {
  return (
    <View
      pointerEvents="none"
      style={styles.container}>
      <View style={[styles.orb, styles.orbOne]} />
      <View style={[styles.orb, styles.orbTwo]} />
      <View style={[styles.orb, styles.orbThree]} />

      <Text style={[styles.word, styles.wordOne]}>
        ZAID
      </Text>

      <Text style={[styles.word, styles.wordTwo]}>
        SPEEDCUBE
      </Text>

      <Text style={[styles.word, styles.wordThree]}>
        PB • AO5 • STREAK
      </Text>

      <View style={[styles.band, styles.bandOne]} />
      <View style={[styles.band, styles.bandTwo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#07080D',
  },

  orb: {
    position: 'absolute',
    borderRadius: 999,
  },

  orbOne: {
    width: 280,
    height: 280,
    top: -70,
    right: -80,
    backgroundColor: 'rgba(133, 90, 255, 0.40)',
  },

  orbTwo: {
    width: 240,
    height: 240,
    bottom: 80,
    left: -100,
    backgroundColor: 'rgba(56, 189, 248, 0.30)',
  },

  orbThree: {
    width: 190,
    height: 190,
    top: '42%',
    right: -65,
    backgroundColor: 'rgba(244, 114, 182, 0.22)',
  },

  word: {
    position: 'absolute',
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.12)',
    letterSpacing: 5,
  },

  wordOne: {
    top: '16%',
    left: 20,
    fontSize: 58,
    transform: [{rotate: '-8deg'}],
  },

  wordTwo: {
    top: '50%',
    right: -28,
    fontSize: 32,
    transform: [{rotate: '90deg'}],
  },

  wordThree: {
    bottom: '13%',
    left: 24,
    fontSize: 17,
    letterSpacing: 2,
  },

  band: {
    position: 'absolute',
    height: 2,
    width: '150%',
    left: '-25%',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },

  bandOne: {
    top: '34%',
    transform: [{rotate: '-14deg'}],
  },

  bandTwo: {
    bottom: '30%',
    transform: [{rotate: '11deg'}],
  },
});
