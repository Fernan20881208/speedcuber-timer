import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppearanceMode =
  | 'system'
  | 'light'
  | 'dark'
  | 'amoled'
  | 'liquidGlass';

const APPEARANCE_STORAGE_KEY =
  '@zaid_speedcube_timer/appearance_mode';

export async function saveAppearanceMode(
  mode: AppearanceMode,
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      APPEARANCE_STORAGE_KEY,
      mode,
    );
  } catch (error) {
    console.warn(
      'Failed to save appearance mode:',
      error,
    );
  }
}

export async function loadAppearanceMode(): Promise<AppearanceMode> {
  try {
    const value = await AsyncStorage.getItem(
      APPEARANCE_STORAGE_KEY,
    );

    switch (value) {
      case 'system':
      case 'light':
      case 'dark':
      case 'amoled':
      case 'liquidGlass':
        return value;

      default:
        return 'system';
    }
  } catch (error) {
    console.warn(
      'Failed to load appearance mode:',
      error,
    );

    return 'system';
  }
}

export async function resetAppearanceMode(): Promise<void> {
  try {
    await AsyncStorage.removeItem(
      APPEARANCE_STORAGE_KEY,
    );
  } catch (error) {
    console.warn(
      'Failed to reset appearance mode:',
      error,
    );
  }
}
