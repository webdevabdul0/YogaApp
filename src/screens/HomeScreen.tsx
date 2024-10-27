import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {HomeScreenProps} from '../navigation/StackParamList';

const yogaPoses = [
  {
    id: 1,
    name: 'Tree Pose',
    duration: '2 minutes',
    image: require('../assets/tree-pose.png'),
  },
  {
    id: 2,
    name: 'Chair Pose',
    duration: '1 minute',
    image: require('../assets/chair-pose.png'),
  },
  {
    id: 3,
    name: 'Warrior II',
    duration: '45 minutes',
    image: require('../assets/warrior-ii.png'),
  },
  {
    id: 4,
    name: 'Triangle Pose',
    duration: '45 minutes',
    image: require('../assets/triangle-pose.png'),
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-4xl font-extrabold self-center my-4 text-black">
        My <Text className="text-red-500 font-black">Yoga</Text>
      </Text>

      <ScrollView className="px-4">
        <Text className="text-lg font-bold self-center mb-5">
          Discover the Best Yoga
        </Text>
        {yogaPoses.map(pose => (
          <TouchableOpacity
            key={pose.id}
            className="mb-5 rounded-lg overflow-hidden"
            onPress={() => navigation.navigate('PoseDetail', {pose})}>
            <ImageBackground
              source={pose.image}
              className="h-52 justify-end px-3 py-4">
              <Text className="text-white text-xl font-bold">{pose.name}</Text>
              <Text className="text-white text-sm">{pose.duration}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
