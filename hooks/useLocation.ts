import { useState, useCallback } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

interface UseLocationResult {
    location: string;
    loading: boolean;
    error: string | null;
    getCurrentLocation: () => Promise<void>;
    resetLocation: () => void;
}

export const useLocation = (): UseLocationResult => {
    const [location, setLocation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePermissionDenied = useCallback(async (retryFn: () => Promise<void>) => {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === 'denied') {
            Alert.alert(
                'Location Permission Required',
                'Please enable location access to use this feature.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings()
                    }
                ]
            );
        } else {
            Alert.alert(
                'Location Permission Required',
                'We need your permission to show relevant location information.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Grant Permission',
                        onPress: retryFn
                    }
                ]
            );
        }
    }, []);

    const getAddressFromCoords = async (latitude: number, longitude: number) => {
        try {
            const [address] = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            if (address) {
                const locationString = [
                    address.city,
                    address.region,
                    address.country
                ]
                    .filter(Boolean)
                    .join(', ');
                return locationString;
            }
            return '';
        } catch (error) {
            console.error('Error getting address:', error);
            return '';
        }
    };

    const getCurrentLocation = useCallback(async () => {
        setLoading(true);
        setError(null);
        setLocation('');

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                await handlePermissionDenied(getCurrentLocation);
                return;
            }

            const { locationServicesEnabled } = await Location.getProviderStatusAsync();

            if (!locationServicesEnabled) {
                Alert.alert(
                    'Location Services Disabled',
                    'Please enable location services in your device settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => Linking.openSettings()
                        }
                    ]
                );
                return;
            }

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            const { latitude, longitude } = position.coords;
            const locationString = await getAddressFromCoords(latitude, longitude);

            if (!locationString) {
                setError('Could not determine your location');
                return;
            }

            setLocation(locationString);
        } catch (err) {
            setError('Could not fetch location');
            console.error('Error getting location:', err);
        } finally {
            setLoading(false);
        }
    }, [handlePermissionDenied]);

    const resetLocation = useCallback(() => {
        setLocation('');
        setError(null);
    }, []);

    return {
        location,
        loading,
        error,
        getCurrentLocation,
        resetLocation
    };
}; 