import { useState } from 'react';

interface UsePhoneNumberReturn {
  phone: string;
  error: string;
  formattedNumber: string | undefined;
  handlePhoneChange: (value: string) => void;
  validatePhone: () => boolean;
}

export const usePhoneNumber = (): UsePhoneNumberReturn => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +91
    if (!cleaned.startsWith('+91') && cleaned.startsWith('+')) {
      setPhone('+91');
      return;
    }
    
    if (!cleaned.startsWith('+')) {
      setPhone('+91' + cleaned);
      return;
    }

    // Limit to +91 followed by 10 digits
    if (cleaned.length <= 13) {
      setPhone(cleaned);
    }
    setError('');
  };

  const validatePhone = (): boolean => {
    if (!phone || phone === '+91') {
      setError('Phone number is required');
      return false;
    }

    // Check if we have 10 digits after +91
    const digits = phone.replace(/[^\d]/g, '');
    if (digits.length !== 12) { // Including 91 prefix
      setError('Enter valid 10-digit number');
      return false;
    }

    return true;
  };

  const formattedNumber = phone && phone !== '+91' ? phone : undefined;

  return {
    phone,
    error,
    formattedNumber,
    handlePhoneChange,
    validatePhone,
  };
}; 