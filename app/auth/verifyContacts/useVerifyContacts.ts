import { useState } from 'react';
import { validatePassword } from '@/utils/validation';

interface UseVerifyContactsProps {
    onNext: () => void;
}

export const useVerifyContacts = ({ onNext }: UseVerifyContactsProps) => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [errors, setErrors] = useState({
        otp: '',
        password: '',
        confirmPassword: '',
    });

    const handleOtpChange = (value: string) => {
        setOtp(value);
        setErrors(prev => ({ ...prev, otp: '' }));
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setErrors(prev => ({ ...prev, password: '' }));
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
    };

    const handleVerifyEmail = async () => {
        try {
            // API call to send verification email
            setEmailVerified(true);
        } catch (error) {
            console.error('Email verification failed:', error);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setErrors(prev => ({ ...prev, otp: 'Enter valid 6-digit OTP' }));
            return;
        }
        try {
            // API call to verify OTP
            console.log('OTP verified');
        } catch (error) {
            setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
        }
    };

    const handleContinue = () => {
        const passwordError = validatePassword(password);
        const confirmPasswordError = password !== confirmPassword ? 'Passwords do not match' : '';

        setErrors({
            otp: otp.length !== 6 ? 'Enter valid 6-digit OTP' : '',
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        if (!passwordError && !confirmPasswordError && otp.length === 6) {
            onNext();
        }
    };

    return {
        otp,
        password,
        confirmPassword,
        emailVerified,
        errors,
        handleOtpChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleVerifyEmail,
        handleVerifyOtp,
        handleContinue,
    };
}; 