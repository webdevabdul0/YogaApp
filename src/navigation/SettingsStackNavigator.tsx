import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/StackParamList'; // Ensure the path is correct
import SettingsScreen from '../screens/SettingsScreens/Settings';
import NotificationsScreen from '../screens/SettingsScreens/NotificationsScreen';
import AppearanceScreen from '../screens/SettingsScreens/AppearanceScreen';
import LanguageScreen from '../screens/SettingsScreens/LanguageScreen';
import PrivacyScreen from '../screens/SettingsScreens/PrivacyScreen';
import EditProfile from '../screens/SettingsScreens/EditProfile';

// Define the stack with StackParamList
const Stack = createNativeStackNavigator<StackParamList>();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Appearance" component={AppearanceScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
