// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  SegmentedButtons,
} from 'react-native-paper';

import {
  useMemo,
  useState,
} from 'react';

import AttemptList
  from '../components/attempts/AttemptList';

import {
  STIF,
} from '../../lib/stif';

import {
  TimerTabScreenProps,
} from '../navigation/types';

import {
  useAttempts,
} from '../../persistence/hooks';

import {
  useCompetitiveEvent,
} from '../hooks/useCompetitiveEvent';

import {
  useFavorites,
} from '../../features/favorites/FavoritesContext';

type Props =
  TimerTabScreenProps<
    'Attempts'
  >;

type Filter =
  | 'all'
  | 'favorites';

export default function AttemptsScreen({
  navigation,
}: Props) {
  const [
    event,
  ] =
    useCompetitiveEvent();

  const attempts =
    useAttempts({
      event,

      sortDirection:
        'descending',
    });

  const {
    favoriteIds,

    isFavorite,

    toggleFavorite,
  } =
    useFavorites();

  const [
    filter,
    setFilter,
  ] =
    useState<
      Filter
    >('all');

  const visibleAttempts =
    useMemo(() => {
      const all =
        Array.from(
          attempts,
        );

      if (
        filter ===
        'favorites'
      ) {
        return all.filter(
          attempt =>
            favoriteIds.has(
              attempt.id,
            ),
        );
      }

      return all;
    }, [
      attempts,
      filter,
      favoriteIds,
    ]);

  return (
    <View
      style={
        styles.container
      }>

      <SegmentedButtons
        value={
          filter
        }

        onValueChange={
          value =>
            setFilter(
              value as Filter,
            )
        }

        buttons={[
          {
            value:
              'all',

            label:
              'Todos',

            icon:
              'history',
          },

          {
            value:
              'favorites',

            label:
              'Favoritos',

            icon:
              'star',
          },
        ]}

        style={
          styles.filters
        }
      />

      <AttemptList
        attempts={
          visibleAttempts
        }

        isFavorite={
          isFavorite
        }

        onToggleFavorite={
          attempt =>
            toggleFavorite(
              attempt.id,
            )
        }

        onPress={(
          attempt:
            STIF.Attempt,
        ) => {
          const clone =
            JSON.parse(
              JSON.stringify(
                attempt,
              ),
            );

          navigation.push(
            'Details',
            {
              attempt:
                clone,
            },
          );
        }}
      />

    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
    },

    filters: {
      marginHorizontal:
        12,

      marginTop:
        10,

      marginBottom:
        4,
    },
  });
