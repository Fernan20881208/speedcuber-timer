import {
  NavigationContainer,
} from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';

import DrawerNavigator from './DrawerNavigator';

import {
  useAppearance,
} from '../../features/appearance/AppearanceContext';

const MainNavigator = () => {
  const {
    theme,
  } = useAppearance();

  return (
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
  );
};

MainNavigator.title =
  'Bottom Navigation';

export default MainNavigator;
