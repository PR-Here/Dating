import { SCREENS } from '@/constants/Screens';

export type RootStackParamList = {
  [SCREENS.ONBOARDING]: undefined;
  [SCREENS.AUTH.LOGIN]: undefined;
  [SCREENS.AUTH.REGISTER]: undefined;
  [SCREENS.AUTH.WELCOME]: undefined;
  [SCREENS.AUTH.VERIFICATION]: {
    phone?: string;
    onVerificationSuccess?: () => void;
  };
  [SCREENS.MAIN]: undefined;
  [SCREENS.HOME]: undefined;
  [SCREENS.MATCHES]: undefined;
  [SCREENS.PROFILE]: undefined;
  [SCREENS.SETTINGS]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 