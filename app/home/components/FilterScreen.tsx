import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { w, h } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary, primary, backgroundLight } from '@/constants/Colors';
import RangeSlider from 'rn-range-slider';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface FilterScreenProps {
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

export interface FilterValues {
  distance: number;
  ageRange: [number, number];
  gender: string;
  lookingFor: string[];
  interests: string[];
}

export const FilterScreen = React.forwardRef<BottomSheetModal, FilterScreenProps>(
  ({ onClose, onApply }, ref) => {
    const snapPoints = React.useMemo(() => ['70%'], []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose
        onDismiss={onClose}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <View style={styles.container}>
          <Text variant={ETextType.H2}>Filters</Text>
          {/* ... rest of your content ... */}
        </View>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: w(24),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h(24),
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingVertical: h(16),
  },
  section: {
    marginBottom: h(24),
  },
  valueText: {
    marginVertical: h(8),
  },
  slider: {
    height: h(40),
  },
  thumb: {
    width: w(24),
    height: w(24),
    borderRadius: w(12),
    backgroundColor: primary,
  },
  rail: {
    flex: 1,
    height: h(4),
    borderRadius: h(2),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  railSelected: {
    height: h(4),
    backgroundColor: primary,
    borderRadius: h(2),
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: w(8),
    marginTop: h(12),
  },
  optionButton: {
    minWidth: w(80),
  },
}); 