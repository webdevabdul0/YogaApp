import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

const ProfileScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF6A88" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center">
      {/* Header with Background Color */}
      <View className="w-11/12 h-32 bg-[#F8CAC1] rounded-2xl relative mt-5 mb-10">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-3 left-3 bg-black/10 p-3 rounded-lg">
          <Icon name="chevron-left" size={15} color="white" />
        </TouchableOpacity>

        <Image
          source={{
            uri: userData?.profilePic || 'https://via.placeholder.com/100',
          }}
          className="w-24 h-24 rounded-full absolute -bottom-10 self-center"
        />
      </View>

      {/* Profile Info */}
      <Text className="text-2xl font-bold mt-2 text-slate-900">
        {userData?.firstName + ' ' + userData?.lastName || 'Yoga User'}
      </Text>

      <View className="flex-row items-center mt-1">
        <Icon
          name={userData?.gender === 'Male' ? 'user' : 'female'}
          size={16}
          color="#71727A"
        />
        <Text className="text-gray-600 ml-2 text-base">
          {userData?.gender} • {userData?.age}
        </Text>
      </View>
      <Text className="text-gray-800 text-center mt-2 px-10 text-sm">
        {userData?.bio ||
          'Yoga is the journey of the self, through the self, to the self'}
      </Text>
      {/* Stats Section */}
      <View className="flex-row w-full mt-5 px-4">
        <View className="bg-[#E4E4E7] rounded-2xl px-4  items-center flex-row flex-1 mr-2">
          <Icon name="fire" size={28} color="#FF6723" />
          <View className="ml-3">
            <Text className="text-gray-600">Current Streak</Text>
            <Text className="text-orange-600 font-bold">2 Days</Text>
          </View>
        </View>

        <View className="bg-[#E4E4E7] rounded-2xl p-4 items-center flex-row flex-1 ml-2">
          <Icon name="user-clock" size={24} color="#EB544D" />
          <View className="ml-3">
            <Text className="text-gray-600">Total Sessions</Text>
            <Text className="text-red-600 font-bold">10</Text>
          </View>
        </View>
      </View>

      {/* Share Progress Card */}
      <View className="bg-indigo-900 rounded-2xl w-11/12 mt-5 p-5 items-center">
        <Icon name="fire" size={40} color="#FF6A88" />
        <Text className="text-[#EB544D] font-bold mt-2 text-lg">MyYoga</Text>
        <Text className="text-white mt-1">2 DAYS of constant Yoga</Text>
        <TouchableOpacity className="bg-[#EB544D] rounded-full px-4 py-2 mt-3">
          <Text className="text-white font-bold">Share on Social</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
