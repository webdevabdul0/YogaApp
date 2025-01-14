import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import HomeStackNavigator from './HomeStackNavigator';
import EducationalStackNavigator from './EducationalStacknavigator';
import SettingsStackNavigator from './SettingsStackNavigator';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          // Set icons based on the route name
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Education') {
            iconName = 'layers'; // Stack-like icon
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else {
            iconName = 'help-circle'; // Fallback icon
          }

          // Return the Feather component with the correct icon name
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 25,
          paddingTop: 10,
          height: 90, // Adjust height for better spacing
        },
        tabBarLabelStyle: {
          fontSize: 12, // Optional: Adjust label font size
          fontWeight: '600',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Education"
        component={EducationalStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
