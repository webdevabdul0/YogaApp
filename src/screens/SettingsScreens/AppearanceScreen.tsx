import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppearanceScreenProps} from '../../navigation/StackParamList';

const AppearanceScreen: React.FC<AppearanceScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon!</Text>
      <Text style={styles.text}>
        This feature will be available soon. Stay tuned!
      </Text>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  goBackButton: {
    backgroundColor: '#ff6f61', // Use the same accent color for consistency
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppearanceScreen;
