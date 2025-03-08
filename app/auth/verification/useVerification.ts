import { useEffect } from "react";

import { useRef } from "react";
import { TextInput } from "react-native";

import { useState } from "react";

interface UseVerificationProps {
    onNext?: () => void;
    onBack?: () => void;
    onVerificationSuccess?: () => void;
}

export const useVerification = ({
    onNext,
    onBack,
    onVerificationSuccess
}: UseVerificationProps = {}) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null]);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer]);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if value is entered
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
            // Move to previous input if backspace is pressed
            if (!value && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace when input is empty
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleContinue = () => {
        if (otp.every(digit => digit) && onNext) {
            onNext();
        }
    };

    const handleResend = () => {
        if (canResend) {
            // Resend OTP logic here
            setTimer(30);
            setCanResend(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.every(digit => digit)) {
            // API call to verify OTP would go here
            if (onVerificationSuccess) {
                onVerificationSuccess();
            } else {
                onNext?.();
            }
        }   
    };

    return {
        otp,
        inputRefs,
        timer,
        canResend,
        handleOtpChange,
        handleKeyPress,
        handleVerifyOtp,
        handleResend,
        setOtp,
        setTimer,
        setCanResend,
        onVerificationSuccess,
    }
}
