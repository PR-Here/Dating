import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary } from '@/constants/Colors';
import { validateEmail, validatePhone } from '@/utils/validation';
import { createStyles } from './Style';
import { useWelcome } from './useWelcome';

interface WelcomeProps {
  onNext?: () => void;
}

export default function Welcome({ onNext = () => {} }: WelcomeProps) {
  const styles = createStyles();
  const {
    email,
    emailError,
    phone,
    phoneError,
    formattedNumber,
    handlePhoneChange,
    validatePhone,
    handleContinue,
    handleEmailChange
  } = useWelcome({ onNext });

  return (
    <View style={styles.content}>
      <View style={styles.form}>
        <Input
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
        />
        <Text
          variant={ETextType.Caption}
          color={textSecondary}
          style={styles.helperText}
        >
          We'll send you a verification link
        </Text>

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          error={phoneError}
          keyboardType="phone-pad"
          placeholder="+91 XXXXX XXXXX"
          style={styles.phoneInput}
        />
        <Text
          variant={ETextType.Caption}
          color={textSecondary}
          style={styles.helperText}
        >
          We'll send you an OTP for verification
        </Text>
      </View>

      <Button
        variant={EButtonVariant.PRIMARY}
        size={EButtonSize.LARGE}
        label="Continue"
        onPress={onNext}
        style={styles.button}
      />
    </View>
  );
} 