import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from './Text';
import { w, h } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { text } from '@/constants/Colors';

interface SocialButtonProps {
  type: 'google' | 'apple';
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function SocialButton({ type, label, onPress, style }: SocialButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Add icon based on type */}
      <Text variant={ETextType.Body1} color={text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: h(56),
    borderRadius: w(28),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: w(12),
  },
}); 