import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { w, h } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { backgroundLight, textSecondary } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from './useProfile';

const MAX_IMAGES = 10;

export default function ProfileImageUpload() {
    const { profile, updateImages } = useProfile();
    const [images, setImages] = useState<string[]>(profile.images);

    const handleAddImage = async () => {
        if (images.length >= MAX_IMAGES) {
            // Show error or alert that max limit reached
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 5],
            quality: 0.7,
        });

        if (!result.canceled && result.assets[0].uri) {
            const newImages = [...images, result.assets[0].uri];
            setImages(newImages);
            updateImages(newImages);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        updateImages(newImages);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text variant={ETextType.H2}>Profile Photos</Text>
                </View>

                <View style={styles.section}>
                    <Text variant={ETextType.H3}>Upload Photos</Text>
                    <Text variant={ETextType.Body2} color={textSecondary} style={styles.subtitle}>
                        Add up to {MAX_IMAGES} photos to your profile
                    </Text>

                    <View style={styles.imagesGrid}>
                        {images.map((uri, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => handleRemoveImage(index)}
                                >
                                    <Ionicons name="close-circle" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {images.length < MAX_IMAGES && (
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleAddImage}
                            >
                                <Ionicons name="add" size={40} color={textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        variant={EButtonVariant.PRIMARY}
                        size={EButtonSize.LARGE}
                        label="Save Changes"
                        onPress={() => {}}
                        disabled={images.length === 0}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundLight,
    },
    header: {
        paddingHorizontal: w(24),
        paddingTop: h(60),
        paddingBottom: h(24),
    },
    section: {
        paddingHorizontal: w(24),
        marginBottom: h(24),
    },
    subtitle: {
        marginTop: h(4),
        marginBottom: h(16),
    },
    imagesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: w(8),
    },
    imageContainer: {
        width: w(104),
        height: h(130),
        borderRadius: h(12),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    addButton: {
        width: w(104),
        height: h(130),
        borderRadius: h(12),
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: textSecondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButton: {
        position: 'absolute',
        top: h(8),
        right: w(8),
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: h(12),
    },
    footer: {
        padding: w(24),
        paddingBottom: h(40),
    },
}); 