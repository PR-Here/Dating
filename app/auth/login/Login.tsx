import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary } from '@/constants/Colors';
import { createStyles } from './Style';
import { ELoginMethod } from '@/types/LoginType';
import { useLogin } from './useLogin';

export default function Login() {
  const styles = createStyles();
  const {
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
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.content}>
          <Text
            variant={ETextType.H1}
            weight={ETextWeight.Bold}
            style={styles.title}
          >
            Welcome Back
          </Text>
          <Text
            variant={ETextType.Body1}
            color={textSecondary}
            style={styles.subtitle}
          >
            Sign in to continue
          </Text>

          <View style={styles.socialButtons}>
            <Button
              variant={EButtonVariant.OUTLINE}
              size={EButtonSize.LARGE}
              label="Continue with Google"
              onPress={() => { }}
              style={styles.socialButton}
            />
            <Button
              variant={EButtonVariant.OUTLINE}
              size={EButtonSize.LARGE}
              label="Continue with Apple"
              onPress={() => { }}
              style={styles.socialButton}
            />
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text variant={ETextType.Body2} color={textSecondary}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.form}>
            <Input
              label={loginMethod === ELoginMethod.EMAIL ? 'Email' : 'Phone Number'}
              value={loginMethod === ELoginMethod.EMAIL ? email : phone}
              onChangeText={loginMethod === ELoginMethod.EMAIL ? handleEmailChange : handlePhoneChange}
              error={loginMethod === ELoginMethod.EMAIL ? errors?.email : phoneError}
              keyboardType={loginMethod === ELoginMethod.EMAIL ? 'email-address' : 'phone-pad'}
              autoCapitalize="none"
              placeholder={loginMethod === ELoginMethod.EMAIL ? 'Enter your email' : '+91 XXXXX XXXXX'}
            />
            {loginMethod === ELoginMethod.EMAIL && (
              <>
                <Input
                  label="Password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  error={errors?.password}
                  secureTextEntry
                  placeholder="Enter your password"
                />
                <Button
                  variant={EButtonVariant.TEXT}
                  size={EButtonSize.SMALL}
                  label="Forgot Password?"
                  onPress={handleForgotPassword}
                  style={styles.forgotPassword}
                />
              </>
            )}
            <Button
              variant={EButtonVariant.TEXT}
              size={EButtonSize.SMALL}
              label={`Use ${loginMethod === ELoginMethod.EMAIL ? 'Phone Number' : 'Email'} Instead`}
              onPress={toggleLoginMethod}
              style={styles.toggleMethod}
            />
          </View>

          <Button
            variant={EButtonVariant.PRIMARY}
            size={EButtonSize.LARGE}
            label={loginMethod === ELoginMethod.EMAIL ? 'Sign In' : 'Send OTP'}
            onPress={handleLogin}
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text variant={ETextType.Body2} color={textSecondary}>
              Don't have an account?
            </Text>
            <Button
              variant={EButtonVariant.TEXT}
              size={EButtonSize.SMALL}
              label="Sign Up"
              onPress={handleSignUp}
              style={styles.registerButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}