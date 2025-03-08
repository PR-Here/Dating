import * as Font from 'expo-font';

export const useFonts = async () => {
  await Font.loadAsync({
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/Outfit-Light.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });
}; 