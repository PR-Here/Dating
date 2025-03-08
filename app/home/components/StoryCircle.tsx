import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { ETextType } from '@/types/TextType';
import { w, h } from '@/utils/Dimensions';
import { primary, textSecondary } from '@/constants/Colors';

interface StoryCircleProps {
  image: string;
  name: string;
  isFirst?: boolean;
  isLive?: boolean;
}

export const StoryCircle = ({ image, name, isFirst, isLive }: StoryCircleProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isFirst && styles.firstContainer
      ]}
    >
      <View style={[styles.imageContainer, isLive && styles.liveContainer]}>
        <Image source={{ uri: image }} style={styles.image} />
        {isLive && <View style={styles.liveDot} />}
      </View>
      <Text 
        variant={ETextType.Caption} 
        color={textSecondary}
        style={styles.name}
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: w(16),
  },
  firstContainer: {
    marginLeft: w(4),
  },
  imageContainer: {
    width: w(64),
    height: w(64),
    borderRadius: w(32),
    padding: 2,
    backgroundColor: 'white',
    marginBottom: h(4),
  },
  liveContainer: {
    borderWidth: 2,
    borderColor: primary,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: w(30),
  },
  name: {
    maxWidth: w(64),
    textAlign: 'center',
  },
  liveDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: primary,
    borderWidth: 2,
    borderColor: 'white',
  },
}); 