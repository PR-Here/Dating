import { useState, useCallback } from 'react';
import { ProfileData } from '@/types/ProfileTypes';
import { goBack, navigate } from '@/navigation/RootNavigation';
import { h } from '@/utils/Dimensions';
import { Animated } from 'react-native';
import { SCREENS } from '@/constants/Screens';

// Initial profile data for testing/development
const initialProfile: ProfileData = {
    images: [],
    name: 'John Doe',
    age: 25,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    interests: ['Travel', 'Music', 'Photography'],
    location: 'New York, NY',
};

// Constants
const headerHeight = h(250);

export const useProfile = () => {
    // Profile data state
    const [profile, setProfile] = useState<ProfileData>(initialProfile);

    // Animation values
    const scrollY = new Animated.Value(0);

    // UI state management
    const [isInterestsVisible, setIsInterestsVisible] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isLocationVisible, setIsLocationVisible] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAge, setIsEditingAge] = useState(false);

    // Temporary states for editing
    const [tempBio, setTempBio] = useState(profile.bio);
    const [tempName, setTempName] = useState(profile.name);
    const [tempAge, setTempAge] = useState(profile.age.toString());

    // Header animation interpolations
    const headerScale = scrollY.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.5, 1],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, headerHeight - h(60)],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Profile update handlers
    const updateProfile = useCallback((updates: Partial<ProfileData>) => {
        setProfile(prev => ({
            ...prev,
            ...updates,
        }));
    }, []);

    const updateImages = useCallback((images: string[]) => {
        updateProfile({ images });
    }, [updateProfile]);

    // Navigation handlers
    const handleBack = useCallback(() => {
        goBack();
    }, []);

    const handleEditPhotos = useCallback(() => {
        navigate(SCREENS.PROFILE_IMAGE_UPLOAD);
    }, []);

    // Interests modal handlers
    const handleOpenInterests = useCallback(() => {
        setIsInterestsVisible(true);
    }, []);

    const handleCloseInterests = useCallback(() => {
        setIsInterestsVisible(false);
    }, []);

    const handleUpdateInterests = useCallback((interests: string[]) => {
        updateProfile({ interests });
        handleCloseInterests();
    }, [handleCloseInterests]);

    // Field editing handlers
    const handleSaveBio = useCallback(() => {
        updateProfile({ bio: tempBio });
        setIsEditingBio(false);
    }, [tempBio, updateProfile]);

    const handleSaveName = useCallback(() => {
        if (tempName.trim()) {
            updateProfile({ name: tempName });
            setIsEditingName(false);
        }
    }, [tempName, updateProfile]);

    const handleSaveAge = useCallback(() => {
        const age = parseInt(tempAge, 10);
        if (age > 0 && age < 100) {
            updateProfile({ age });
            setIsEditingAge(false);
        }
    }, [tempAge, updateProfile]);

    const handleUpdateLocation = useCallback((location: string) => {
        updateProfile({ location });
    }, [updateProfile]);

    return {
        // Profile data
        profile,
        updateProfile,
        updateImages,

        // Animation values
        headerScale,
        headerOpacity,
        scrollY,
        headerHeight,

        // UI state
        isInterestsVisible,
        isEditingBio,
        isLocationVisible,
        isEditingName,
        isEditingAge,

        // Temporary states
        tempName,
        tempAge,
        tempBio,

        // State setters
        setTempName,
        setTempAge,
        setTempBio,
        setIsEditingBio,
        setIsLocationVisible,
        setIsEditingName,
        setIsEditingAge,
        setIsInterestsVisible,

        // Event handlers
        handleEditPhotos,
        handleOpenInterests,
        handleCloseInterests,
        handleUpdateInterests,
        handleSaveBio,
        handleSaveName,
        handleSaveAge,
        handleBack,
        handleUpdateLocation,
    };
}; 