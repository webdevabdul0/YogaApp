import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PoseDetailScreen from '../screens/PoseDetailScreen';
import {StackParamList} from '../navigation/StackParamList'; // Ensure correct path here
import {CameraStream} from '../screens/CameraStream';

// Define the stack with StackParamList
const Stack = createNativeStackNavigator<StackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PoseDetail" component={PoseDetailScreen} />
      <Stack.Screen name="CameraStream" component={CameraStream} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
