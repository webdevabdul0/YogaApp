import React from 'react';
import {View, Text, Button} from 'react-native';
import {WelcomeScreenProps} from '../../navigation/StackParamList'; // Updated import

const Welcome: React.FC<WelcomeScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to Our App!</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Onboarding')}
      />
    </View>
  );
};

export default Welcome;
