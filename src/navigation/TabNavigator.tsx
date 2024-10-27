import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from './HomeStackNavigator';
import EducationScreen from '../screens/EducationScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          // Set default icons based on the route name
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Education') {
            iconName = focused ? 'book-sharp' : 'book-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            // Fallback icon if none of the conditions are met
            iconName = 'help-circle-outline'; // Use a default or fallback icon
          }

          // Return the Ionicons component with the valid icon name
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}} // Hides the header for the Home screen
      />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{headerShown: false}} // Hides the header for the Education screen
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}} // Hides the header for the Settings screen
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
