import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/StackParamList'; // Define your StackParamList

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

// Define the props type for navigation
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};
const yogaBackground = require('../assets/Onboarding.png');
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ImageBackground source={yogaBackground} style={styles.image}>
        <Text style={styles.logoText}>
          <Text style={styles.logoBold}>My</Text>
          <Text style={styles.logoColored}>Yoga</Text>
        </Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          {/* Add icon for eye */}
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.replace('Main')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>New user?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.createAccountText}> Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 380,
    justifyContent: 'flex-start', // Aligns content to the top vertically
    alignItems: 'center', // Centers content horizontally
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    paddingTop: 20, // Adds padding from the top
  },

  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoBold: {
    color: '#000',
  },
  logoColored: {
    color: '#ff5e57',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPassword: {
    color: '#ff5e57',
    textAlign: 'right',
    marginTop: 10,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#ff5e57',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  createAccountText: {
    color: '#ff5e57',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
