import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/StackParamList'; // Define your StackParamList

// Define the props type for navigation
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.replace('Main')} />
    </View>
  );
};

export default LoginScreen;
