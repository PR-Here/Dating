import { useState, useEffect } from "react";
import { usePhoneNumber } from "@/hooks/usePhoneNumber";
import { validateEmail } from "@/utils/validation";

interface WelcomeProps {
    onNext: () => void;
}

export const useWelcome = ({ onNext }: WelcomeProps) => {
    const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const {
    phone,
    error: phoneError,
    formattedNumber,
    handlePhoneChange,
    validatePhone
  } = usePhoneNumber();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value) {
      const error = validateEmail(value);
      setEmailError(error);
    } else {
      setEmailError('');
    }
  };

  const handleContinue = async () => {
    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);

    const isPhoneValid = validatePhone();

    if (!emailValidationError && isPhoneValid) {
      try {
        console.log('Formatted number:', formattedNumber);
        // await sendVerificationEmail(email);
        // await sendOTP(formattedNumber);
        onNext();
      } catch (error) {
        console.error('Verification failed:', error);
      }
    }
  };

    return {
        email,
        emailError,
        phone,
        phoneError,
        formattedNumber,
        handlePhoneChange,
        validatePhone,
        handleContinue,
        setEmail,
        setEmailError,
        handleEmailChange
    }
}