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

import LiquidGlass from '../components/zaid/LiquidGlass';
import GlassBackdrop from '../components/zaid/GlassBackdrop';

const MainNavigator = () => {
  const {
    theme,
    mode,
  } = useAppearance();

  const useGlass =
    mode === 'liquidGlass';

  return (
    <View style={styles.root}>
      {useGlass && (
        <>
          <GlassBackdrop />

          <LiquidGlass
            pointerEvents="none"
            style={styles.glassLayer}
            material="regular"
            cornerRadius={0}
            refractionHeight={58}
            bevelWidth={0}
            dispersionStrength={0.10}
            dynamicBackground
            sensorHighlight
            adaptiveTint
          />
        </>
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
    backgroundColor: '#07080D',
  },

  glassLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  navigationLayer: {
    flex: 1,
  },
});
