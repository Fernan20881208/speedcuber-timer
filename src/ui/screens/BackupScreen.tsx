// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import {Backup, Restore} from '../../persistence';
import {Button, Text, useTheme} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAttemptRestoration, useAttempts} from '../../persistence/hooks';
import {useEffect, useState} from 'react';

import {BackupEntry} from '../../persistence/types';
import ConfirmationDialog from '../components/ConfirmationDialog';
import {RootDrawerScreenProps} from '../navigation/types';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '../../features/appearance/AppearanceContext';
import ZaidSurface from '../components/zaid/ZaidSurface';

type Props = RootDrawerScreenProps<'Backup'>;

export default function BackupScreen(props: Props) {
  const {t} = useTranslation();
  const {mode} = useAppearance();
  const useGlass = mode === 'liquidGlass';
  const attempts = useAttempts({});
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [backupToRestore, setBackupToRestore] = useState(
    null as BackupEntry | null,
  );

  async function onRefresh() {
    setBackups(await Restore.list('attempts'));
  }

  async function createBackup() {
    await Backup.attempts(attempts);
    onRefresh();
  }

  async function removeBackup(backup: BackupEntry) {
    await Backup.removeAt(backup.path);
    onRefresh();
  }

  const createButton = (
    <Button
      onPress={createBackup}
      mode={useGlass ? 'text' : 'contained'}
      contentStyle={styles.actionContent}>
      {t('backup.button')}
    </Button>
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text
          variant="headlineMedium"
          style={styles.title}>
          {t('backup.title')}
        </Text>

        <Text
          variant="bodyMedium"
          style={styles.subtitle}>
          Guarda copias de tus solves y restaura una versión anterior cuando la necesites.
        </Text>
      </View>

      {useGlass ? (
        <ZaidSurface
          style={styles.createGlass}
          material="clear"
          cornerRadius={22}
          refractionHeight={46}
          bevelWidth={9}
          dispersionStrength={0.10}>
          {createButton}
        </ZaidSurface>
      ) : (
        <View style={styles.createNormal}>
          {createButton}
        </View>
      )}

      <BackupList
        backups={backups}
        onRefresh={onRefresh}
        onPressDelete={item => removeBackup(item)}
        onPressRestore={item => setBackupToRestore(item)}
      />

      <BackupConfirmationDialog
        backup={backupToRestore}
        onDismiss={() => setBackupToRestore(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  title: {
    fontWeight: '800',
    letterSpacing: -0.6,
  },

  subtitle: {
    marginTop: 5,
    opacity: 0.70,
    lineHeight: 20,
  },

  createGlass: {
    marginHorizontal: 18,
    marginTop: 16,
    borderRadius: 22,
  },

  createNormal: {
    marginHorizontal: 18,
    marginTop: 16,
  },

  actionContent: {
    minHeight: 50,
  },

  list: {
    flex: 1,
    marginTop: 10,
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 28,
    gap: 10,
  },

  backupCard: {
    borderRadius: 24,
    padding: 14,
  },

  backupDate: {
    fontWeight: '700',
  },

  backupActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 4,
  },
});

interface BackupListProps {
  backups: BackupEntry[];
  onRefresh: () => Promise<void>;
  onPressDelete: (backup: BackupEntry) => void;
  onPressRestore: (backup: BackupEntry) => void;
}

function BackupList({
  backups,
  onRefresh,
  onPressDelete,
  onPressRestore,
}: BackupListProps) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {mode} = useAppearance();
  const useGlass = mode === 'liquidGlass';
  const [refreshing, setRefreshing] = useState(false);
  const [lastBackupCheck, setLastBackupCheck] = useState(new Date());

  useEffect(() => {
    setRefreshing(true);
    const started = new Date().getTime();
    (async () => {
      await onRefresh();
      setTimeout(
        () => setRefreshing(false),
        Math.max(0, 500 - (new Date().getTime() - started)),
      );
    })();
  }, [lastBackupCheck]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={backups}
      keyExtractor={item => item.date.getTime().toString()}
      renderItem={({item}) => (
        <ZaidSurface
          style={styles.backupCard}
          material="clear"
          cornerRadius={24}
          refractionHeight={50}
          bevelWidth={10}
          dispersionStrength={0.10}>
          <Text
            variant="titleMedium"
            style={styles.backupDate}>
            {item.date.toLocaleString()}
          </Text>

          <View style={styles.backupActions}>
            <Button
              mode="text"
              onPress={() => onPressDelete(item)}
              textColor={theme.colors.error}>
              {t('restore.deleteButton')}
            </Button>

            <Button
              mode={useGlass ? 'text' : 'contained-tonal'}
              onPress={() => onPressRestore(item)}>
              {t('restore.button')}
            </Button>
          </View>
        </ZaidSurface>
      )}
      refreshing={refreshing}
      onRefresh={() => setLastBackupCheck(new Date())}
      showsVerticalScrollIndicator={false}
    />
  );
}

interface BackupConfirmationDialogProps {
  backup: null | BackupEntry;
  onDismiss: () => void;
}

function BackupConfirmationDialog({
  backup,
  onDismiss,
}: BackupConfirmationDialogProps) {
  const {t} = useTranslation();
  const restoreAttempts = useAttemptRestoration();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsProcessing(false), 500);
  }, [backup]);

  async function conductRestoreFrom(path: string) {
    setIsProcessing(true);
    const restored = await Restore.attempts(path);
    restoreAttempts(restored);
    onDismiss();
  }

  return (
    <ConfirmationDialog
      visible={backup != null || isProcessing}
      title={t('restore.guard')}
      description={t('restore.confirmation_message')}
      confirmText={t('restore.button')}
      onConfirm={() => (backup ? conductRestoreFrom(backup.path) : null)}
      onCancel={onDismiss}
    />
  );
}
