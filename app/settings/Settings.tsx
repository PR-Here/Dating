import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { ETextType, ETextWeight } from '@/types/TextType';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight } from '@/constants/Colors';

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant={ETextType.H2} weight={ETextWeight.Bold}>
          Settings
        </Text>
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
    paddingTop: h(60),
    paddingHorizontal: w(24),
  },
}); 