import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { ETextType } from '@/types/TextType';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight } from '@/constants/Colors';

export default function ChatScreen() {
  const { id, image, name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: image as string }} 
          style={styles.avatar}
        />
        <Text variant={ETextType.H3}>{name}</Text>
      </View>
      <View style={styles.chatContainer}>
        <Text>Chat with {name} coming soon!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: w(20),
    gap: w(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  avatar: {
    width: w(40),
    height: w(40),
    borderRadius: w(20),
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 