// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useTranslation} from 'react-i18next';
import {useAppearance} from '../../features/appearance/AppearanceContext';
import ZaidSurface from './zaid/ZaidSurface';

export interface ConfirmationDialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  visible,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const {t} = useTranslation();
  const {mode} = useAppearance();
  const useGlass = mode === 'liquidGlass';
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsProcessing(false);
    }
  }, [visible]);

  const renderedTitle = title ?? t('confirmation.title');
  const renderedDescription = description ?? t('confirmation.description');
  const renderedConfirmText = confirmText ?? t('confirmation.confirm');
  const renderedCancelText = cancelText ?? t('confirmation.cancel');

  const body = (
    <>
      {isProcessing ? (
        <Dialog.Content style={styles.processing}>
          <ActivityIndicator size="large" />
        </Dialog.Content>
      ) : (
        <>
          <Dialog.Title>{renderedTitle}</Dialog.Title>

          {renderedDescription && (
            <Dialog.Content>
              <Text>{renderedDescription}</Text>
            </Dialog.Content>
          )}

          <Dialog.Actions>
            <Button onPress={onCancel}>
              {renderedCancelText}
            </Button>

            <Button
              mode={useGlass ? 'text' : 'contained'}
              onPress={() => {
                onConfirm();
                setIsProcessing(true);
              }}>
              {renderedConfirmText}
            </Button>
          </Dialog.Actions>
        </>
      )}
    </>
  );

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={useGlass ? styles.transparentDialog : undefined}>
        {useGlass ? (
          <ZaidSurface
            style={styles.glassDialog}
            material="regular"
            cornerRadius={30}
            refractionHeight={66}
            bevelWidth={13}
            dispersionStrength={0.13}>
            {body}
          </ZaidSurface>
        ) : (
          body
        )}
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  transparentDialog: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },

  glassDialog: {
    borderRadius: 30,
    overflow: 'hidden',
  },

  processing: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
