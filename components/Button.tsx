import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Text } from './Text';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { w, h } from '@/utils/Dimensions';
import { primary, text, textSecondary } from '@/constants/Colors';

interface ButtonProps {
  variant?: EButtonVariant;
  size?: EButtonSize;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  leftIcon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = EButtonVariant.PRIMARY,
  size = EButtonSize.MEDIUM,
  label,
  onPress,
  disabled = false,
  leftIcon,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button as ViewStyle,
        styles[variant] as ViewStyle,
        styles[size] as ViewStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon && (
        <Text>{leftIcon}</Text>
      )}
      <Text style={[
        styles.text,
        styles[`${variant}Text`] as TextStyle,
        styles[`${size}Text`] as TextStyle,
        textStyle,
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: w(8),
    borderRadius: w(12),
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  // Variants
  [EButtonVariant.PRIMARY]: {
    backgroundColor: primary,
    paddingHorizontal: w(24),
    paddingVertical: h(12),
    elevation: 2,
  },
  [EButtonVariant.SECONDARY]: {
    backgroundColor: 'transparent',
    paddingHorizontal: w(24),
    paddingVertical: h(12),
  },
  [EButtonVariant.OUTLINE]: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: textSecondary,
    paddingHorizontal: w(24),
    paddingVertical: h(12),
  },
  [EButtonVariant.TEXT]: {
    backgroundColor: 'transparent',
    paddingHorizontal: w(0),
    paddingVertical: h(0),
    minWidth: 0, // Override default minWidth for text buttons
  },
  // Text styles
  [`${EButtonVariant.PRIMARY}Text`]: {
    color: text,
  },
  [`${EButtonVariant.SECONDARY}Text`]: {
    color: textSecondary,
  },
  [`${EButtonVariant.OUTLINE}Text`]: {
    color: textSecondary,
  },
  [`${EButtonVariant.TEXT}Text`]: {
    color: textSecondary,
  },
  // Sizes
  small: {
    minWidth: w(100),
  },
  medium: {
    minWidth: w(150),
  },
  large: {
    minWidth: w(200),
  },
  // Text sizes
  smallText: {
    fontSize: w(14),
  },
  mediumText: {
    fontSize: w(16),
  },
  largeText: {
    fontSize: w(18),
  },
}); 