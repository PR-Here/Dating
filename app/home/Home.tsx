import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text } from '@/components/Text';
import { ETextType, ETextWeight } from '@/types/TextType';
import { MatchCard } from './components/MatchCard';
import { StoryCircle } from './components/StoryCircle';
import { ActionButton } from './components/ActionButton';
import { useHome } from './useHome';
import { Ionicons } from '@expo/vector-icons';
import { primary, backgroundLight } from '@/constants/Colors';
import { w, h } from '@/utils/Dimensions';
import HomeHeader from './components/HomeHeader';
import { FilterScreen } from './components/FilterScreen';
import { EModalType } from '@/types/ModalType';
import { Modal } from '@/components/Modal';

export default function Home() {
    const {
        stories,
        newMatches,
        handleLike,
        handlePass,
        handleMessage,
        refreshData,
        isLoading,
        openFilterBottomSheet,
        setOpenFilterBottomSheet,
        handleApplyFilters,
    } = useHome();


    return (
        <View style={styles.container}>
            <HomeHeader onProfilePress={() => { }} onFilterPress={() => setOpenFilterBottomSheet(true)} onNotificationPress={() => { }} />
            <View style={styles.cardsContainer}>
                {newMatches.map((match, index) => (
                    <View
                        key={match.id}
                        style={[
                            styles.cardWrapper,
                            { zIndex: newMatches.length - index }
                        ]}
                    >
                        <MatchCard
                            data={match}
                            onLike={() => handleLike(match.id)}
                            onPass={() => handlePass(match.id)}
                            onMessage={() => handleMessage(match.id)}
                            isFirst={index === 0}
                            index={index}
                        />
                    </View>
                ))}
            </View>
            {openFilterBottomSheet && (
                <Modal
                    position={EModalType.TOP}
                    visible={openFilterBottomSheet}
                    onClose={() => setOpenFilterBottomSheet(false)}
                    height={h(500)}
                >
                    <FilterScreen
                        onClose={() => setOpenFilterBottomSheet(false)}
                        onApply={handleApplyFilters}
                    />
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundLight,
    },

    cardsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: w(4),
        marginTop: h(60), // Adjust based on header height
    },
    cardWrapper: {
        position: 'absolute',
        width: '100%',
    },
}); 