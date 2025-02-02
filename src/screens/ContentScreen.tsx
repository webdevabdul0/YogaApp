import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList'; // Adjust path if necessary
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons

// Define the route prop for ContentScreen
type ContentScreenRouteProp = RouteProp<StackParamList, 'ContentScreen'>;

interface ContentScreenProps {
  route: ContentScreenRouteProp;
}

const ContentScreen: React.FC<ContentScreenProps> = ({route, navigation}) => {
  const {Post} = route.params; // Destructure the Post object from params
  const formattedDate = new Date(Post.publishedAt).toLocaleDateString(); // Format the date

  const handleViewMore = () => {
    if (Post.url) {
      Linking.openURL(Post.url); // Opens the full article in the browser
    }
  };

  return (
    <ScrollView className="flex-grow">
      <View className="p-5 bg-white rounded-xl shadow-lg shadow-black m-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-8 left-6 bg-black/30 p-3 rounded-lg">
          <Icon name="chevron-left" size={15} color="white" />
        </TouchableOpacity>
        <Text className="absolute self-center top-8 transform text-3xl font-bold text-gray-800">
          My<Text className="text-[#ED706A]">Yoga</Text>
        </Text>

        {/* Title */}
        <Text className="text-[24px] mt-20 font-bold text-gray-800 mb-2  text-center">
          {Post.title}
        </Text>

        {/* Author and Date */}
        <View className="flex-row justify-between mb-4 mt-2">
          <View className="flex-row items-center">
            <Icon name="user" size={16} color="#eb544d" />
            <Text className="text-md font-medium text-gray-600 ml-2">
              {Post.author || 'Unknown Author'}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Icon name="calendar" size={16} color="#eb544d" />
            <Text className="text-sm font-normal text-gray-500 ml-2">
              {formattedDate || 'No date available'}
            </Text>
          </View>
        </View>

        {/* Image */}
        {Post.imageSource && (
          <Image
            source={{uri: Post.imageSource}} // Handle only URL for image source
            className="w-full h-60 rounded-xl mb-5"
            resizeMode="cover"
          />
        )}

        {/* Full Body */}
        <Text className="text-[16px] text-gray-600 leading-5 tracking-wide text-justify mt-2 mb-5">
          {Post.fullBody}
        </Text>

        {/* View More Button */}
        {Post.url && (
          <TouchableOpacity
            onPress={handleViewMore}
            className="bg-[#eb544d] rounded-[20px] p-3 mt-4">
            <Text className="text-white text-center text-sm font-semibold">
              View Full Article
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default ContentScreen;
