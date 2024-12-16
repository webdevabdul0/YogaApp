import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView, // Import ScrollView
} from 'react-native';
import {ProfileScreenProps} from '../../navigation/StackParamList';
import RNPickerSelect from 'react-native-picker-select';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'; // Firestore import
import storage from '@react-native-firebase/storage'; // Firebase Storage import
import auth from '@react-native-firebase/auth'; // Firebase Authentication

const EditProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('24');
  const [profilePic, setProfilePic] = useState<string | null>(null); // Profile picture URI
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [currentProfilePic, setCurrentProfilePic] = useState<string | null>(
    null,
  ); // To store current profile pic URL

  useEffect(() => {
    // Fetch current user profile data when the component loads
    const fetchUserProfile = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setFirstName(userData?.firstName || ''); // Set default first name
            setLastName(userData?.lastName || ''); // Set default last name
            setGender(userData?.gender || 'Male');
            setAge(userData?.age || '24');
            setCurrentProfilePic(userData?.profilePic || null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Function to handle image selection
  const handleImagePicker = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 300, maxHeight: 300, quality: 1},
      response => {
        if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          setProfilePic(response.assets[0].uri); // Set the image URI
        }
      },
    );
  };

  // Function to upload the image to Firebase Storage and return the download URL
  const uploadImage = async (uri: string, userId: string) => {
    try {
      const filename = `profile_pictures/${userId}.jpg`; // Define a unique path
      const reference = storage().ref(filename);

      // Upload the file to Firebase Storage
      const task = reference.putFile(uri);

      setIsUploading(true);
      await task;

      // Get the image download URL after the upload
      const downloadURL = await reference.getDownloadURL();
      setIsUploading(false);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      throw error;
    }
  };

  // Function to save the profile data to Firestore
  const saveProfileData = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        let profilePicUrl = currentProfilePic; // Default to current profile picture

        if (profilePic) {
          // If a new image is selected, upload and get the download URL
          profilePicUrl = await uploadImage(profilePic, user.uid);
        }

        // Update Firestore with the profile data
        await firestore().collection('users').doc(user.uid).update({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          age: age,
          profilePic: profilePicUrl, // Save the image download URL
        });

        Alert.alert('Success', 'Profile updated successfully!');
        navigation.navigate('Main');
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } else {
      Alert.alert('Error', 'User not logged in.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View className="flex-1 px-5 py-10 bg-white">
        {/* Logo */}
        <Text className="text-4xl font-extrabold text-center mb-5">
          <Text className="text-black">My</Text>
          <Text className="text-red-600">Yoga</Text>
        </Text>

        <Text className="text-2xl font-bold text-center mb-8">
          Edit Profile
        </Text>

        {/* Profile Picture Upload */}
        <TouchableOpacity
          className="relative self-center"
          onPress={handleImagePicker}>
          <Image
            source={
              profilePic
                ? {uri: profilePic} // Display selected image if available
                : currentProfilePic
                ? {uri: currentProfilePic} // Display existing image if not selected
                : require('../../assets/profile-placeholder.png')
            }
            className={`w-24 h-24 rounded-full ${
              profilePic ? 'border-4 border-red-500' : 'bg-gray-200'
            }`} // Apply red border when image is selected
          />
          <View className="absolute bottom-0 right-0 bg-red-500 rounded-full w-7 h-7 justify-center items-center">
            <Text className="text-white text-lg">+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="self-center mt-2 mb-5"
          onPress={handleImagePicker}>
          <Text className="text-red-500 text-sm">Upload Picture</Text>
        </TouchableOpacity>

        {/* First Name Input */}
        <Text className="text-lg mb-2">Enter your first name</Text>
        <TextInput
          className="bg-gray-200 p-4 rounded-lg mb-5"
          placeholder="Your first name"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name Input */}
        <Text className="text-lg mb-2">Enter your last name</Text>
        <TextInput
          className="bg-gray-200 p-4 rounded-lg mb-5"
          placeholder="Your last name"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Gender Selection */}
        <Text className="text-lg mb-2">Select your gender</Text>
        <View className="mb-5">
          <RNPickerSelect
            onValueChange={setGender}
            items={[
              {label: 'Male', value: 'Male'},
              {label: 'Female', value: 'Female'},
            ]}
            placeholder={{label: 'Select Gender', value: null}}
            value={gender}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 50,
                color: 'black',
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: '#E5E7EB',
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 50,
                color: 'black',
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: '#E5E7EB',
              },
            }}
          />
        </View>

        {/* Age Input */}
        <Text className="text-lg mb-2">Enter your age</Text>
        <TextInput
          className="bg-gray-200 p-4 rounded-lg mb-5"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        {/* Save Button */}
        <TouchableOpacity
          className="bg-red-500 w-full py-4 rounded-3xl mb-5 flex items-center"
          onPress={async () => {
            try {
              setIsUploading(true);
              await saveProfileData(); // Replace with your save function
              setIsUploading(false);

              // Navigate to SettingsScreen and indicate a refresh is needed
              navigation.navigate('SettingsScreen', {refresh: true});
            } catch (error) {
              setIsUploading(false);
              console.error('Error saving profile data:', error);
            }
          }}
          disabled={isUploading}>
          <Text className="text-white text-sm font-bold">
            {isUploading ? 'Saving...' : 'Save Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
