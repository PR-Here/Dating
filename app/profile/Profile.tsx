import React, { } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from '@/components/Text';
import { ETextType } from '@/types/TextType';
import { backgroundLight, textSecondary, primary, text, backgroundDark, black } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from './useProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InterestsModal } from './components/InterestsModal';
import { Button } from '@/components/Button';
import { EButtonVariant, EButtonSize } from '@/types/ButtonTypes';
import { Input } from '@/components/Input';
import { LocationModal } from './components/LocationModal';
import createStyles from './Style';
import { ProfileImageGallery } from './components/ProfileImageGallery';

export default function Profile() {
  const { profile, updateProfile, headerScale, headerOpacity, handleEditPhotos, handleOpenInterests, handleCloseInterests, handleUpdateInterests, handleSaveBio, handleSaveName, handleSaveAge, handleBack, isInterestsVisible, isEditingBio, isLocationVisible, isEditingName, isEditingAge, tempName, tempAge, tempBio, setTempName, setTempAge, setIsEditingBio, setIsLocationVisible, setIsEditingName, setIsEditingAge, setIsInterestsVisible, scrollY, headerHeight, handleUpdateLocation, setTempBio } = useProfile();
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
      >
        <Ionicons name="chevron-back" size={24} color={black} />
      </TouchableOpacity>

      {/* Main Scrollable Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Profile Header Section */}
        <Animated.View style={[styles.header, {
          transform: [{ scale: headerScale }],
          opacity: headerOpacity,
        }]}>
          <ProfileImageGallery
            images={profile.images}
            onEditPress={handleEditPhotos}
          />
        </Animated.View>

        <View style={styles.content}>
          {/* Name Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text variant={ETextType.H3}>Name</Text>
              {!isEditingName && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditingName(true)}
                >
                  <Text variant={ETextType.Body2} color={primary}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Name Edit Form */}
            {isEditingName ? (
              <View style={styles.editContainer}>
                <Input
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter your name"
                  style={styles.input}
                  placeholderTextColor={textSecondary}
                />
                <Button
                  variant={EButtonVariant.PRIMARY}
                  size={EButtonSize.SMALL}
                  label="Save"
                  onPress={handleSaveName}
                  disabled={!tempName.trim()}
                  style={styles.saveButton}
                />
              </View>
            ) : (
              <Text variant={ETextType.Body1}>{profile.name}</Text>
            )}
          </View>

          {/* Age Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text variant={ETextType.H3}>Age</Text>
              {!isEditingAge && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditingAge(true)}
                >
                  <Text variant={ETextType.Body2} color={primary}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
            {isEditingAge ? (
              <View style={styles.editContainer}>
                <Input
                  value={tempAge}
                  onChangeText={setTempAge}
                  placeholder="Enter your age"
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor={textSecondary}
                  style={styles.input}
                />
                <Button
                  variant={EButtonVariant.PRIMARY}
                  size={EButtonSize.SMALL}
                  label="Save"
                  onPress={handleSaveAge}
                  disabled={!tempAge.trim()}
                  style={styles.saveButton}
                />
              </View>
            ) : (
              <Text variant={ETextType.Body1}>{profile.age}</Text>
            )}
          </View>

          {/* Location Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text variant={ETextType.H2}>
                {profile.name}, {profile.age}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsLocationVisible(true)}
              >
                <Text variant={ETextType.Body2} color={primary}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text variant={ETextType.Body1} color={textSecondary}>
              {profile.location}
            </Text>
          </View>

          {/* About Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text variant={ETextType.H3}>About</Text>
              {!isEditingBio ? (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditingBio(true)}
                >
                  <Text variant={ETextType.Body2} color={primary}>Edit</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {isEditingBio ? (
              <View style={styles.bioEditContainer}>
                <Input
                  style={styles.bioInput}
                  multiline
                  value={tempBio}
                  onChangeText={setTempBio}
                  placeholder="Add a bio to tell people about yourself"
                  placeholderTextColor={textSecondary}
                />
                <Button
                  variant={EButtonVariant.PRIMARY}
                  size={EButtonSize.SMALL}
                  label="Save"
                  onPress={handleSaveBio}
                  style={styles.saveBioButton}
                />
              </View>
            ) : (
              <Text variant={ETextType.Body1} style={styles.bio}>
                {profile.bio || 'Add a bio to tell people about yourself'}
              </Text>
            )}
          </View>

          {/* Interests Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text variant={ETextType.H3}>Interests</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleOpenInterests}
              >
                <Text variant={ETextType.Body2} color={primary}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.interests}>
              {profile.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text color={backgroundLight} variant={ETextType.Body2}>{interest}</Text>
                </View>
              ))}
              {profile.interests.length === 0 && (
                <Text variant={ETextType.Body2} color={textSecondary}>
                  Add your interests to find better matches
                </Text>
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Modals */}
      <InterestsModal
        visible={isInterestsVisible}
        onClose={handleCloseInterests}
        onApply={handleUpdateInterests}
        selectedInterests={profile.interests}
      />
      <LocationModal
        visible={isLocationVisible}
        onClose={() => setIsLocationVisible(false)}
        onApply={handleUpdateLocation}
        currentLocation={profile.location}
      />
    </View>
  );
}


