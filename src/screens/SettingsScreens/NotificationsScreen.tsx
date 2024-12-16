import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NotificationsScreenProps} from '../../navigation/StackParamList';

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.text}>
        Manage your notification preferences here.
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

export default NotificationsScreen;
