import { isValidPhoneNumber } from 'libphonenumber-js';

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone) {
    return 'Phone number is required';
  }
  
  try {
    if (!isValidPhoneNumber(phone, 'IN')) {
      return 'Enter valid phone number';
    }
  } catch {
    return 'Enter valid phone number';
  }
  
  return '';
}; 