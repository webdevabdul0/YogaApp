import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {SignupScreenProps} from '../../navigation/StackParamList';
import auth from '@react-native-firebase/auth';

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        // Generate a 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Send OTP to the user's email
        sendOtpToEmail(email, otpCode); // Function to send OTP via email (see below)

        Alert.alert('Success', 'Account created! Please verify your email.');

        // Redirect to the OTP screen, passing the OTP and user's email
        navigation.navigate('Otp', {email, otpCode}); // Pass the OTP and email to the Otp screen
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        } else {
          console.error(error);
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      });
  };

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
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="bg-gray-100 p-4 rounded-lg flex-1 ml-2"
            placeholder="Last Name"
            keyboardType="default"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-lg mb-4"
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-lg mt-4 items-center"
          onPress={handleSignUp}>
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
