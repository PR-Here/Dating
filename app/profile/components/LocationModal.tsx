import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { MyModal } from '@/components/Modal';
import { w, h } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { backgroundLight, textSecondary, primary } from '@/constants/Colors';
import { Input } from '@/components/Input';
import { useLocation } from '@/hooks/useLocation';
import { Ionicons } from '@expo/vector-icons';


interface LocationModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (location: string) => void;
    currentLocation: string;
}

export const LocationModal = ({ visible, onClose, onApply, currentLocation }: LocationModalProps) => {
    const [location, setLocation] = useState(currentLocation);
    const [hasSetLocation, setHasSetLocation] = useState(false);
    const {
        location: currentGeoLocation,
        loading,
        getCurrentLocation,
        resetLocation
    } = useLocation();

    // Reset states when modal opens
    useEffect(() => {
        if (visible) {
            setLocation(currentLocation);
            setHasSetLocation(false);
            resetLocation();
        }
    }, [visible, currentLocation, resetLocation]);

    // Update location when geolocation is fetched
    useEffect(() => {
        if (currentGeoLocation) {
            setLocation(currentGeoLocation);
            setHasSetLocation(true);
        }
    }, [currentGeoLocation]);

    const handleUseCurrentLocation = useCallback(async () => {
        try {
            await getCurrentLocation();
        } catch (error) {
            console.error('Error getting location:', error);
        }
    }, [getCurrentLocation]);

    const handleLocationChange = useCallback((text: string) => {
        setLocation(text);
        setHasSetLocation(false);
    }, []);

    const handleApply = useCallback(() => {
        if (location.trim()) {
            onApply(location);
            onClose();
        }
    }, [location, onApply, onClose]);


    return (
        <MyModal visible={visible} onClose={onClose} height={h(300)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text variant={ETextType.H2}>Location</Text>
                    <Text variant={ETextType.Body2} color={textSecondary}>
                        Enter your current location
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        value={location}
                        onChangeText={handleLocationChange}
                        placeholder="Enter your location"
                        placeholderTextColor={textSecondary}
                        editable={!loading}
                    />
                    {!hasSetLocation && (
                        <Button
                            variant={EButtonVariant.TEXT}
                            size={EButtonSize.SMALL}
                            label={loading ? "Getting location..." : "Use current location"}
                            onPress={handleUseCurrentLocation}
                            disabled={loading}
                            leftIcon={loading ?
                                <ActivityIndicator size="small" color={primary} /> :
                                <Ionicons name="location" size={20} color={primary} />
                            }
                            style={styles.locationButton}
                        />
                    )}
                </View>

                <View style={styles.footer}>
                    <Button
                        variant={EButtonVariant.PRIMARY}
                        size={EButtonSize.LARGE}
                        label="Save"
                        onPress={handleApply}
                        disabled={!location.trim() || loading}
                    />
                </View>
            </View>
        </MyModal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: w(24),
        backgroundColor: backgroundLight,
        height: h(300),
    },
    header: {
        gap: h(8),
        marginBottom: h(24),
    },
    footer: {
        marginTop: 'auto',
        paddingTop: h(16),
    },
    inputContainer: {
        position: 'relative',
    },
    locationButton: {
        marginTop: h(8),
        marginBottom: h(16),
        borderColor: textSecondary,
        borderRadius: h(8),
        padding: h(12),
        justifyContent: 'flex-start',
    },
    locationButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: w(8),
    },
    loader: {
        marginLeft: w(8),
    },
}); 