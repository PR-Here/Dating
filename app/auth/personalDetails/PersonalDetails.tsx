import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary, primary } from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './Style';
import {usePersonalDetails}  from './usePersonalDetails';

interface PersonalDetailsProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function PersonalDetails({ onNext, onBack }: PersonalDetailsProps) {
  const styles = createStyles();
  const {
    name,
    dob,
    showDatePicker,
    gender,
    image,
    handleImagePick,
    handleDateChange,
    formatDate,
    isValid,
    setName,
    setShowDatePicker,
    setGender,
    
  } = usePersonalDetails()


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera" size={32} color={textSecondary} />
            <Text variant={ETextType.Body2} color={textSecondary}>
              Add Profile Photo
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Input
        label="Full Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
      />

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text variant={ETextType.Body2} color={textSecondary}>
          Date of Birth
        </Text>
        <Text variant={ETextType.Body1} color={dob ? primary : textSecondary}>
          {dob ? formatDate(dob) : 'Select your birthday'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}

      <View style={styles.genderContainer}>
        <Text variant={ETextType.Body2} color={textSecondary}>
          Gender
        </Text>
        <View style={styles.genderButtons}>
          {['Male', 'Female', 'Other'].map((option) => (
            <Button
              key={option}
              variant={gender === option ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
              size={EButtonSize.SMALL}
              label={option}
              onPress={() => setGender(option)}
              style={styles.genderButton}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer} >
        <Button
          variant={EButtonVariant.PRIMARY}
          size={EButtonSize.LARGE}
          label="Continue"
          onPress={onNext}
          style={styles.continueButton}
        />
        <Button
          variant={EButtonVariant.TEXT}
          size={EButtonSize.SMALL}
          label="Back"
          onPress={onBack}
          style={styles.backButton}
        />
      </View>
    </View>
  );
}