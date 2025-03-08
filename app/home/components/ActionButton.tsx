import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { w } from '@/utils/Dimensions';
import { primary, textSecondary } from '@/constants/Colors';
import { Text } from '@/components/Text';
import { ETextType } from '@/types/TextType';
import { BlurView } from 'expo-blur';

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  badge?: number;
  style?: any;
  size?: number;
  color?: string;
  blur?: boolean;
}

export const ActionButton = ({
  icon,
  onPress,
  badge,
  style,
  size = 44,
  color = textSecondary,
  blur = false
}: ActionButtonProps) => {
  const Container = blur ? BlurView : View;

  return (
    <TouchableOpacity
      style={[styles.container, { width: w(size), height: w(size), borderRadius: w(size / 2) }, style]}
      onPress={onPress}
    >
      <Container
        style={[styles.blurContainer, { borderRadius: w(size / 2) }]}
        intensity={20}
        tint="light"
      >
        <Ionicons name={icon} size={size * 0.55} color={color} />
        {badge && badge > 0 && (
          <View style={styles.badge}>
            <Text variant={ETextType.Caption} style={styles.badgeText}>
              {badge}
            </Text>
          </View>
        )}
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 1,
  },
  blurContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    zIndex: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
}); 