export const SCREENS = {
  // Auth Flow
  ONBOARDING: 'onboarding',
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'auth/forgot-password',
    WELCOME: 'auth/welcome',
    PERSONAL_DETAILS: 'auth/personal-details',
    LOCATION_PREFERENCES: 'auth/location-preferences',
    ADDITIONAL_INFO: 'auth/additional-info',
    VERIFICATION: 'auth/verification',
    VERIFY_CONTACTS: 'auth/verify-contacts',
  },
  // Main App
  HOME: 'home',
  PROFILE: 'profile',
  MATCHES: 'matches',
  MESSAGES: 'messages',
  SETTINGS: 'settings',
  SUCCESS: 'success',
  BOTTOM_TABS: 'bottom-tabs',
  MAIN: 'main',
  

} as const; 