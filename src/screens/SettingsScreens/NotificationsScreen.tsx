import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {NotificationsScreenProps} from '../../navigation/StackParamList';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons
const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  navigation,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-8 left-6 bg-black/30 p-3 rounded-lg">
        <Icon name="chevron-left" size={15} color="white" />
      </TouchableOpacity>
      <Text className="absolute self-center top-8 transform text-3xl font-bold text-gray-800">
        My<Text className="text-[#ED706A]">Yoga</Text>
      </Text>

      <View style={styles.item}>
        <Text style={styles.switchLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{false: '#ddd', true: '#ED706A'}}
          thumbColor={notificationsEnabled ? '#ED706A' : '#f4f3f4'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16, // Added padding from top
    paddingHorizontal: 16,
    alignItems: 'flex-start', // Align items to the left
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'left', // Align text to the left
    marginBottom: 24,
  },
  item: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Use full width for better alignment
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'black',
  },
});

export default NotificationsScreen;
