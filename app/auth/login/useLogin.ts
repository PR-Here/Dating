import { useState } from 'react';
import { ELoginMethod } from '@/types/LoginType';
import { validateEmail, validatePassword } from '@/utils/validation';
import { usePhoneNumber } from '@/hooks/usePhoneNumber';
import { navigate } from '@/navigation/RootNavigation';
import { SCREENS } from '@/constants/Screens';

export const useLogin = () => {
  const [loginMethod, setLoginMethod] = useState<ELoginMethod>(ELoginMethod.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', email: '' });
  const {
    phone,
    error: phoneError,
    formattedNumber,
    handlePhoneChange,
    validatePhone
  } = usePhoneNumber();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors(prev => ({ ...prev, email: '' }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(prev => ({ ...prev, password: '' }));
  };

  const handleLogin = async () => {
    if (loginMethod === ELoginMethod.EMAIL) {
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      setErrors({
        email: emailError,
        password: passwordError,
      });

      if (!emailError && !passwordError) {
        // Handle email login
        navigate(SCREENS.HOME);
      }
    } else {
      const isPhoneValid = validatePhone();

      if (isPhoneValid) {
        // Navigate to OTP verification for phone login
        navigate(SCREENS.AUTH.VERIFICATION, {
          phone: formattedNumber,
          onVerificationSuccess: () => {
            navigate(SCREENS.HOME);
          }
        });
      }
    }
  };

  const handleForgotPassword = () => {
    navigate(SCREENS.AUTH.FORGOT_PASSWORD);
  };

  const handleSignUp = () => {
    navigate(SCREENS.AUTH.REGISTER);
  };

  const toggleLoginMethod = () => {
    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '' });
    setLoginMethod(prev => 
      prev === ELoginMethod.EMAIL ? ELoginMethod.PHONE : ELoginMethod.EMAIL
    );
  };

  return {
    loginMethod,
    email,
    password,
    errors,
    phone,
    phoneError,
    handleEmailChange,
    handlePasswordChange,
    handlePhoneChange,
    handleLogin,
    handleForgotPassword,
    handleSignUp,
    toggleLoginMethod
  };
}; 