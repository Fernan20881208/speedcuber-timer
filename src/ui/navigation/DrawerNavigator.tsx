// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as React
  from 'react';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import {
  useTranslation,
} from 'react-i18next';

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

const Drawer =
  createDrawerNavigator<
    RootDrawerParamList
  >();

/*
 * IMPORTANTE:
 *
 * No importamos las pantallas DEV
 * estáticamente.
 *
 * En Release no deben inicializarse
 * ni cargar todos los archivos
 * *.examples.tsx.
 */

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

const DrawerNavigator:
  React.FC = () => {
  const {
    t,
  } =
    useTranslation();

  return (
    <Drawer.Navigator
      id="Root"

      screenOptions={{
        headerShown:
          false,
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

export default DrawerNavigator;
