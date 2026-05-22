import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

const icons: Record<string, string> = {
  Home: '🏠',
  Notifications: '🔔',
  Messages: '💬',
  Search: '🔍',
};

const TabIcon = ({
  label,
  focused,
  badgeCount,
}: {
  label: string;
  focused: boolean;
  badgeCount?: number;
}) => {
  console.log('FOCUSED =>', label, focused);

  return (
    <View
      style={[
        styles.pillWrapper,
        focused && styles.pillWrapperFocused,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text
          style={[
            styles.iconEmoji,
            focused && styles.iconEmojiFocused,
          ]}
        >
          {icons[label]}
        </Text>

        {badgeCount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badgeCount}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => (
          <TabIcon
            label={route.name}
            focused={focused}
            badgeCount={
              route.name === 'Notifications'
                ? 4
                : undefined
            }
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Notifications"
        component={DetailsScreen}
      />

      <Tab.Screen
        name="Messages"
        component={SettingsScreen}
      />

      <Tab.Screen
        name="Search"
        component={SettingsScreen}
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

    height: wp(17),

    borderRadius: wp(10),

    borderTopWidth: 0,

    backgroundColor: '#FFFFFF',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,  paddingHorizontal: wp(2),
      marginHorizontal:wp(2),
      justifyContent:"center",
      alignItems:'center',
      flex:1,
      
      
  },

  pillWrapper: {
    width: wp(14),
    height: wp(13),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    top:wp(4),
  },

  pillWrapperFocused: {
    backgroundColor: '#EDF2F7',
    borderWidth: 0.1,
    borderColor: '#757780ff',

  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconEmoji: {
    fontSize: wp(5.5),
  },

  iconEmojiFocused: {
    opacity: 1,
    color: '#4C6FFF',
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
  },
});