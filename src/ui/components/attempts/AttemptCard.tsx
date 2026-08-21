// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  Card,
  IconButton,
} from 'react-native-paper';

import {
  memo,
} from 'react';

import {
  Attempt,
} from '../../../lib/stif/wrappers';

import {
  StyleSheet,
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
      cornerRadius={22}
      refractionHeight={48}
      bevelWidth={10}
      dispersionStrength={0.10}>
      <Card
        style={styles.card}
        onPress={() =>
          onPress(
            attempt,
          )
        }>
        <Card.Title
          title={
            getAttemptTimeString(
              wrapped,
            )
          }

          titleVariant=
            "titleMedium"

          subtitle={
            new Date(
              wrapped.timerStart(),
            ).toLocaleDateString()
          }

          subtitleVariant=
            "bodySmall"

          right={() => (
            <IconButton
              icon={
                favorite
                  ? 'star'
                  : 'star-outline'
              }

              size={21}

              onPress={() =>
                onToggleFavorite(
                  attempt,
                )
              }
            />
          )}
        />
      </Card>
    </ZaidSurface>
  );
}

const styles =
  StyleSheet.create({
    glassShell: {
      margin: 10,
      borderRadius: 22,
      overflow: 'hidden',
    },

    card: {
      margin: 0,
      backgroundColor: 'transparent',
    },
  });

export default memo(
  AttemptCard,
);
