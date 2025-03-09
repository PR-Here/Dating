import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { w, h } from '@/utils/Dimensions';
import { backgroundDark, backgroundLight } from '@/constants/Colors';

interface ProfileImageGalleryProps {
    images: string[];
    onEditPress: () => void;
}

const { width } = Dimensions.get('window');
const imageHeight = h(250);

export const ProfileImageGallery = ({ images, onEditPress }: ProfileImageGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(offset / slideSize);
        setActiveIndex(index);
    };

    const renderImage = ({ item }: { item: string }) => (
        <Image
            source={{ uri: item }}
            style={styles.image}
            contentFit="cover"
            transition={200}
        />
    );

    // Show placeholder if no images
    if (images.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={48} color={backgroundLight} />
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={onEditPress}
                >
                    <Ionicons name="camera" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderImage}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
            
            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View>

            {/* Edit Button */}
            <TouchableOpacity
                style={styles.editButton}
                onPress={onEditPress}
            >
                <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: imageHeight,
        backgroundColor: backgroundDark,
        position: 'relative',
    },
    image: {
        width,
        height: imageHeight,
    },
    placeholderContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: backgroundDark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        position: 'absolute',
        bottom: h(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    paginationDot: {
        width: w(8),
        height: w(8),
        borderRadius: w(4),
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: w(4),
    },
    paginationDotActive: {
        backgroundColor: 'white',
        width: w(12),
        height: w(12),
        borderRadius: w(6),
    },
    editButton: {
        position: 'absolute',
        bottom: h(20),
        right: w(20),
        width: w(48),
        height: w(48),
        borderRadius: w(24),
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
}); 