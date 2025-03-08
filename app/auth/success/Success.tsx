import React, { useEffect, useRef } from 'react';
import { View, Animated, Image } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { ETextType, ETextWeight } from '@/types/TextType';
import { EButtonSize, EButtonVariant } from '@/types/ButtonTypes';
import { textSecondary, primary } from '@/constants/Colors';
import { createStyles } from './Style';
import LottieView from 'lottie-react-native';
import { navigate } from '@/navigation/RootNavigation';
import { SCREENS } from '@/constants/Screens';

interface SuccessProps {
  onNext?: () => void;
  profileImage?: string;
}

export default function Success({ onNext = () => {}, profileImage }: SuccessProps) {
  const styles = createStyles();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const titleAnim = useRef(new Animated.Value(-100)).current;
  const statsAnim = useRef(new Animated.Value(50)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    // Initial Lottie animation
    setTimeout(() => {
      Animated.sequence([
        // Fade in main content
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
        // Slide in title
        Animated.spring(titleAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        // Pop up stats
        Animated.spring(statsAnim, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500); // Wait for Lottie animation
  }, []);

  const handleStartExploring = () => {
    navigate(SCREENS.HOME);
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.successIconContainer}>
          <LottieView
            ref={lottieRef}
            source={require('../../../assets/lottie/success.json')}
            autoPlay
            loop={true}
            style={styles.animation}
          />
        </View>

        {profileImage && (
          <Animated.View style={[styles.profileContainer, { opacity: fadeAnim }]}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </Animated.View>
        )}
        
        <Animated.View style={{ transform: [{ translateY: titleAnim }] }}>
          <Text variant={ETextType.H1} weight={ETextWeight.Bold} style={styles.title}>
            Congratulations! 🎉
          </Text>
          <Text variant={ETextType.Body1} color={textSecondary} style={styles.subtitle}>
            Your profile has been created successfully.{'\n'}
            Let's find your perfect match!
          </Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.statsContainer,
            {
              transform: [{ translateY: statsAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.statItem}>
            <Animated.Text 
              style={[styles.statText, { color: primary }]}
            >
              100%
            </Animated.Text>
            <Text variant={ETextType.Caption} color={textSecondary}>
              Profile Complete
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Animated.Text 
              style={[styles.statText, { color: primary }]}
            >
              Ready
            </Animated.Text>
            <Text variant={ETextType.Caption} color={textSecondary}>
              To Match
            </Text>
          </View>
        </Animated.View>

        <Button
          variant={EButtonVariant.PRIMARY}
          size={EButtonSize.LARGE}
          label="Start Exploring"
          onPress={handleStartExploring}
          style={styles.button}
        />
      </Animated.View>
    </View>
  );
} 