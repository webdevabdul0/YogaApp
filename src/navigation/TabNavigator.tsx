import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStackNavigator from './HomeStackNavigator';
import EducationScreen from '../screens/EducationScreen';
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
            iconName = 'menu-book';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else {
            iconName = 'help-outline'; // Fallback icon
          }

          // Return the MaterialIcons component with the correct icon name
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 20,

          height: 75, // Adjust height for better spacing
        },
        tabBarLabelStyle: {
          fontSize: 12, // Optional: Adjust label font size
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
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
