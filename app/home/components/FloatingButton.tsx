import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { w } from '@/utils/Dimensions';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
  withSequence
} from 'react-native-reanimated';

interface FloatingButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
  isLike?: boolean;
}

export const FloatingButton = ({ onPress, icon, color, size = 46, isLike }: FloatingButtonProps) => {
  const scale = useSharedValue(1);
  const fill = useSharedValue(0);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1)
    );

    if (isLike) {
      fill.value = withSequence(
        withSpring(1, { damping: 15 }),
        withSpring(0, { damping: 15 })
      );
    }

    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: isLike
      ? interpolateColor(
        fill.value,
        [0, 1],
        [color, '#FF4C4C']
      )
      : color,
  }));

  return (
    <Animated.View
      style={[
        styles.button,
        {
          width: w(size),
          height: w(size),
          borderRadius: w(size / 2),
        },
        animatedStyle
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={styles.touchable}
      >
        <Ionicons
          name={isLike && fill.value > 0 ? 'heart' : icon}
          size={size * 0.45}
          color="white"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'white',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
