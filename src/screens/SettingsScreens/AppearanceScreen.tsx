import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppearanceScreenProps} from '../../navigation/StackParamList';

const AppearanceScreen: React.FC<AppearanceScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appearance</Text>
      <Text style={styles.text}>Customize the app's theme and appearance.</Text>
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

export default AppearanceScreen;
