import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withSequence,
    withDelay
} from 'react-native-reanimated';
import { primary, textSecondary } from '@/constants/Colors';

interface CustomTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
    tabWidth: number;
    styles: any;
}

export const CustomTabBar = ({ state, descriptors, navigation, tabWidth, styles }: CustomTabBarProps) => {
    const translateX = useSharedValue(0);
    const indicatorScale = useSharedValue(1);

    React.useEffect(() => {
        translateX.value = withSpring(state.index * tabWidth);
        indicatorScale.value = withSequence(
            withSpring(0.8),
            withDelay(50, withSpring(1))
        );
    }, [state.index, tabWidth]);

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { scaleX: indicatorScale.value }
        ],
    }));

    return (
        <View style={styles.tabBar}>
            <Animated.View style={[styles.indicator, indicatorStyle]} />
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable
                        key={index}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        {options.tabBarIcon?.({
                            focused: isFocused,
                            color: isFocused ? primary : textSecondary,
                            size: 24,
                        })}
                        <Animated.Text
                            style={[
                                styles.tabLabel,
                                { color: isFocused ? primary : textSecondary },
                            ]}
                        >
                            {options.tabBarLabel || route.name}
                        </Animated.Text>
                    </Pressable>
                );
            })}
        </View>
    );
};