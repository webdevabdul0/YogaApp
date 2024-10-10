import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {ProfileScreenProps} from '../../navigation/StackParamList';
import RNPickerSelect from 'react-native-picker-select';

const ProfileInformationScreen: React.FC<ProfileScreenProps> = ({
  navigation,
}) => {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('24');

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
      <TouchableOpacity className="relative self-center">
        <Image
          source={require('../../assets/profile-placeholder.png')} // Placeholder for profile picture
          className="w-24 h-24 rounded-full bg-gray-200"
        />
        <TouchableOpacity className="absolute bottom-0 right-0 bg-red-500 rounded-full w-7 h-7 justify-center items-center">
          <Text className="text-white text-lg">+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity className="self-center mt-2 mb-5">
        <Text className="text-red-500 text-sm">Upload Picture</Text>
      </TouchableOpacity>

      {/* Gender Selection */}
      <View>
        {/* Gender Selection */}
        <Text className="text-lg mb-2">Select your gender</Text>
        <View className="bg-gray-200 p-4 rounded-lg mb-5">
          <RNPickerSelect
            onValueChange={value => setGender(value)} // Update gender state
            items={[
              {label: 'Male', value: 'Male'},
              {label: 'Female', value: 'Female'},
            ]}
            placeholder={{label: 'Select Gender', value: null}}
            value={gender} // Bind the current selected value
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30,
                backgroundColor: '#E5E7EB', // Equivalent to bg-gray-200
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30,
                backgroundColor: '#E5E7EB', // Equivalent to bg-gray-200
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

      {/* Next Button */}
      <TouchableOpacity
        className="bg-red-500 p-4 rounded-lg items-center"
        onPress={() => navigation.navigate('Main')}>
        <Text className="text-white text-lg font-bold">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInformationScreen;
