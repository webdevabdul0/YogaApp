import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {SignupScreenProps} from '../../navigation/StackParamList';

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center bg-white">
      <View className="items-center mb-8">
        <Text className="text-4xl font-black">
          <Text className="text-black">My</Text>
          <Text className="text-red-500">Yoga</Text>
        </Text>
      </View>

      <View className="p-5">
        <Text className="text-2xl font-bold mb-5 text-black">
          Create a New Account
        </Text>

        <View className="flex-row mb-4">
          <TextInput
            className="bg-gray-100 p-4 rounded-lg flex-1 mr-2"
            placeholder="First Name"
            keyboardType="default"
          />
          <TextInput
            className="bg-gray-100 p-4 rounded-lg flex-1 ml-2"
            placeholder="Last Name"
            keyboardType="default"
          />
        </View>

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Username"
          keyboardType="default"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Email Address"
          keyboardType="email-address"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Confirm Password"
          secureTextEntry={true}
        />

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-lg mt-4 items-center"
          onPress={() => navigation.navigate('Otp')}>
          <Text className="text-white text-lg font-bold">Get started</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-red-500 font-bold"> Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
