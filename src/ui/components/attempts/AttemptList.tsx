// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  Dimensions,
  FlatList,
  View,
} from 'react-native';

import AttemptCard
  from './AttemptCard';

import {
  STIF,
} from '../../../lib/stif';

import ZeroAttemptsPlaceholder
  from './ZeroAttemptsPlaceholder';

const NUM_COLUMNS =
  3;

interface AttemptListProps {
  attempts:
    ArrayLike<
      STIF.Attempt
    >;

  onPress?: (
    attempt:
      STIF.Attempt,
  ) => void;

  isFavorite?: (
    attemptId:
      string,
  ) => boolean;

  onToggleFavorite?: (
    attempt:
      STIF.Attempt,
  ) => void;
}

function AttemptListDelegator(
  props:
    AttemptListProps,
) {
  if (
    props.attempts.length ===
    0
  ) {
    return (
      <ZeroAttemptsPlaceholder />
    );
  }

  return (
    <AttemptList
      {...props}
    />
  );
}

function AttemptList({
  attempts,

  onPress =
    () => {},

  isFavorite =
    () => false,

  onToggleFavorite =
    () => {},
}: AttemptListProps) {
  const renderAttempt = ({
    item,
  }: {
    item:
      STIF.Attempt;
  }) => (
    <View
      style={{
        width:
          Dimensions
            .get(
              'window',
            )
            .width /
          NUM_COLUMNS,
      }}>

      <AttemptCard
        key={
          item.id
        }

        attempt={
          item
        }

        onPress={
          onPress
        }

        favorite={
          isFavorite(
            item.id,
          )
        }

        onToggleFavorite={
          onToggleFavorite
        }
      />

    </View>
  );

  return (
    <View
      style={{
        flex: 1,
      }}>

      <FlatList
        data={
          Array.from(
            attempts,
          )
        }

        renderItem={
          renderAttempt
        }

        keyExtractor={
          attempt =>
            attempt.id
        }

        numColumns={
          NUM_COLUMNS
        }

        initialNumToRender={
          30
        }
      />

    </View>
  );
}

export default
  AttemptListDelegator;
