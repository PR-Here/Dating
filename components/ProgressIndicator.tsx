import React from 'react';
import { View, StyleSheet } from 'react-native';
import { w, h } from '@/utils/Dimensions';
import { primary, textSecondary } from '@/constants/Colors';

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < currentStep && styles.completed,
            index === currentStep && styles.current,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: w(8),
    marginBottom: h(32),
  },
  step: {
    width: w(32),
    height: h(4),
    borderRadius: h(2),
    backgroundColor: textSecondary + '40',
  },
  completed: {
    backgroundColor: primary,
  },
  current: {
    backgroundColor: primary + '80',
  },
}); 