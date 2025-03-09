import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchCard } from './components/MatchCard';
import { useHome } from './useHome';
import { backgroundDark } from '@/constants/Colors';
import { w, h } from '@/utils/Dimensions';
import HomeHeader from './components/HomeHeader';
import { SCREENS } from '@/constants/Screens';
import { navigate } from '@/navigation/RootNavigation';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const MAX_VISIBLE_CARDS = 3;

export default function Home() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const {
        newMatches,
        handleLike,
        handlePass,
        handleMessage,
        isShowInterestsModal,
        setIsShowInterestsModal,
    } = useHome();

    const handlePresentFilter = useCallback(() => {
        navigate(SCREENS.FILTER);
    }, []);

    const handleOpenInterests = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleCloseInterests = useCallback(() => {
        bottomSheetRef.current?.dismiss();
        setIsShowInterestsModal(false);
    }, []);

    // Only render the first few cards
    const visibleCards = useMemo(() => {
        return newMatches.slice(0, MAX_VISIBLE_CARDS);
    }, [newMatches]);

    const openProfile = useCallback(() => {
        navigate(SCREENS.PROFILE);
    }, []);

    return (
        <View style={styles.container}>
            <HomeHeader
                onProfilePress={openProfile}
                onFilterPress={handleOpenInterests}
                onNotificationPress={() => { }}
            />
            <View style={styles.cardsContainer}>
                {visibleCards.map((match, index) => (
                    <View
                        key={match.id}
                        style={[
                            styles.cardWrapper,
                            { zIndex: visibleCards.length - index }
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundDark,
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: w(4),
        marginTop: h(60),
    },
    cardWrapper: {
        position: 'absolute',
        width: '100%',
    },
}); 