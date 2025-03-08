import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withSequence,
} from 'react-native-reanimated';

interface TabBarIconProps {
    name: any;
    color: string;
    focused: boolean;
    styles: any;
}

export const TabBarIcon = ({ name, color, focused, styles }: TabBarIconProps) => {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);

    React.useEffect(() => {
        if (focused) {
            scale.value = withSequence(
                withSpring(1.2),
                withSpring(1.1)
            );
            rotation.value = withSequence(
                withSpring(-30),
                withSpring(30),
                withSpring(0)
            );
        } else {
            scale.value = withSpring(1);
            rotation.value = withSpring(0);
        }
    }, [focused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotate: `${rotation.value}deg` }
        ],
        opacity: withSpring(focused ? 1 : 0.7),
    }));

    return (
        <Animated.View style={[styles.iconContainer, focused && styles.activeIcon, animatedStyle]}>
            <Ionicons name={name} size={24} color={color} />
        </Animated.View>
    );
};