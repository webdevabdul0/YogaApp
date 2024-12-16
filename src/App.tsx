import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignupScreen from './screens/authenticationScreens/SignupScreen';
import Otp from './screens/authenticationScreens/Otp';
import Onboarding from './screens/authenticationScreens/Onboarding';
import ForgotPassword from './screens/authenticationScreens/ForgotPassword';
import Profile from './screens/authenticationScreens/ProfileInfo';
import TabNavigator from './navigation/TabNavigator';
import type {AppSettings} from './app-settings';
import {SettingsContext} from './app-settings';
import {Delegate} from 'react-native-mediapipe';
import {CameraStream} from './screens/CameraStream';
const Stack = createNativeStackNavigator();
import PushNotification from 'react-native-push-notification';

function App(): React.JSX.Element {
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
      },
      created => console.log(`CreateChannel returned '${created}'`),
    );
  };

  React.useEffect(() => {
    createChannels();
  }, []);

  const [settings, setSettings] = React.useState<AppSettings>({
    maxResults: 1,
    threshold: 90,
    processor: Delegate.GPU,
    model: 'pose_landmarker_heavy',
  });

  return (
    <NavigationContainer>
      <SettingsContext.Provider value={{settings, setSettings}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SettingsContext.Provider>
    </NavigationContainer>
  );
}

export default App;
