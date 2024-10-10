import React, {useState, useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For cross and check icons

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(''); // To store error message
  const [isUsernameValid, setIsUsernameValid] = useState(false); // To track if username is valid
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to check if the username is already taken
  const checkUsername = async (enteredUsername: string) => {
    if (enteredUsername.length < 3) {
      setUsernameError('Username must be at least 3 characters.');
      setIsUsernameValid(false);
      return;
    }

    const usernameSnapshot = await firestore()
      .collection('users')
      .where('username', '==', enteredUsername)
      .get();

    if (!usernameSnapshot.empty) {
      setUsernameError('Username is already taken.');
      setIsUsernameValid(false);
    } else {
      setUsernameError('');
      setIsUsernameValid(true);
    }
  };

  useEffect(() => {
    if (username !== '') {
      // Call the function to check the username whenever it changes
      checkUsername(username);
    }
  }, [username]);

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

    if (!isUsernameValid) {
      Alert.alert('Error', 'Please choose a valid username.');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const user = userCredential.user;

        try {
          // Store user profile information in Firestore
          await firestore().collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            username: username, // Save username in Firestore
            email: email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

          // If Firestore write is successful, generate and send the OTP
          const otpCode = Math.floor(
            100000 + Math.random() * 900000,
          ).toString();
          sendOtpToEmail(email, otpCode);

          Alert.alert('Success', 'Account created! Please verify your email.');

          // Redirect to the OTP screen, passing the OTP and user's email

          navigation.navigate('Otp', {email, otpCode, purpose: 'signup'});
        } catch (error) {
          console.error('Error saving to Firestore:', error);
          Alert.alert('Error', 'Failed to save user data. Please try again.');
        }
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
            className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl flex-1 mr-2"
            placeholder="First Name"
            keyboardType="default"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl flex-1 ml-2"
            placeholder="Last Name"
            keyboardType="default"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Username input with validation */}
        <View className="relative mb-4">
          <TextInput
            className={`bg-gray-100 border p-4 rounded-3xl ${
              usernameError ? 'border-red-500' : 'border-[#c5c6cc]'
            }`}
            placeholder="Username"
            keyboardType="default"
            value={username}
            onChangeText={setUsername}
          />
          {usernameError ? (
            <Icon
              name="cancel"
              size={24}
              color="red"
              style={{position: 'absolute', right: 10, top: 15}}
            />
          ) : isUsernameValid ? (
            <Icon
              name="check-circle"
              size={24}
              color="green"
              style={{position: 'absolute', right: 10, top: 15}}
            />
          ) : null}
          {usernameError ? (
            <Text className="text-red-500 text-xs mt-1">{usernameError}</Text>
          ) : null}
        </View>

        <TextInput
          className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl mb-4"
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl mb-4"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl mb-4"
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="bg-red-500 w-full py-4  rounded-3xl mt-5 flex items-center"
          onPress={handleSignUp}>
          <Text className="text-white text-sm font-bold">Get started</Text>
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
