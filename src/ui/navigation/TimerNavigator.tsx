// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  Text,
  useTheme,
} from 'react-native-paper';

import AttemptsScreen from '../screens/AttemptsScreen';
import Icons from '../icons/iconHelper';
import InsightsScreen from '../screens/InsightsScreen';
import * as React from 'react';
import StopwatchScreen from '../screens/StopwatchScreen';
import {TimerTabParamList} from './types';
import {useTranslation} from 'react-i18next';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ZaidSurface from '../components/zaid/ZaidSurface';
import {useAppearance} from '../../features/appearance/AppearanceContext';

const Tab = createBottomTabNavigator<TimerTabParamList>();

const TimerTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const {mode} = useAppearance();
  const useGlass = mode === 'liquidGlass';

  const labels: Record<string, string> = {
    Stopwatch: t('timer'),
    Attempts: t('attempts'),
    Insights: t('insights'),
  };

  return (
    <View
      style={[
        styles.tabBarSlot,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}>
      <ZaidSurface
        style={styles.tabBar}
        material="clear"
        cornerRadius={26}
        refractionHeight={58}
        bevelWidth={12}
        dispersionStrength={0.12}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const iconColor = isFocused
            ? theme.colors.primary
            : theme.colors.onSurfaceVariant;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                params: {},
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({pressed}) => [
                styles.tabItem,
                isFocused &&
                  (useGlass
                    ? styles.tabItemSelectedGlass
                    : {
                        backgroundColor:
                          theme.colors.secondaryContainer,
                      }),
                pressed && styles.tabItemPressed,
              ]}>
              {options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: iconColor,
                    size: 22,
                  })
                : null}

              <Text
                variant="labelSmall"
                numberOfLines={1}
                style={{
                  color: iconColor,
                  fontWeight: isFocused ? '700' : '500',
                }}>
                {labels[route.name] ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </ZaidSurface>
    </View>
  );
};

const TimerNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.scene}
      screenOptions={{
        tabBarShowLabel: false,
        header: () => null,
      }}
      tabBar={props => <TimerTabBar {...props} />}>
      <Tab.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{
          tabBarLabel: t('timer'),
          tabBarIcon: ({color, size}) =>
            Icons.Entypo('stopwatch')({size, color}),
        }}
      />
      <Tab.Screen
        name="Attempts"
        component={AttemptsScreen}
        options={{
          tabBarLabel: t('attempts'),
          tabBarIcon: ({color, size}) =>
            Icons.MaterialIcons('list-alt')({size, color}),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: t('insights'),
          tabBarIcon: ({color, size}) =>
            Icons.Entypo('line-graph')({size, color}),
        }}
      />
    </Tab.Navigator>
  );
};

export default TimerNavigator;

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'transparent',
  },

  tabBarSlot: {
    paddingTop: 7,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },

  tabBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 26,
    padding: 4,
  },

  tabItem: {
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 4,
  },

  tabItemSelectedGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },

  tabItemPressed: {
    opacity: 0.72,
  },
});
