import { useState } from "react";
import { navigate } from "@/navigation/RootNavigation";
import { SCREENS } from "@/constants/Screens";
import Welcome from "../welcome/Welcome";
import PersonalDetails from "../personalDetails/PersonalDetails";
import LocationPreferences from "../locationPreferences/LocationPreferences";
import AdditionalInfo from "../additionalInfo/AdditionalInfo";
import Verification from "../verification/Verification";


const TOTAL_STEPS = 6;

const useRegister = () => {
    const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRegistrationComplete = async () => {
    try {
      navigate(SCREENS.HOME);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const userProfile = {
    image: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250',
    name: 'John Doe',
    age: 25,
    location: 'New York, NY',
    interests: ['Reading', 'Traveling', 'Cooking'],
  };

  return {
    currentStep,
    handleNext,
    handleBack,
    handleRegistrationComplete,
    TOTAL_STEPS,
    userProfile
    
  }

}

export default useRegister;