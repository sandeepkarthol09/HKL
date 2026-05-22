import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { wp } from '../core/value/Constants';

export type BottomTabParamList = {
  Home: undefined;
  Notifications: undefined;
  Messages: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabButton = ({ label, focused, badgeCount, onPress }: any) => {
  const icons: Record<string, string> = {
    Home: '🏠',
    Notifications: '🔔',
    Messages: '💬',
    Search: '🔍',
  };

  return (
    <TouchableOpacity 
      style={styles.tabButtonContainer} 
      activeOpacity={1} // Animation jumps ko rokne ke liye
      onPress={onPress}
    >
      {/* Focused State Capsule Wrapper - Ab conditional styling direct pass ho rhi hai 
        taaki background color render hone me koi glitch na aaye.
      */}
      <View style={[styles.pillWrapper, focused ? styles.pillWrapperFocused : null]}>
        <View style={styles.iconContainer}>
          <Text style={[styles.iconEmoji, focused ? styles.iconEmojiFocused : null]}>
            {icons[label] || '📌'}
          </Text>
          
          {badgeCount && badgeCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton 
              label="Home" 
              focused={props.accessibilityState?.selected} 
              onPress={props.onPress} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton 
              label="Notifications" 
              focused={props.accessibilityState?.selected} 
              badgeCount={4} 
              onPress={props.onPress} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={SettingsScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton 
              label="Messages" 
              focused={props.accessibilityState?.selected} 
              onPress={props.onPress} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SettingsScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton 
              label="Search" 
              focused={props.accessibilityState?.selected} 
              onPress={props.onPress} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: wp(5),
    left: wp(4),
    right: wp(4),
    borderTopWidth: 0,
    height: wp(17), 
    borderRadius: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp(2),
      marginHorizontal:wp(2),
  },
  tabButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillWrapper: {
    width: wp(10),          // Optimal width to encapsulate your emoji icons properly
    height: wp(8),          
    borderRadius: wp(4),    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: wp(1),    
  },
  pillWrapperFocused: {
    backgroundColor: 'red', // Isko thoda aur solid dark kiya hai taaki selection saaf dikhe!
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: wp(5.5),
    // opacity: 0.4, // Unfocused tabs are cleanly dimmed
  },
  iconEmojiFocused: {
    opacity: 0, // Focused active indicator element becomes crystal clear
  },
  tabLabel: {
    fontSize: wp(2.8),
    fontWeight: '500',
    color: '#223b80ff',
  },
  tabLabelFocused: {
    color: '#0052CC', // Bold blue text for active tabs
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: wp(-2.5),
    right: wp(-2.5),
    backgroundColor: '#E04F4F',
    minWidth: wp(4.2),
    height: wp(4.2),
    borderRadius: wp(2.1),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: wp(2.2),
    fontWeight: '700',
    lineHeight: wp(3),
  },
});