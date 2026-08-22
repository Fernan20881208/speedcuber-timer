import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  StyleSheet,
  View,
} from 'react-native';

import RNBootSplash from 'react-native-bootsplash';

import DrawerNavigator from './DrawerNavigator';

import {
  useAppearance,
} from '../../features/appearance/AppearanceContext';

import GlassBackdrop from '../components/zaid/GlassBackdrop';

const MainNavigator = () => {
  const {
    theme,
    mode,
  } = useAppearance();

  const useGlass =
    mode === 'liquidGlass';

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            useGlass
              ? '#070810'
              : theme.colors.background,
        },
      ]}>
      {useGlass && (
        <GlassBackdrop />
      )}

      <View style={styles.navigationLayer}>
        <NavigationContainer
          theme={theme}
          onReady={() =>
            RNBootSplash.hide({
              fade: true,
              duration: 500,
            })
          }>
          <DrawerNavigator />
        </NavigationContainer>
      </View>
    </View>
  );
};

MainNavigator.title =
  'Bottom Navigation';

export default MainNavigator;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  navigationLayer: {
    flex: 1,
  },
});
