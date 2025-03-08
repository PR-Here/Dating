import { View, Dimensions, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    SharedValue,
    withSpring,
} from 'react-native-reanimated';
import { IMAGES } from '../../assets/images';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { h, w, screen } from '@/utils/Dimensions';
import { createStyles } from './Style';
import { Button } from '@/components/Button';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { Text } from '@/components/Text';
import { textSecondary } from '@/constants/Colors';
import { ETextType, ETextWeight } from '@/types/TextType';
import { BlurView } from 'expo-blur';
import { SCREENS } from '@/constants/Screens';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { navigate } from '@/navigation/RootNavigation';
import React from 'react';

const onboardingData = [
    {
        title: "Find Your Perfect Match",
        description: "Discover meaningful connections with people who share your interests, values, and aspirations.",
        image: IMAGES.ONBOARDING_1
    },
    {
        title: "Safe & Secure Dating",
        description: "Your privacy matters. Enjoy secure messaging and verified profiles in a safe dating environment.",
        image: IMAGES.ONBOARDING_2
    },
    {
        title: "Smart Matchmaking",
        description: "Our intelligent algorithm suggests compatible matches based on your preferences and personality.",
        image: IMAGES.ONBOARDING_3
    },
    {
        title: "Real Connections",
        description: "Meet genuine people nearby. Video chat and plan dates with confidence in our trusted community.",
        image: IMAGES.ONBOARDING_4
    },
    {
        title: "Start Your Journey",
        description: "Ready to find love? Create your profile now and begin your romantic adventure with us.",
        image: IMAGES.ONBOARDING_5
    }
];

export default function Onboarding() {
    const styles = createStyles();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const translateX = useSharedValue(0);
    const scrollRef = useRef<ScrollView | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            scrollRef.current?.scrollTo({
                x: screen.width * (currentIndex + 1),
                animated: true
            });
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate(SCREENS.MAIN);
        }
    };

    const handleSkip = () => {
        navigate(SCREENS.MAIN);
    };

    const handleScroll = (event: any) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screen.width);
        setCurrentIndex(slideIndex);
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <LinearGradient
                colors={['#2A1B54', '#1E1437', '#150D2B']}
                style={styles.gradientBackground}
            />
            {/* Pass styles to FloatingElements */}
            <FloatingElements translateX={translateX} styles={styles} />

            <Animated.ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleScroll}
            >
                {onboardingData.map((item, index) => (
                    <OnboardingItem
                        key={index}
                        item={item}
                        index={index}
                        translateX={translateX}
                        styles={styles}

                    />
                ))}
            </Animated.ScrollView>

            <View style={styles.pagination}>
                {onboardingData.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    variant={EButtonVariant.OUTLINE}
                    size={EButtonSize.MEDIUM}
                    label="Skip"
                    onPress={handleSkip}
                    style={styles.skipButton}
                />
                <Button
                    variant={EButtonVariant.PRIMARY}
                    size={EButtonSize.MEDIUM}
                    label={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                    onPress={handleNext}
                />
            </View>
        </View>
    );
}

function OnboardingItem({ item, index, translateX, styles }: any) {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * screen.width,
            index * screen.width,
            (index + 1) * screen.width,
        ];

        const translateY = interpolate(
            translateX.value,
            inputRange,
            [100, 0, 100]
        );

        const scale = interpolate(
            translateX.value,
            inputRange,
            [0.8, 1, 0.8]
        );

        const opacity = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0]
        );

        return {
            transform: [
                { translateY: withSpring(translateY, { damping: 20 }) },
                { scale: withSpring(scale, { damping: 20 }) }
            ],
            opacity: withSpring(opacity, { damping: 20 }),
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * screen.width,
            index * screen.width,
            (index + 1) * screen.width,
        ];

        const scale = interpolate(
            translateX.value,
            inputRange,
            [1, 1, 1]
        );

        return {
            transform: [{ scale: withSpring(scale, { damping: 20 }) }],
        };
    });

    return (
        <View style={styles.itemContainer}>
            <Animated.View style={[styles.imageBackground, imageAnimatedStyle]}>
                <Image resizeMode='center' source={item.image} style={styles.image} />
                <View style={styles.overlay} />
            </Animated.View>

            <Animated.View style={[styles.floatingCard, animatedStyle]}>
                <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
                    <Text
                        variant={ETextType.Body1}
                        weight={ETextWeight.Bold}
                        color={textSecondary}
                        style={styles.headerText}
                    >
                        {item.title}
                    </Text>
                    <Text
                        variant={ETextType.H1}
                        weight={ETextWeight.Semibold}
                        style={styles.title}
                    >
                        {item.title}
                    </Text>
                    <Text
                        variant={ETextType.Body2}
                        color={textSecondary}
                    >
                        {item.description}
                    </Text>
                </BlurView>
            </Animated.View>
        </View>
    );
}

function FloatingElements({ translateX, styles }: any) {
    const element1Style = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(interpolate(translateX.value,
                    [0, screen.width], [0, -100]))
            },
            {
                translateY: withSpring(interpolate(translateX.value,
                    [0, screen.width], [0, 50]))
            }
        ],
        opacity: withSpring(interpolate(translateX.value,
            [0, screen.width], [0.1, 0.05]))
    }));

    const element2Style = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(interpolate(translateX.value,
                    [0, screen.width], [100, 0]))
            },
            {
                translateY: withSpring(interpolate(translateX.value,
                    [0, screen.width], [-50, 0]))
            }
        ],
        opacity: withSpring(interpolate(translateX.value,
            [0, screen.width], [0.05, 0.1]))
    }));

    return (
        <>
            <Animated.View style={[styles.floatingElement, element1Style, {
                top: h(100),
                left: w(20),
            }]} />
            <Animated.View style={[styles.floatingElement, element2Style, {
                top: h(200),
                right: w(20),
            }]} />
        </>
    );
}