import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EducationScreen from '../screens/EducationScreen';
import {StackParamList} from '../navigation/StackParamList'; // Ensure correct path here
import ContentScreen from '../screens/ContentScreen';
import FeaturedContentScreen from '../screens/FeaturedContent';

// Define the stack with StackParamList
const Stack = createNativeStackNavigator<StackParamList>();

const EducationalStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EducationScreen" component={EducationScreen} />
      <Stack.Screen name="ContentScreen" component={ContentScreen} />
      <Stack.Screen
        name="FeaturedContentScreen"
        component={FeaturedContentScreen}
      />
    </Stack.Navigator>
  );
};

export default EducationalStackNavigator;
