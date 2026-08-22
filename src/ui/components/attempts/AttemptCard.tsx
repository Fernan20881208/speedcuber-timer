// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  IconButton,
  Text,
} from 'react-native-paper';

import {
  memo,
} from 'react';

import {
  Attempt,
} from '../../../lib/stif/wrappers';

import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
  getAttemptTimeString,
} from '../../utils/formatElapsedTime';

import {
  STIF,
} from '../../../lib/stif';

import ZaidSurface from '../zaid/ZaidSurface';

interface AttemptCardProps {
  attempt:
    STIF.Attempt;

  onPress?: (
    attempt:
      STIF.Attempt,
  ) => void;

  favorite?:
    boolean;

  onToggleFavorite?: (
    attempt:
      STIF.Attempt,
  ) => void;
}

function AttemptCard({
  attempt,

  onPress =
    () => {},

  favorite =
    false,

  onToggleFavorite =
    () => {},
}: AttemptCardProps) {
  const wrapped =
    new Attempt(
      attempt,
    );

  return (
    <ZaidSurface
      style={styles.glassShell}
      material="clear"
      cornerRadius={22}
      refractionHeight={50}
      bevelWidth={10}
      dispersionStrength={0.11}>
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          onPress(
            attempt,
          )
        }
        style={({pressed}) => [
          styles.content,
          pressed && styles.pressed,
        ]}>
        <View
          style={styles.topRow}>
          <Text
            variant="titleLarge"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.time}>
            {getAttemptTimeString(
              wrapped,
            )}
          </Text>

          <IconButton
            icon={
              favorite
                ? 'star'
                : 'star-outline'
            }
            size={20}
            style={styles.favorite}
            accessibilityLabel={
              favorite
                ? 'Quitar de favoritos'
                : 'Agregar a favoritos'
            }
            onPress={event => {
              event.stopPropagation();
              onToggleFavorite(
                attempt,
              );
            }}
          />
        </View>

        <Text
          variant="bodySmall"
          numberOfLines={1}
          style={styles.date}>
          {new Date(
            wrapped.timerStart(),
          ).toLocaleDateString()}
        </Text>
      </Pressable>
    </ZaidSurface>
  );
}

const styles = StyleSheet.create({
  glassShell: {
    minHeight: 92,
    margin: 6,
    borderRadius: 22,
  },

  content: {
    flex: 1,
    minHeight: 92,
    paddingLeft: 14,
    paddingRight: 5,
    paddingVertical: 10,
    justifyContent: 'center',
  },

  pressed: {
    opacity: 0.72,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  time: {
    flex: 1,
    minWidth: 0,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  favorite: {
    margin: 0,
  },

  date: {
    opacity: 0.72,
    marginTop: 3,
  },
});

export default memo(
  AttemptCard,
);
