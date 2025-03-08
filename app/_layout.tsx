import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { ThemeProvider } from '../context/ThemeContext';
import Onboarding from './onboarding/Onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useFonts } from '@/hooks/useFonts';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
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
import Home from './home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import BottomTabs from '@/navigation/BottomTabs';

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
    <GestureHandlerRootView style={styles.container}>
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
        </RootStack.Navigator>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


