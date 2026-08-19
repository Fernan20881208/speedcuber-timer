import {
  Platform,
  Vibration,
} from 'react-native';

export function readyHaptic() {
  if (
    Platform.OS !== 'android'
  ) {
    return;
  }

  Vibration.vibrate(25);
}

export function startHaptic() {
  if (
    Platform.OS !== 'android'
  ) {
    return;
  }

  Vibration.vibrate(35);
}

export function stopHaptic() {
  if (
    Platform.OS !== 'android'
  ) {
    return;
  }

  Vibration.vibrate(45);
}

export function pbHaptic() {
  if (
    Platform.OS !== 'android'
  ) {
    return;
  }

  Vibration.vibrate([
    0,
    40,
    60,
    80,
  ]);
}
