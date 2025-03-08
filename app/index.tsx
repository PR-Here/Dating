import { Redirect } from 'expo-router';
import { SCREENS } from '@/constants/Screens';

export default function Index() {
  // Redirect to the onboarding screen when the app starts
  return <Redirect href={SCREENS.ONBOARDING as any} />;
} 