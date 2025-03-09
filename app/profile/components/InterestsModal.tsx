import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { MyModal } from '@/components/Modal';
import { w, h } from '@/utils/Dimensions';
import { ETextType } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { backgroundLight } from '@/constants/Colors';
import { EModalType } from '@/types/ModalType';

interface InterestsModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (interests: string[]) => void;
    selectedInterests: string[];
}

const INTERESTS = [
    'Travel', 'Music', 'Food', 'Art', 'Sports', 'Movies',
    'Reading', 'Gaming', 'Photography', 'Dancing', 'Cooking',
    'Fitness', 'Technology', 'Fashion', 'Nature', 'Pets'
];

export const InterestsModal = ({ visible, onClose, onApply, selectedInterests }: InterestsModalProps) => {
    const [selected, setSelected] = useState<string[]>(selectedInterests);

    const toggleInterest = (interest: string) => {
        setSelected(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleApply = () => {
        onApply(selected);
        onClose();
    };

    return (
        <MyModal visible={visible} onClose={onClose} height={h(500)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text variant={ETextType.H2}>Interests</Text>
                    <Text variant={ETextType.Body2}>Select up to 5 interests</Text>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.interestsGrid}>
                        {INTERESTS.map((interest) => (
                            <Button
                                key={interest}
                                variant={selected.includes(interest) ? EButtonVariant.PRIMARY : EButtonVariant.OUTLINE}
                                size={EButtonSize.SMALL}
                                label={interest}
                                onPress={() => toggleInterest(interest)}
                                style={styles.interestButton}
                            />
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        variant={EButtonVariant.PRIMARY}
                        size={EButtonSize.LARGE}
                        label="Apply"
                        onPress={handleApply}
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
        maxHeight: h(500),

    },
    header: {
        gap: h(8),
        marginBottom: h(24),
    },
    content: {
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: w(8),
    },
    interestButton: {
        minWidth: w(80),
    },
    footer: {
        paddingTop: h(16),
    },
}); 