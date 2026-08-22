import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

/**
 * Quiet high-contrast detail behind LiquidGlassView.
 * The native material needs variation to refract, but the backdrop should not
 * compete with timer text or make screens look visually stacked.
 */
export default function GlassBackdrop() {
  return (
    <View
      pointerEvents="none"
      style={styles.container}>
      <View style={[styles.orb, styles.orbOne]} />
      <View style={[styles.orb, styles.orbTwo]} />
      <View style={[styles.orb, styles.orbThree]} />

      <View style={[styles.band, styles.bandOne]} />
      <View style={[styles.band, styles.bandTwo]} />
      <View style={[styles.band, styles.bandThree]} />

      <View style={[styles.dot, styles.dotOne]} />
      <View style={[styles.dot, styles.dotTwo]} />
      <View style={[styles.dot, styles.dotThree]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#070810',
  },

  orb: {
    position: 'absolute',
    borderRadius: 999,
  },

  orbOne: {
    width: 340,
    height: 340,
    top: -150,
    right: -135,
    backgroundColor: 'rgba(135, 105, 255, 0.18)',
  },

  orbTwo: {
    width: 320,
    height: 320,
    bottom: -145,
    left: -155,
    backgroundColor: 'rgba(82, 205, 255, 0.13)',
  },

  orbThree: {
    width: 230,
    height: 230,
    top: '38%',
    right: -145,
    backgroundColor: 'rgba(180, 196, 255, 0.085)',
  },

  band: {
    position: 'absolute',
    height: 1,
    width: '160%',
    left: '-30%',
    backgroundColor: 'rgba(255, 255, 255, 0.065)',
  },

  bandOne: {
    top: '28%',
    transform: [{rotate: '-11deg'}],
  },

  bandTwo: {
    top: '57%',
    transform: [{rotate: '8deg'}],
  },

  bandThree: {
    bottom: '15%',
    transform: [{rotate: '-5deg'}],
  },

  dot: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  dotOne: {
    top: '24%',
    left: '16%',
  },

  dotTwo: {
    top: '61%',
    right: '20%',
  },

  dotThree: {
    bottom: '20%',
    left: '38%',
  },
});
