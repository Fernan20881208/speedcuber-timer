// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import * as React
  from 'react';

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {
  useTranslation,
} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import BackupScreen
  from '../screens/BackupScreen';

import PracticeNavigator
  from './PracticeNavigator';

import AppearanceScreen
  from '../screens/AppearanceScreen';

import TrainingScreen
  from '../screens/TrainingScreen';

import {
  RootDrawerParamList,
} from './types';

import {
  useAppearance,
} from '../../features/appearance/AppearanceContext';
import ZaidSurface from '../components/zaid/ZaidSurface';

const Drawer =
  createDrawerNavigator<
    RootDrawerParamList
  >();

const ExamplesNavigator =
  __DEV__
    ? require(
        '../examples/ExamplesNavigator',
      ).default
    : null;

const PlayScreen =
  __DEV__
    ? require(
        '../screens/PlayScreen',
      ).default
    : null;

const FileSystemStackNavigator =
  __DEV__
    ? require(
        '../components/filesystem/FileSystemStackNavigator',
      ).default
    : null;

function DrawerContent(
  props: DrawerContentComponentProps,
) {
  const {
    mode,
  } = useAppearance();

  const useGlass =
    mode === 'liquidGlass';

  const content = (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerScroll}>
      <View
        style={styles.brand}>
        <Text
          variant="headlineSmall"
          style={styles.brandTitle}>
          Zaid
        </Text>
        <Text
          variant="bodySmall"
          style={styles.brandSubtitle}>
          Speedcube Timer
        </Text>
      </View>

      <View
        style={styles.drawerItems}>
        <DrawerItemList
          {...props}
        />
      </View>
    </DrawerContentScrollView>
  );

  if (!useGlass) {
    return content;
  }

  return (
    <ZaidSurface
      style={styles.drawerGlass}
      material="regular"
      cornerRadius={0}
      refractionHeight={62}
      bevelWidth={0}
      dispersionStrength={0.11}>
      {content}
    </ZaidSurface>
  );
}

const DrawerNavigator:
  React.FC = () => {
  const {
    t,
  } =
    useTranslation();

  const {
    mode,
  } =
    useAppearance();

  const useGlass =
    mode === 'liquidGlass';

  return (
    <Drawer.Navigator
      id="Root"
      drawerContent={props => (
        <DrawerContent
          {...props}
        />
      )}
      screenOptions={{
        headerShown:
          false,

        drawerStyle:
          useGlass
            ? {
                backgroundColor:
                  'transparent',
              }
            : undefined,

        overlayColor:
          useGlass
            ? 'rgba(0, 0, 0, 0.38)'
            : undefined,
      }}>

      <Drawer.Screen
        name="Practice"
        component={
          PracticeNavigator
        }
      />

      <Drawer.Screen
        name="Training"
        component={
          TrainingScreen
        }
        options={{
          drawerLabel:
            'Entrenamiento',
        }}
      />

      <Drawer.Screen
        name="Appearance"
        component={
          AppearanceScreen
        }
        options={{
          drawerLabel:
            'Apariencia',
        }}
      />

      <Drawer.Screen
        name="Backup"
        component={
          BackupScreen
        }
        options={{
          drawerLabel:
            t(
              'backup.drawerLabel',
            ),
        }}
      />

      {__DEV__ &&
        ExamplesNavigator &&
        PlayScreen &&
        FileSystemStackNavigator && (
          <>
            <Drawer.Screen
              name="Examples"
              component={
                ExamplesNavigator
              }
              options={{
                drawerLabel:
                  'Dev Examples',
              }}
            />

            <Drawer.Screen
              name="Play"
              component={
                PlayScreen
              }
              options={{
                drawerLabel:
                  'Dev Playground',
              }}
            />

            <Drawer.Screen
              name="FileSystemStack"
              component={
                FileSystemStackNavigator
              }
              options={{
                drawerLabel:
                  'File System',
              }}
            />
          </>
        )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerGlass: {
    flex: 1,
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },

  drawerScroll: {
    flexGrow: 1,
    paddingTop: 12,
  },

  brand: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
  },

  brandTitle: {
    fontWeight: '900',
    letterSpacing: -0.5,
  },

  brandSubtitle: {
    marginTop: 1,
    opacity: 0.62,
    letterSpacing: 0.4,
  },

  drawerItems: {
    paddingHorizontal: 4,
  },
});

export default DrawerNavigator;
