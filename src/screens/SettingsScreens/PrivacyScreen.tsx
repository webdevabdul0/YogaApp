import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PrivacyScreenProps} from '../../navigation/StackParamList';

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy & Security</Text>
      <Text style={styles.text}>
        Adjust privacy and security settings for your account.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PrivacyScreen;
