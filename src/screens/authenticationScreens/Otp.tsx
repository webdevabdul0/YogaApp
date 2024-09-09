import React from 'react';
import {View, Text, Button} from 'react-native';
import {OtpScreenProps} from '../../navigation/StackParamList'; // Updated import

const Otp: React.FC<OtpScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Enter OTP</Text>
      <Button title="Verify OTP" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

export default Otp;
