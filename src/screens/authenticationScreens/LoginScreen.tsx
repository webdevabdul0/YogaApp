import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/StackParamList'; // Define your StackParamList

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

// Define the props type for navigation
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};
const yogaBackground = require('../../assets/Onboarding.png');

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center bg-white">
      <ImageBackground
        source={yogaBackground}
        className="w-full h-96 justify-start items-center rounded-b-3xl overflow-hidden pt-5">
        <Text className="text-3xl font-black text-white ">
          <Text className="text-black">My</Text>
          <Text className="text-red-500">YOGA</Text>
        </Text>
      </ImageBackground>

      <View className="px-5 py-7">
        <Text className="text-2xl font-extrabold mb-5 text-black">Log In</Text>

        <TextInput
          className="bg-gray-100 p-4 rounded-lg my-2 text-lg"
          placeholder="Email Address"
          keyboardType="email-address"
        />

        <View className="justify-between">
          <TextInput
            className="bg-gray-100 p-4 rounded-lg my-2 text-lg"
            placeholder="Password"
            secureTextEntry={true}
          />
          {/* Add icon for eye */}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text className="text-red-500 text-right mt-2 text-sm">
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-lg mt-5 items-center"
          onPress={() => navigation.replace('Main')}>
          <Text className="text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text>New user?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-red-500 font-bold"> Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
