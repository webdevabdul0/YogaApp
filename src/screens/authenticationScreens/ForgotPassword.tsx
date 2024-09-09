import React from 'react';
import {View, Text, Button} from 'react-native';
import {ForgotPasswordScreenProps} from '../../navigation/StackParamList'; // Updated import

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Forgot Password</Text>
      <Button title="Send OTP" onPress={() => navigation.navigate('Otp')} />
    </View>
  );
};

export default ForgotPassword;
