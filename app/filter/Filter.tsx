import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { backgroundLight, textSecondary } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { w, h } from '@/utils/Dimensions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function Filter() {
    const navigation = useNavigation();
    const [interests, setInterests] = React.useState<string[]>([]);
    const interestsSheetRef = React.useRef<BottomSheetModal>(null);

    const handleOpenInterests = () => {
        interestsSheetRef.current?.present();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant={ETextType.H2}>Filters</Text>
                <Button
                    variant={EButtonVariant.TEXT}
                    size={EButtonSize.SMALL}
                    label="Close"
                    onPress={() => navigation.goBack()}
                />
            </View>

            <View style={styles.section}>
                <Text variant={ETextType.H3}>Interests</Text>
                <Text variant={ETextType.Body2} color={textSecondary} style={styles.subtitle}>
                    Selected: {interests.length}/5
                </Text>
                
                <View style={styles.interestsContainer}>
                    {interests.map((interest) => (
                        <Button
                            key={interest}
                            variant={EButtonVariant.PRIMARY}
                            size={EButtonSize.SMALL}
                            label={interest}
                            onPress={handleOpenInterests}
                            style={styles.interestButton}
                        />
                    ))}
                    {interests.length < 5 && (
                        <Button
                            variant={EButtonVariant.OUTLINE}
                            size={EButtonSize.SMALL}
                            label="+ Add"
                            onPress={handleOpenInterests}
                            style={styles.addButton}
                        />
                    )}
                </View>
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundLight,
        padding: w(24),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: h(60),
        marginBottom: h(24),
    },
    section: {
        marginBottom: h(24),
    },
    subtitle: {
        marginTop: h(4),
        marginBottom: h(16),
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: w(8),
    },
    interestButton: {
        minWidth: w(80),
    },
    addButton: {
        minWidth: w(80),
    },
}); 