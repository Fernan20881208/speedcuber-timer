import {
  FavoritesProvider,
} from '../features/favorites/FavoritesContext';
import 'react-native-get-random-values';

import {
  TrainingProvider,
} from '../features/training/TrainingContext';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import MainNavigator from './navigation/MainNavigator';

import {
  Provider as PaperProvider,
} from 'react-native-paper';

import i18n from '../localization';

import {
  RealmProvider,
  useRealm,
} from '../persistence/realmdb';

import {
  AppearanceProvider,
  useAppearance,
} from '../features/appearance/AppearanceContext';

const DevComponents = () => {
  const FlipperAsyncStorage =
    require(
      'rn-flipper-async-storage-advanced',
    ).default;

  const RealmPlugin =
    require(
      'realm-flipper-plugin-device',
    ).default;

  const realm = useRealm();

  return (
    <>
      <FlipperAsyncStorage />

      <RealmPlugin
        realms={[realm]}
      />
    </>
  );
};

const ThemedApp = () => {
  const {
    theme,
  } = useAppearance();

  return (
    <PaperProvider
      theme={theme}>
      <RealmProvider>
  <FavoritesProvider>
    <TrainingProvider>

      {__DEV__ &&
        <DevComponents />}

      <MainNavigator />

    </TrainingProvider>
  </FavoritesProvider>
</RealmProvider>
    </PaperProvider>
  );
};

const App = () => {
  if (i18n.isInitialized) {
    console.log(
      'i18n initialized',
    );
  }

  return (
    <GestureHandlerRootView
      style={{flex: 1}}>
      <AppearanceProvider>
        <ThemedApp />
      </AppearanceProvider>
    </GestureHandlerRootView>
  );
};

export default App;
