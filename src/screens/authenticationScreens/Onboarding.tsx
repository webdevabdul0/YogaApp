import React from 'react';
import {View, Text, Button} from 'react-native';
import {OnboardingScreenProps} from '../../navigation/StackParamList'; // Updated import

const Onboarding: React.FC<OnboardingScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to the Onboarding Screen!</Text>
      <Button
        title="Continue to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Onboarding;
