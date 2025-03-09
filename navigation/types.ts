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
  [SCREENS.AUTH.PERSONAL_DETAILS]: undefined;
  [SCREENS.AUTH.LOCATION_PREFERENCES]: undefined;
  [SCREENS.AUTH.ADDITIONAL_INFO]: undefined;
  [SCREENS.MAIN]: undefined;
  [SCREENS.HOME]: undefined;
  [SCREENS.MATCHES]: undefined;
  [SCREENS.PROFILE]: undefined;
  [SCREENS.SETTINGS]: undefined;
  [SCREENS.CHAT]: {
    id: string,
    image: string,
    name: string
  };
  [SCREENS.FILTER]: undefined;
  [SCREENS.PROFILE_IMAGE_UPLOAD]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
} 