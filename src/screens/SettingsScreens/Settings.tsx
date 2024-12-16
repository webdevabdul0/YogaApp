import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Modal,
} from 'react-native';

import {SettingsScreenProps} from '../../navigation/StackParamList';
import Icon from 'react-native-vector-icons/Feather'; // Import Feather icons
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const theme = {
  primary: '#eb544d',
  black: '#000000',
  secondary: '#71727a',
  background: '#ffffff',
  avatarBackground: '#fde8e8',
  borderColor: '#e3e4e7',
};
const SettingsScreen: React.FC<SettingsScreenProps> = ({route, navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-render

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.refresh) {
        // Trigger the refresh logic
        setRefreshKey(prevKey => prevKey + 1);

        // Clear the refresh flag
        navigation.setParams({refresh: false});
      }
    }, [route.params, navigation]), // Ensure route.params is a dependency
  );

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  // State for user data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    profilePic: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;

      if (user) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();

          if (userDoc.exists) {
            const data = userDoc.data();
            setUserData({
              firstName: data?.firstName || '',
              lastName: data?.lastName || '',
              username: data?.username || '',
              profilePic: data?.profilePic || '',
            });
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user is logged in.');
      }
    };

    fetchUserData();
  }, [refreshKey]); // Run the effect when refreshKey changes

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;

      if (user) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();

          if (userDoc.exists) {
            const data = userDoc.data();
            setUserData({
              firstName: data?.firstName || '',
              lastName: data?.lastName || '',
              username: data?.username || '',
              profilePic: data?.profilePic || '',
            });
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user is logged in.');
      }
    };

    fetchUserData();
  }, []);

  // Handle edit profile action
  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Replace with your actual Edit Profile screen name
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    try {
      await auth().signOut();
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Unable to logout. Please try again.');
    }
  };

  const confirmDeleteAccount = async () => {
    setDeleteModalVisible(false);
    try {
      const user = auth().currentUser;

      if (user) {
        await firestore().collection('users').doc(user.uid).delete();
        await user.delete();
        Alert.alert('Account Deleted', 'Your account has been deleted.');
        navigation.navigate('Signup');
      } else {
        Alert.alert('Error', 'No user is currently logged in.');
      }
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Reauthentication Required',
          'Please log in again to confirm account deletion.',
        );
      } else {
        Alert.alert('Error', 'Unable to delete account. Please try again.');
      }
    }
  };

  const menuItems = [
    {label: 'Notifications', screen: 'Notifications'},
    {label: 'Appearance', screen: 'Appearance'},
    {label: 'Language', screen: 'Language'},
    {label: 'Privacy & Security', screen: 'Privacy'},
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container} key={refreshKey}>
        {/* Logout Modal */}
        <Modal
          transparent={true}
          visible={isLogoutModalVisible}
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Log out</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to log out? You'll need to log in again to
                use the app.
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setLogoutModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmLogout}>
                  <Text style={styles.confirmButtonText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          transparent={true}
          visible={isDeleteModalVisible}
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setDeleteModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmDeleteAccount}>
                  <Text style={styles.confirmButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Header */}
        <Text style={styles.headerText}>Settings</Text>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            {userData.profilePic ? (
              <Image
                source={{uri: userData.profilePic}}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarPlaceholder}></View>
            )}
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditProfile}
              accessibilityLabel="Edit Profile Picture">
              <Icon name="edit-2" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={styles.profileUsername}>@{userData.username}</Text>
        </View>

        {/* Menu Options */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
              accessibilityLabel={`Go to ${item.label}`}>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteModalVisible(true)}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: theme.black,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.avatarBackground,
    borderRadius: 40,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  profileUsername: {
    fontSize: 14,
    color: theme.secondary,
  },
  menu: {
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
  },
  menuItemArrow: {
    fontSize: 16,
    color: theme.secondary,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalMessage: {
    fontSize: 14,
    color: '#71727a',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#e3e4e7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 14,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#eb544d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: theme.primary,
    padding: 15,
    marginRight: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    borderColor: theme.primary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
