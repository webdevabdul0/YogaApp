import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {ForgotPasswordScreenProps} from '../../navigation/StackParamList';

// Image for the forgot password screen
const forgotPasswordImage = require('../../assets/ForgotPassword.png');

// Function to send OTP to the email
const sendOtpToEmail = (email: string, otpCode: string) => {
  fetch(
    'https://flourishing-kelpie-672381.netlify.app/.netlify/functions/send-otp',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otpCode,
      }),
    },
  )
    .then(response => response.json())
    .then(data => {
      console.log('OTP sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending OTP:', error);
    });
};

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');

  // Function to handle the "Send OTP" button press
  const handleForgotPass = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP to the user's email
    sendOtpToEmail(email, otpCode);

    // Navigate to OTP screen with email and OTP
    navigation.navigate('Otp', {email, otpCode, purpose: 'forgotPassword'});
  };

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
          className="bg-gray-100 border border-[#c5c6cc]  p-4 rounded-3xl mb-3"
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          className="bg-red-500 w-full py-4  rounded-3xl mt-5 flex items-center"
          onPress={handleForgotPass}>
          <Text className="text-white text-sm font-bold">Send OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
