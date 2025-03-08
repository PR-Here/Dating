import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary } from '@/constants/Colors';
import { router } from 'expo-router';
import { createStyles } from './Style';
import { useVerification } from './useVerification';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { SCREENS } from '@/constants/Screens';

type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, typeof SCREENS.AUTH.VERIFICATION>;

export default function Verification({ route, navigation }: VerificationScreenProps) {
  const styles = createStyles();
  const {
    otp,
    inputRefs,
    timer,
    canResend,
    handleOtpChange,
    handleKeyPress,
    handleVerifyOtp,
    handleResend
  } = useVerification({
    onNext: route.params?.onVerificationSuccess,
    onBack: navigation.goBack,
    onVerificationSuccess: route.params?.onVerificationSuccess
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          variant={ETextType.H1}
          weight={ETextWeight.Bold}
          style={styles.title}
        >
          Verification
        </Text>
        <Text
          variant={ETextType.Body1}
          color={textSecondary}
          style={styles.subtitle}
        >
          Enter the code we sent to your email
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpInput}
              containerStyle={styles.otpInputContainer}
              ref={(ref) => (inputRefs.current[index] = ref)}
              autoFocus={index === 0}
              selectTextOnFocus
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <Button
          variant={EButtonVariant.PRIMARY}
          size={EButtonSize.LARGE}
          label="Verify"
          onPress={handleVerifyOtp}
          style={styles.button}
          disabled={!otp.every(digit => digit)}
        />

        <View style={styles.resendContainer}>
          <Text
            variant={ETextType.Body2}
            color={textSecondary}
          >
            {canResend ? "Didn't receive the code? " : `Resend code in ${timer}s`}
          </Text>
          {canResend && (
            <Button
              variant={EButtonVariant.TEXT}
              size={EButtonSize.SMALL}
              label="Resend"
              onPress={handleResend}
              style={styles.resendButton}
            />
          )}
        </View>
        <Button
          variant={EButtonVariant.TEXT}
          size={EButtonSize.SMALL}
          label="Back"
          onPress={navigation.goBack}
        />
      </View>
    </View>
  );
} 