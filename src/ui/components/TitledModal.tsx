// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import * as React from 'react';

import {
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  Modal,
  Portal,
  Text,
} from 'react-native-paper';

import ZaidSurface from './zaid/ZaidSurface';

interface TitledModalProps {
  title: string;
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const TitledModal: React.FC<TitledModalProps> = ({
  title,
  visible,
  onDismiss,
  children,
}) => {
  const {height} = useWindowDimensions();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalSlot,
          {
            maxHeight:
              height * 0.82,
          },
        ]}>
        <ZaidSurface
          style={styles.panel}
          material="regular"
          cornerRadius={30}
          refractionHeight={68}
          bevelWidth={14}
          dispersionStrength={0.13}>
          <View
            style={styles.titleContainer}>
            <Text
              variant="titleLarge"
              numberOfLines={2}
              style={styles.title}>
              {title}
            </Text>
          </View>

          <View
            style={styles.childrenContainer}>
            {children}
          </View>
        </ZaidSurface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalSlot: {
    marginHorizontal: 18,
    marginVertical: 24,
  },

  panel: {
    maxHeight: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },

  titleContainer: {
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },

  title: {
    fontWeight: '800',
    letterSpacing: -0.3,
  },

  childrenContainer: {
    flexShrink: 1,
    minHeight: 0,
    alignItems: 'stretch',
  },
});

export default TitledModal;
