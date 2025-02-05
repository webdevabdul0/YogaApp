import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {OnboardingScreenProps} from '../../navigation/StackParamList';

const yogaBackground = require('../../assets/OnboardingScreenBg.png');

const Onboarding: React.FC<OnboardingScreenProps> = ({navigation}) => {
  return (
    <View className="flex-1">
      <ImageBackground source={yogaBackground} className="flex-1 ">
        {/* Container for MyYoga text at the top */}
        <View className="flex flex-1 justify-start items-center mt-12">
          <Text className="text-3xl font-black ">
            <Text className="text-[#DBD6D6]">My</Text>
            <Text className="text-red-500">Yoga</Text>
          </Text>
        </View>

        {/* Container for the bottom content */}
        <View className="flex justify-end items-center mb-8 px-4">
          <Text
            className="text-2xl font-black text-white text
          text-center mb-2">
            Welcome to MyYoga
          </Text>

          <Text className="text-sm text-white text-center mb-7">
            Focus on your flow and movement—let AI guide you through every pose
            with precision and ease.
          </Text>

          <TouchableOpacity
            className="bg-red-500 w-full py-4 mx-6 rounded-3xl mb-5 flex items-center"
            onPress={() => navigation.navigate('Signup')}>
            <Text className="text-white text-sm font-bold">Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-white text-sm">
              Already have an account?{' '}
              <Text className="text-red-500 font-bold">Log In</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('Main')}>
            <Text className="text-white text-sm">
              Skip to <Text className="text-red-500 font-bold">Home</Text>
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-500 text-sm font-bold">VER 1.0.0</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Onboarding;
