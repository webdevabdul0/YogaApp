import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LanguageScreenProps} from '../../navigation/StackParamList';

const LanguageScreen: React.FC<LanguageScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language</Text>
      <Text style={styles.text}>Change the language of the application.</Text>
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

export default LanguageScreen;
