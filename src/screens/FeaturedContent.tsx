import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList'; // Adjust path if necessary
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons
// Define the route prop for FeaturedContentScreen
type FeaturedContentScreenRouteProp = RouteProp<
  StackParamList,
  'FeaturedContentScreen'
>;

interface FeaturedContentScreenProps {
  route: FeaturedContentScreenRouteProp;
}

const FeaturedContentScreen: React.FC<FeaturedContentScreenProps> = ({
  route,
  navigation,
}) => {
  const {Post} = route.params; // Destructure the Post object from params

  return (
    <ScrollView className="flex-grow">
      <View className="p-5 bg-gray-50 rounded-xl shadow-lg shadow-black m-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-8 left-6 bg-black/30 p-3 rounded-lg">
          <Icon name="chevron-left" size={15} color="white" />
        </TouchableOpacity>

        <Text className="absolute self-center top-8 transform text-3xl font-bold text-gray-800">
          My<Text className="text-[#ED706A]">Yoga</Text>
        </Text>

        {/* Title */}
        <Text className="text-[24px] mt-20 font-bold text-gray-800 mb-5  text-center">
          {Post.title}
        </Text>
        <Text className="text-[18x] font-medium text-gray-700 mb-5  text-center">
          {Post.tagline}
        </Text>

        {/* Image */}
        <Image
          source={Post.imageSource}
          className="w-full h-60 rounded-xl mb-5"
          resizeMode="cover"
        />

        {/* Full Body */}
        <Text className="text-[16px] text-gray-600 leading-5 tracking-wide text-justify mt-2 mb-5">
          {Post.fullBody}
        </Text>
      </View>
    </ScrollView>
  );
};

export default FeaturedContentScreen;
