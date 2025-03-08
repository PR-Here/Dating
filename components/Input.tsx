import React, { useState, forwardRef } from 'react';
import { StyleSheet, TextInput, View, TextInputProps, ViewStyle } from 'react-native';
import { Text } from './Text';
import { w, h, font } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { text, textSecondary, error as errorColor, primary } from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, style, containerStyle, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    const getLabelColor = () => {
      if (error) return errorColor;
      if (isFocused) return primary;
      return textSecondary;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text
            variant={ETextType.Body2}
            color={getLabelColor()}
            style={styles.label}
          >
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            isFocused && styles.focused,
            error && styles.error,
            style
          ]}
          placeholderTextColor={textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {error && (
          <Text
            variant={ETextType.Caption}
            color={errorColor}
            style={styles.errorText}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: h(8),
  },
  input: {
    height: h(56),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: w(16),
    paddingHorizontal: w(16),
    fontSize: font(14),
    color: text,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',

  },
  focused: {
    borderColor: primary,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  error: {
    borderColor: errorColor,
  },
  errorText: {
    marginTop: h(4),
    color: errorColor,
  },
}); 