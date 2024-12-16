import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {ProfileScreenProps} from '../../navigation/StackParamList';
import RNPickerSelect from 'react-native-picker-select';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'; // Firestore import
import storage from '@react-native-firebase/storage'; // Firebase Storage import
import auth from '@react-native-firebase/auth'; // Firebase Authentication

const ProfileInformationScreen: React.FC<ProfileScreenProps> = ({
  navigation,
}) => {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('24');
  const [profilePic, setProfilePic] = useState<string | null>(null); // Profile picture URI
  const [isUploading, setIsUploading] = useState(false); // Uploading state

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
        let profilePicUrl = '';

        if (profilePic) {
          // Upload the image and get the download URL
          profilePicUrl = await uploadImage(profilePic, user.uid);
        }

        // Update Firestore with the profile data
        await firestore().collection('users').doc(user.uid).update({
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
    <View className="flex-1 px-5 py-10 bg-white">
      {/* Logo */}
      <Text className="text-4xl font-extrabold text-center mb-5">
        <Text className="text-black">My</Text>
        <Text className="text-red-600">Yoga</Text>
      </Text>

      <Text className="text-2xl font-bold text-center mb-8">
        Profile Information
      </Text>

      {/* Profile Picture Upload */}
      <TouchableOpacity
        className="relative self-center"
        onPress={handleImagePicker}>
        <Image
          source={
            profilePic
              ? {uri: profilePic} // Display selected image if available
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

      {/* Gender Selection */}
      <View>
        <Text className="text-lg mb-2">Select your gender</Text>
        <View className=" mb-5">
          <RNPickerSelect
            onValueChange={value => setGender(value)}
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
      </View>

      {/* Age Selection */}
      <Text className="text-lg mb-2">Select your age</Text>
      <TextInput
        className="bg-gray-200 p-4 rounded-lg mb-5"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      {/* Save Button */}
      <TouchableOpacity
        className="bg-red-500 w-full py-4 rounded-3xl mb-5 flex items-center"
        onPress={saveProfileData}
        disabled={isUploading} // Disable button while uploading
      >
        <Text className="text-white text-sm font-bold">
          {isUploading ? 'Saving...' : 'Save Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInformationScreen;
