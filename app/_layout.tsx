import React from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { ThemeProvider } from '../context/ThemeContext';
import Onboarding from './onboarding/Onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useFonts } from '@/hooks/useFonts';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Welcome from './auth/welcome/Welcome';
import PersonalDetails from './auth/personalDetails/PersonalDetails';
import LocationPreferences from './auth/locationPreferences/LocationPreferences';
import AdditionalInfo from './auth/additionalInfo/AdditionalInfo';
import Verification from './auth/verification/Verification';
import { SCREENS } from '@/constants/Screens';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import { useAppNavigation } from '@/navigation/RootNavigation';
import { RootStackParamList } from '@/navigation/types';
import BottomTabs from '@/navigation/BottomTabs';
import Profile from './profile/Profile';
import Filter from './filter/Filter';
import ProfileImageUpload from './profile/ProfileImageUpload';
import { BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await useFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useAppNavigation(); // Initialize router instance

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <RootStack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
              <RootStack.Screen name={SCREENS.AUTH.LOGIN} component={Login} />
              <RootStack.Screen name={SCREENS.AUTH.REGISTER} component={Register} />
              <RootStack.Screen name={SCREENS.AUTH.WELCOME} component={Welcome} />
              <RootStack.Screen name={SCREENS.AUTH.PERSONAL_DETAILS} component={PersonalDetails} />
              <RootStack.Screen name={SCREENS.AUTH.LOCATION_PREFERENCES} component={LocationPreferences} />
              <RootStack.Screen name={SCREENS.AUTH.ADDITIONAL_INFO} component={AdditionalInfo} />
              <RootStack.Screen name={SCREENS.AUTH.VERIFICATION} component={Verification} />
              <RootStack.Screen name={SCREENS.MAIN} component={BottomTabs} />
              <RootStack.Screen name={SCREENS.FILTER} component={Filter} />
              <RootStack.Screen name={SCREENS.PROFILE} component={Profile} />
              <RootStack.Screen name={SCREENS.PROFILE_IMAGE_UPLOAD} component={ProfileImageUpload} />
            </RootStack.Navigator>
          </ThemeProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


