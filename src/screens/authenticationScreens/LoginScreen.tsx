import React, {useState} from 'react';
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
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/StackParamList';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const yogaBackground = require('../../assets/Onboarding.png');

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validateInput = (): boolean => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Main');
    } catch (error: any) {
      console.log('Error code:', error.code);

      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Error', 'That email address is invalid.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Error', 'No user found for that email.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Incorrect password.');
          break;
        case 'auth/invalid-credential': // This is the key error you're seeing
          Alert.alert(
            'Error',
            'Invalid credentials. Please check your email and password.',
          );
          break;
        default:
          Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <SafeAreaView className="flex-1 bg-white">
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
                className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl my-2 text-base"
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
              />

              <TextInput
                className="bg-gray-100 border border-[#c5c6cc] p-4 rounded-3xl my-2 text-base"
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text className="text-red-500 text-left mt-2 font-semibold text-sm">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 w-full py-4  rounded-3xl mt-5 flex items-center"
                onPress={handleLogin}
                disabled={loading}>
                <Text className="text-white text-sm font-bold">
                  {loading ? 'Logging in...' : 'Login'}
                </Text>
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
