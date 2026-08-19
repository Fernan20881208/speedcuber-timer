import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY =
  '@zaid_speedcube_timer/favorite_attempt_ids';

export async function loadFavoriteAttemptIds():
  Promise<string[]> {
  try {
    const raw =
      await AsyncStorage.getItem(
        FAVORITES_KEY,
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return [
      ...new Set(
        parsed.filter(
          value =>
            typeof value ===
            'string',
        ),
      ),
    ];
  } catch (error) {
    console.warn(
      'Could not load favorites',
      error,
    );

    return [];
  }
}

export async function saveFavoriteAttemptIds(
  ids: string[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(ids),
    );
  } catch (error) {
    console.warn(
      'Could not save favorites',
      error,
    );
  }
}
