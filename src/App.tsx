import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import Welcome from './screens/authenticationScreens/Welcome';
import SignupScreen from './screens/authenticationScreens/SignupScreen';
import Otp from './screens/authenticationScreens/Otp';
import Onboarding from './screens/authenticationScreens/Onboarding';
import ForgotPassword from './screens/authenticationScreens/ForgotPassword';
import TabNavigator from './navigation/TabNavigator';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
