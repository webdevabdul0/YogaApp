import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PoseDetailScreen from '../screens/PoseDetailScreen'; // This will show pose details

// Define the stack
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PoseDetail" component={PoseDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
