import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { w, h } from '@/utils/Dimensions';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { backgroundLight, primary, text, textSecondary } from '@/constants/Colors';
import { router } from 'expo-router';
import RangeSlider from 'rn-range-slider';
import { createStyles } from './Style';
import { useLocationPreference } from './useLocationPreference';
interface LocationPreferencesProps {
    onNext?: () => void;
    onBack?: () => void;
}

export default function LocationPreferences({ onNext, onBack }: LocationPreferencesProps) {
    const styles = createStyles();
    const {
        city,
        distance,
        lookingFor,
        handleContinue,
        handleValueChange,
        setCity,
        setDistance,
        setLookingFor,
    } = useLocationPreference({ onNext });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Input
                    label="Your City"
                    value={city}
                    onChangeText={setCity}
                    placeholder="Enter your city"
                    style={styles.input}
                />
                <View style={styles.sliderContainer}>
                    <Text variant={ETextType.Body2} color={textSecondary}>
                        Maximum Distance
                    </Text>
                    <Text variant={ETextType.H2} color={text} style={styles.distanceText}>
                        {distance} km
                    </Text>
                    <RangeSlider
                        style={styles.slider}
                        min={5}
                        max={100}
                        step={1}
                        floatingLabel
                        disableRange={true}
                        renderThumb={() => <View style={styles.thumb} />}
                        renderRail={() => <View style={styles.rail} />}
                        renderRailSelected={() => <View style={styles.railSelected} />}
                        initialLowValue={distance}
                        onValueChanged={handleValueChange}
                    />
                </View>

                <View style={styles.preferencesContainer}>
                    <Text variant={ETextType.Body2} color={textSecondary} style={styles.label}>
                        Looking For
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['Casual', 'Serious', 'Marriage'].map((option) => (
                            <Button
                                key={option}
                                variant={lookingFor === option ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                                size={EButtonSize.SMALL}
                                label={option}
                                onPress={() => setLookingFor(option)}
                                style={styles.optionButton}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.footer}>
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
        </View>
    );
}

