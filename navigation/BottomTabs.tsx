import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Platform, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { w, h } from '@/utils/Dimensions';
import { backgroundLight, primary, textSecondary } from '@/constants/Colors';

// Screens
import { SCREENS } from '@/constants/Screens';
import Home from '@/app/home/Home';
import Matches from '@/app/matches/Matches';
import Profile from '@/app/profile/Profile';
import Settings from '@/app/settings/Settings';
import { CustomTabBar } from './CustomTabBar';
import { TabBarIcon } from './TabbarIcon';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;


export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} tabWidth={TAB_WIDTH} styles={styles} />}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="flame-outline" color={color} focused={focused} styles={styles} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.MATCHES}
        component={Matches}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="heart-outline" color={color} focused={focused} styles={styles} />
          ),
          tabBarLabel: 'Likes',
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person-outline" color={color} focused={focused} styles={styles} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.SETTINGS}
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="settings-outline" color={color} focused={focused} styles={styles} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: backgroundLight,
    height: h(85),
    paddingBottom: Platform.OS === 'ios' ? h(24) : h(12),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  indicator: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: 3,
    backgroundColor: primary,
    top: 0,
    borderRadius: 3,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: w(12),
    fontWeight: '600',
    marginTop: h(4),
  },
  iconContainer: {
    width: w(44),
    height: w(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: w(22),
  },
  activeIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}); 