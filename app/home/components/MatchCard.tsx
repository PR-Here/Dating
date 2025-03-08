import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Text } from '@/components/Text';
import { ETextType, ETextWeight } from '@/types/TextType';
import { w, h } from '@/utils/Dimensions';
import { primary } from '@/constants/Colors';
import { MatchData } from '@/types/MatchDataType';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { FloatingButton } from './FloatingButton';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const SPRING_CONFIG = {
  damping: 15,
  mass: 0.5,
  stiffness: 200,
};

interface MatchCardProps {
  data: MatchData;
  onLike: () => void;
  onPass: () => void;
  onMessage: () => void;
  isFirst: boolean;
  index: number;
}

export const MatchCard = ({ data, onLike, onPass, onMessage, isFirst, index }: MatchCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardRotate = useSharedValue(0);
  const scale = useSharedValue(isFirst ? 1 : 0.95 - index * 0.05);
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (isFirst) {
      scale.value = withSpring(1, SPRING_CONFIG);
    }
  }, [isFirst]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
      cardRotate.value = interpolate(
        translateX.value,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-30, 0, 30]
      );
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withSpring(
          Math.sign(event.translationX) * SCREEN_WIDTH * 1.5,
          SPRING_CONFIG,
          (finished) => {
            if (finished) {
              runOnJS(event.translationX > 0 ? onLike : onPass)();
            }
          }
        );
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
        cardRotate.value = withSpring(0, SPRING_CONFIG);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${cardRotate.value}deg` },
      { scale: scale.value }
    ],
    opacity: interpolate(
      scale.value,
      [0.8, 1],
      [0.5, 1]
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 4],
      [0, 1]
    ),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 4, 0],
      [1, 0]
    ),
  }));

  const Container = isFirst ? PanGestureHandler : Animated.View;

  const handleChat = () => {
    router.push({
      pathname: '/chat/[id]',
      params: { id: data.id, image: data.image, name: data.name }
    });
  };

  return (
    <Container onGestureEvent={isFirst ? gestureHandler : undefined}>
      <Animated.View style={[styles.container, cardStyle]}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: data.image }} 
            style={styles.image}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
          {imageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </View>

        {isFirst && (
          <>
            <Animated.View style={[styles.actionStamp, styles.likeStamp, likeStyle]}>
              <Text variant={ETextType.H2} color="white">LIKE</Text>
            </Animated.View>

            <Animated.View style={[styles.actionStamp, styles.nopeStamp, nopeStyle]}>
              <Text variant={ETextType.H2} color="white">NOPE</Text>
            </Animated.View>

            <View style={styles.floatingButtonsContainer}>
              <FloatingButton
                onPress={onPass}
                icon="close"
                color="#FF4C4C"
              />
              <FloatingButton
                onPress={onLike}
                icon="heart-outline"
                color="#4CFF4C"
                isLike
              />
              <FloatingButton
                onPress={handleChat}
                icon="chatbubble"
                color="#4C9EFF"
              />

            </View>
          </>
        )}

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <BlurView intensity={20} tint="dark" style={styles.content}>
            <Text variant={ETextType.H3} weight={ETextWeight.Bold} style={styles.name} color="white">
              {data.name}, {data.age}
            </Text>
            <Text variant={ETextType.Caption} color="rgba(255,255,255,0.8)">
              {data.distance}km • {data.location}
            </Text>

            {data.interests && (
              <Animated.View style={styles.interests}>
                {data.interests.map((interest, index) => (
                  <BlurView key={index} intensity={10} tint="light" style={styles.interestTag}>
                    <Text variant={ETextType.Caption} style={styles.interestText}>
                      {interest}
                    </Text>
                  </BlurView>
                ))}
              </Animated.View>
            )}
          </BlurView>
        </LinearGradient>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: h(550),
    width: '100%',
    borderRadius: h(24),
    overflow: 'visible',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: h(24),
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: h(180),
  },
  content: {
    padding: w(20),
  },
  name: {
    fontSize: w(24),
    marginBottom: h(4),
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: w(8),
    marginTop: h(12),
  },
  interestTag: {
    paddingHorizontal: w(12),
    paddingVertical: h(6),
    borderRadius: h(20),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  interestText: {
    color: 'white',
    fontSize: w(12),
  },
  actionStamp: {
    position: 'absolute',
    top: '40%',
    padding: w(16),
    borderWidth: w(4),
    borderRadius: h(12),
    transform: [{ rotate: '-30deg' }],
  },
  likeStamp: {
    right: '10%',
    borderColor: primary,
  },
  nopeStamp: {
    left: '10%',
    borderColor: 'red',
  },
  floatingButtonsContainer: {
    position: 'absolute',
    bottom: h(-30),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: w(20),
    zIndex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}); 