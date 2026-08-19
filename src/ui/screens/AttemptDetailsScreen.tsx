// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
} from 'react-native';

import {
  IconButton,
} from 'react-native-paper';

import {
  Attempt,
} from '../../lib/stif/wrappers';

import AttemptDetails
  from '../components/attempts/AttemptDetails';

import ConfirmationDialog
  from '../components/ConfirmationDialog';

import {
  PracticeStackScreenProps,
} from '../navigation/types';

import {
  useAttemptDeletor,
} from '../../persistence/hooks';

import {
  useFavorites,
} from '../../features/favorites/FavoritesContext';

type Props =
  PracticeStackScreenProps<
    'Details'
  >;

export default function AttemptDetailsScreen({
  route,
  navigation,
}: Props) {
  const attempt =
    useMemo(
      () =>
        new Attempt(
          route.params.attempt,
        ),
      [
        route.params.attempt,
      ],
    );

  const deleteAttempt =
    useAttemptDeletor();

  const {
    isFavorite,
    toggleFavorite,
    removeFavorite,
  } =
    useFavorites();

  const [
    confirming,
    setConfirming,
  ] =
    useState(false);

  useEffect(() => {
    navigation.setOptions({
      title:
        new Date(
          attempt
            .stif()
            .timerStart,
        ).toLocaleString(),
    });
  }, [
    attempt,
    navigation,
  ]);

  const attemptId =
    attempt.id();

  const favorite =
    isFavorite(
      attemptId,
    );

  return (
    <View
      style={{
        paddingTop: 12,
        flex: 1,
      }}>

      <View
        style={{
          position:
            'absolute',

          right: 8,

          top: 4,

          zIndex: 100,
        }}>

        <IconButton
          icon={
            favorite
              ? 'star'
              : 'star-outline'
          }

          size={30}

          accessibilityLabel={
            favorite
              ? 'Quitar de favoritos'
              : 'Agregar a favoritos'
          }

          onPress={() => {
            toggleFavorite(
              attemptId,
            );
          }}
        />

      </View>

      <AttemptDetails
        attempt={
          attempt
        }

        onReplay={() =>
          navigation.push(
            'Player',
            {
              attempt:
                attempt.stif(),
            },
          )
        }

        onDelete={() =>
          setConfirming(
            true,
          )
        }

        onInspectTPS={() =>
          navigation.push(
            'TPSChart',
            {
              attempt:
                attempt.stif(),
            },
          )
        }
      />

      <ConfirmationDialog
        visible={
          confirming
        }

        onCancel={() =>
          setConfirming(
            false,
          )
        }

        onConfirm={() => {
          setConfirming(
            false,
          );

          removeFavorite(
            attemptId,
          );

          navigation.pop();

          deleteAttempt(
            attemptId,
          );
        }}
      />

    </View>
  );
}
