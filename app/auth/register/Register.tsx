import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { ETextType, ETextWeight } from '@/types/TextType';
import { textSecondary } from '@/constants/Colors';
import { createStyles } from './Style';
import Welcome from '../welcome/Welcome';
import PersonalDetails from '../personalDetails/PersonalDetails';
import LocationPreferences from '../locationPreferences/LocationPreferences';
import AdditionalInfo from '../additionalInfo/AdditionalInfo';
import Success from '../success/Success';
import VerifyContacts from '../verifyContacts/VerifyContacts';
import useRegister from './useRegister';

export default function Register() {
  const styles = createStyles();
  const {
    currentStep,
    handleNext,
    handleBack,
    handleRegistrationComplete,
    TOTAL_STEPS,
    userProfile
  } = useRegister();

  const renderStepContent = () => {
    // Show Success screen without scroll and header
    if (currentStep === 6) {
      return (
        <Success 
          onNext={handleRegistrationComplete} 
          profileImage={userProfile.image}
        />
      );
    }

    // Regular registration flow with scroll and header
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            variant={ETextType.H1}
            weight={ETextWeight.Bold}
            style={styles.title}
          >
            Create Account
          </Text>
          <Text
            variant={ETextType.Body1}
            color={textSecondary}
            style={styles.subtitle}
          >
            Step {currentStep} of {TOTAL_STEPS}
          </Text>
          <ProgressIndicator
            steps={TOTAL_STEPS}
            currentStep={currentStep - 1}
          />
        </View>
        <ScrollView style={styles.formContainer}>
          {renderStepSwitch()}
        </ScrollView>
      </View>
    );
  };

  const renderStepSwitch = () => {
    switch (currentStep) {
      case 1:
        return <Welcome onNext={handleNext} />;
      case 2:
        return <VerifyContacts onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PersonalDetails onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <LocationPreferences onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <AdditionalInfo onNext={handleNext} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return renderStepContent();
}