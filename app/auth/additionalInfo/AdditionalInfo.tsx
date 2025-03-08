import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary } from '@/constants/Colors';
import { router } from 'expo-router';
import { createStyles } from './Style';
import { useAdditionalInfo } from './useAdditionalInfo';



interface AdditionalInfoProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function AdditionalInfo({ onNext = () => { }, onBack = () => { } }: AdditionalInfoProps) {
  const styles = createStyles();

  const { bio,
    occupation,
    LANGUAGES,
    HOBBIES,
    selectedLanguages,
    selectedHobbies,
    toggleSelection,
    setBio,
    setOccupation,
    setSelectedLanguages,
    setSelectedHobbies,
  } = useAdditionalInfo({ onNext, onBack });


  return (
    <View style={styles.content}>
      <Text
        variant={ETextType.Body1}
        color={textSecondary}
        style={styles.subtitle}
      >
        Tell us more about yourself
      </Text>

      <Input
        label="Bio"
        value={bio}
        onChangeText={setBio}
        placeholder="Write something about yourself..."
        multiline
        numberOfLines={4}
        style={styles.bioInput}
      />

      <Input
        label="Occupation"
        value={occupation}
        onChangeText={setOccupation}
        placeholder="What do you do?"
        style={styles.input}
      />

      <Text
        variant={ETextType.Body2}
        color={textSecondary}
        style={styles.sectionTitle}
      >
        Languages you speak
      </Text>
      <View style={styles.optionsContainer}>
        {LANGUAGES.map((language) => (
          <Button
            key={language}
            variant={selectedLanguages.includes(language) ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
            size={EButtonSize.SMALL}
            label={language}
            onPress={() => toggleSelection(language, selectedLanguages, setSelectedLanguages)}
            style={styles.optionButton}
          />
        ))}
      </View>

      <Text
        variant={ETextType.Body2}
        color={textSecondary}
        style={styles.sectionTitle}
      >
        Your Hobbies
      </Text>
      <View style={styles.optionsContainer}>
        {HOBBIES.map((hobby) => (
          <Button
            key={hobby}
            variant={selectedHobbies.includes(hobby) ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
            size={EButtonSize.SMALL}
            label={hobby}
            onPress={() => toggleSelection(hobby, selectedHobbies, setSelectedHobbies)}
            style={styles.optionButton}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          variant={EButtonVariant.PRIMARY}
          size={EButtonSize.LARGE}
          label="Continue"
          onPress={onNext}
          style={styles.button}
        // disabled={!bio || !occupation || selectedLanguages.length === 0 || selectedHobbies.length === 0}
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