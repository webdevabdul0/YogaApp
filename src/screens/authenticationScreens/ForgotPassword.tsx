import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {ForgotPasswordScreenProps} from '../../navigation/StackParamList';

const forgotPasswordImage = require('../../assets/ForgotPassword.png');

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center bg-white">
      <View className="items-center mt-5">
        <Text className="text-4xl font-extrabold">
          <Text className="text-black">My</Text>
          <Text className="text-red-600">Yoga</Text>
        </Text>
        <Image
          source={forgotPasswordImage}
          className="w-full  my-10"
          resizeMode="contain"
        />
      </View>

      <View className="px-5">
        <Text className="text-2xl font-bold text-black mb-2">
          Forgot Password
        </Text>
        <Text className="text-lg text-gray-500 mb-5">
          Enter an email to send an OTP
        </Text>

        <TextInput
          className="bg-gray-200 p-4 rounded-xl mb-3"
          placeholder="Email Address"
          keyboardType="email-address"
        />
        {/*
        <TouchableOpacity
          className="bg-red-600 p-4 rounded-xl items-center mt-5"
          onPress={() => navigation.navigate('Otp')}>
          <Text className="text-white text-lg font-bold">Send OTP</Text>
        </TouchableOpacity>*/}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
