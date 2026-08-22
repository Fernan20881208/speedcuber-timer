// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import AttemptCard
  from './AttemptCard';

import {
  STIF,
} from '../../../lib/stif';

import ZeroAttemptsPlaceholder
  from './ZeroAttemptsPlaceholder';

const NUM_COLUMNS = 2;

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
      style={styles.item}>
      <AttemptCard
        attempt={item}
        onPress={onPress}
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
    <FlatList
      style={styles.list}
      contentContainerStyle={
        styles.content
      }
      columnWrapperStyle={
        styles.column
      }
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
        20
      }
      showsVerticalScrollIndicator={
        false
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 7,
    paddingTop: 6,
    paddingBottom: 14,
  },

  column: {
    alignItems: 'stretch',
  },

  item: {
    flex: 1,
    minWidth: 0,
    maxWidth: '50%',
  },
});

export default
  AttemptListDelegator;
