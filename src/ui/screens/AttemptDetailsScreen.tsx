// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  StyleSheet,
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

import ZaidSurface from '../components/zaid/ZaidSurface';

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
      style={styles.container}>
      <View
        style={styles.toolbar}>
        <ZaidSurface
          style={styles.favoriteGlass}
          material="clear"
          cornerRadius={22}
          refractionHeight={42}
          bevelWidth={8}
          dispersionStrength={0.10}>
          <IconButton
            icon={
              favorite
                ? 'star'
                : 'star-outline'
            }
            size={25}
            style={styles.favoriteButton}
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
        </ZaidSurface>
      </View>

      <View
        style={styles.details}>
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
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  toolbar: {
    minHeight: 52,
    paddingHorizontal: 14,
    paddingTop: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  favoriteGlass: {
    borderRadius: 22,
  },

  favoriteButton: {
    margin: 0,
  },

  details: {
    flex: 1,
  },
});
