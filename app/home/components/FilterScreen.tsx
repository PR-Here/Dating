import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { w, h } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary, primary, backgroundLight } from '@/constants/Colors';
import RangeSlider from 'rn-range-slider';

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

export const FilterScreen = ({ onClose, onApply }: FilterScreenProps) => {
  const [distance, setDistance] = useState(25);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 35]);
  const [gender, setGender] = useState('all');
  const [lookingFor, setLookingFor] = useState<string[]>(['Casual']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const INTERESTS = [
    'Travel', 'Music', 'Food', 'Art', 'Sports', 
    'Reading', 'Gaming', 'Cooking', 'Yoga', 'Hiking'
  ];

  const LOOKING_FOR = ['Casual', 'Serious', 'Marriage'];
  const GENDERS = ['All', 'Men', 'Women', 'Non-binary'];

  const handleApply = () => {
    onApply({
      distance,
      ageRange,
      gender,
      lookingFor,
      interests: selectedInterests,
    });
    onClose();
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleLookingFor = (type: string) => {
    setLookingFor(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleDistanceChange = useCallback((low: number) => {
    setDistance(low);
  }, []);

  const handleAgeRangeChange = useCallback((low: number, high: number) => {
    setAgeRange([low, high]);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} 
        bounces={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant={ETextType.H2}>Filters</Text>
            <Button
              variant={EButtonVariant.TEXT}
              size={EButtonSize.SMALL}
              label="Reset"
              onPress={() => {/* Reset logic */}}
            />
          </View>

          <View style={styles.section}>
            <Text variant={ETextType.Body2} color={textSecondary}>Distance</Text>
            <Text variant={ETextType.H3} style={styles.valueText}>
              {distance} km
            </Text>
            <RangeSlider
              style={styles.slider}
              min={1}
              max={100}
              step={1}
              floatingLabel
              renderThumb={() => <View style={styles.thumb} />}
              renderRail={() => <View style={styles.rail} />}
              renderRailSelected={() => <View style={styles.railSelected} />}
              low={distance}
              onValueChanged={handleDistanceChange}
            />
          </View>

          <View style={styles.section}>
            <Text variant={ETextType.Body2} color={textSecondary}>Age Range</Text>
            <Text variant={ETextType.H3} style={styles.valueText}>
              {ageRange[0]} - {ageRange[1]}
            </Text>
            <RangeSlider
              style={styles.slider}
              min={18}
              max={70}
              step={1}
              floatingLabel
              renderThumb={() => <View style={styles.thumb} />}
              renderRail={() => <View style={styles.rail} />}
              renderRailSelected={() => <View style={styles.railSelected} />}
              low={ageRange[0]}
              high={ageRange[1]}
              onValueChanged={handleAgeRangeChange}
            />
          </View>

          <View style={styles.section}>
            <Text variant={ETextType.Body2} color={textSecondary}>Show Me</Text>
            <View style={styles.optionsContainer}>
              {GENDERS.map((g) => (
                <Button
                  key={g}
                  variant={gender.toLowerCase() === g.toLowerCase() ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                  size={EButtonSize.SMALL}
                  label={g}
                  onPress={() => setGender(g.toLowerCase())}
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text variant={ETextType.Body2} color={textSecondary}>Looking For</Text>
            <View style={styles.optionsContainer}>
              {LOOKING_FOR.map((type) => (
                <Button
                  key={type}
                  variant={lookingFor.includes(type) ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                  size={EButtonSize.SMALL}
                  label={type}
                  onPress={() => toggleLookingFor(type)}
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text variant={ETextType.Body2} color={textSecondary}>Interests</Text>
            <View style={styles.optionsContainer}>
              {INTERESTS.map((interest) => (
                <Button
                  key={interest}
                  variant={selectedInterests.includes(interest) ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                  size={EButtonSize.SMALL}
                  label={interest}
                  onPress={() => toggleInterest(interest)}
                  style={styles.optionButton}
                />
              ))}
            </View>
          </View>

          <Button
            variant={EButtonVariant.PRIMARY}
            size={EButtonSize.LARGE}
            label="Apply Filters"
            onPress={handleApply}
            style={styles.applyButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: w(24),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: h(24),
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
  applyButton: {
    marginTop: h(24),
    marginBottom: h(48),
  },
}); 