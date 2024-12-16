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
    difficulty: 'Basic',
    gender: 'Male & Female',
    description:
      'This yoga pose involves tucking one leg into the other while your hands are in a prayer position above your head, resembling a tree. This pose can improve balance, stability, and strengthen your core.',
    targetMuscle: 'Core',
    goal: 'Improve Posture, Improve Balance',
    videoUri: 'https://www.youtube.com/embed/Mn6RSIRCV3w?si=FdMherW4252g1RaI',
  },
  {
    id: 2,
    name: 'Chair Pose',
    duration: '1 minute',
    image: require('../assets/chair-pose.png'),
    difficulty: 'Intermediate',
    gender: 'Male & Female',
    description:
      'Chair Pose is a strengthening pose that challenges your lower body while working on stability and posture.',
    targetMuscle: 'Legs and Core',
    goal: 'Build Strength, Enhance Stability',
    videoUri: 'https://www.youtube.com/embed/Mn6RSIRCV3w?si=FdMherW4252g1RaI',
  },
  {
    id: 3,
    name: 'Warrior II',
    duration: '45 seconds',
    image: require('../assets/warrior-ii.png'),
    difficulty: 'Intermediate',
    gender: 'Male & Female',
    description:
      'Warrior II strengthens the legs, opens the hips, and stretches the upper body while building endurance and concentration.',
    targetMuscle: 'Legs, Hips, and Arms',
    goal: 'Build Endurance, Improve Focus',
    videoUri: 'https://www.youtube.com/embed/Mn6RSIRCV3w?si=FdMherW4252g1RaI',
  },
  {
    id: 4,
    name: 'Triangle Pose',
    duration: '45 seconds',
    image: require('../assets/triangle-pose.png'),
    difficulty: 'Basic',
    gender: 'Male & Female',
    description:
      'Triangle Pose stretches the legs and torso, mobilizes the hips, and promotes overall balance and stability.',
    targetMuscle: 'Legs and Core',
    goal: 'Enhance Flexibility, Improve Stability',
    videoUri: 'https://www.youtube.com/embed/Mn6RSIRCV3w?si=FdMherW4252g1RaI',
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-4xl font-extrabold self-center my-7 text-black">
        My <Text className="text-red-500 font-black">Yoga</Text>
      </Text>

      <ScrollView className="px-4 ">
        <Text className="text-[22px] font-bold self-start mb-5 text-black">
          Discover the Best Yoga
        </Text>
        {yogaPoses.map(pose => (
          <TouchableOpacity
            key={pose.id}
            className="mb-5 rounded-3xl overflow-hidden"
            onPress={() => navigation.navigate('PoseDetail', {pose})}>
            <ImageBackground
              source={pose.image}
              className="h-52 justify-end px-3 py-4">
              <Text className="text-white text-xl font-black">{pose.name}</Text>
              <Text className="text-white text-sm font-bold">
                {pose.duration}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
