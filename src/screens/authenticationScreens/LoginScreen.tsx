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
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};

const yogaBackground = require('../../assets/Onboarding.png');

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Dismiss keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
              source={yogaBackground}
              className="w-full h-96 justify-start items-center rounded-b-3xl overflow-hidden"
              resizeMode="cover">
              <View className="flex items-center mt-12">
                <Text className="text-3xl font-black">
                  <Text className="text-black">My</Text>
                  <Text className="text-red-500">Yoga</Text>
                </Text>
              </View>
            </ImageBackground>

            <View className="px-5 py-7">
              <Text className="text-2xl font-extrabold mb-5 text-black">
                Log In
              </Text>

              <TextInput
                className="bg-gray-100 p-4 rounded-3xl my-2 text-base"
                placeholder="Email Address"
                keyboardType="email-address"
              />

              <View className="justify-between">
                <TextInput
                  className="bg-gray-100 p-4 rounded-3xl my-2 text-base"
                  placeholder="Password"
                  secureTextEntry={true}
                />
                {/* Add icon for eye */}
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text className="text-red-500 text-left mt-2 font-semibold text-sm">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 py-4 w-full rounded-3xl mt-5 items-center"
                onPress={() => navigation.replace('Main')}>
                <Text className="text-white text-sm font-bold">Login</Text>
              </TouchableOpacity>

              <View className="flex-row justify-center mt-5">
                <Text>New user?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text className="text-red-500 font-bold">
                    {' '}
                    Create an account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
