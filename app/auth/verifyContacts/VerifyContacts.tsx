import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary } from '@/constants/Colors';
import { createStyles } from './Style';
import { useVerifyContacts } from './useVerifyContacts';

interface VerifyContactsProps {
    onNext: () => void;
    onBack: () => void;
}

export default function VerifyContacts({ onNext, onBack }: VerifyContactsProps) {
    const styles = createStyles();
    const {
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
    } = useVerifyContacts({ onNext });

    return (
        <View style={styles.container}>
            <Text variant={ETextType.Body1} color={textSecondary} style={styles.subtitle}>
                Verify your phone number and set up your password
            </Text>

            <View style={styles.form}>
                <View style={styles.section}>
                    <Text variant={ETextType.Body2}>Phone Verification</Text>
                    <Input
                        label="OTP"
                        value={otp}
                        onChangeText={handleOtpChange}
                        error={errors.otp}
                        keyboardType="number-pad"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                    />
                    <Button
                        variant={EButtonVariant.OUTLINE}
                        size={EButtonSize.SMALL}
                        label="Verify OTP"
                        onPress={handleVerifyOtp}
                    />
                </View>

                <View style={styles.section}>
                    <Text variant={ETextType.Body2}>Email Verification (Optional)</Text>
                    <Button
                        variant={EButtonVariant.OUTLINE}
                        size={EButtonSize.SMALL}
                        label={emailVerified ? "Email Verified" : "Send Verification Email"}
                        onPress={handleVerifyEmail}
                        disabled={emailVerified}
                    />
                </View>

                <View style={styles.section}>
                    <Text variant={ETextType.Body2}>Set Password</Text>
                    <Input
                        label="Password"
                        value={password}
                        onChangeText={handlePasswordChange}
                        error={errors.password}
                        secureTextEntry
                        placeholder="Create password"
                    />
                    <Input
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        error={errors.confirmPassword}
                        secureTextEntry
                        placeholder="Confirm password"
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    variant={EButtonVariant.PRIMARY}
                    size={EButtonSize.LARGE}
                    label="Continue"
                    onPress={onNext}
                    style={styles.button}
                />
                <Button
                    variant={EButtonVariant.TEXT}
                    size={EButtonSize.SMALL}
                    label="Back"
                    onPress={onBack}
                />
            </View>
        </View>
    );
} 