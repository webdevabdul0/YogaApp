import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon library
import {RoutineScreenProps} from '../navigation/StackParamList';

const yogaPoses = [
  {
    id: 1,
    name: 'Tree Pose',
    tagLine: 'Fix Your Whole Body Posture.',
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
    tagLine: 'Build strength and stability with Chair Pose.',
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
    tagLine: 'Embrace strength and stability in Warrior II.',
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
    tagLine: 'Expand and energize with Triangle Pose.',
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

const RoutineDetailScreen: React.FC<RoutineScreenProps> = ({
  route,
  navigation,
}) => {
  const {routine} = route.params;

  // Filter poses based on routine
  const filteredPoses = yogaPoses.filter(pose =>
    (routine.poses || []).includes(pose.id),
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', padding: 20}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-3
         bg-black/30 p-3 rounded-lg">
        <Icon name="chevron-left" size={15} color="white" />
      </TouchableOpacity>

      <Text
        style={{fontSize: 26, fontWeight: 'bold', color: '#000'}}
        className="ml-14">
        {routine.title}
      </Text>
      <Text
        style={{fontSize: 16, color: '#757575', marginBottom: 20}}
        className="ml-14">
        {routine.description}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
          color: '#1A1A1A',
        }}>
        Routine Poses
      </Text>

      {/* Render poses like on the home screen */}
      {filteredPoses.map(pose => (
        <TouchableOpacity
          key={pose.id}
          style={{
            height: 160,
            marginBottom: 15,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#F5F5F5',
            position: 'relative',
          }}
          onPress={() => navigation.navigate('PoseDetail', {pose})}>
          <ImageBackground
            source={pose.image}
            style={{height: 160, justifyContent: 'flex-end'}}>
            {/* Duration Badge */}
            <View
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: '#EB544D',
                borderRadius: 15,
                paddingHorizontal: 8,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="play-arrow"
                size={12}
                color="#FFFFFF"
                style={{marginRight: 2}}
              />
              <Text
                style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold'}}>
                {pose.duration}
              </Text>
            </View>

            {/* Pose Details */}
            <View style={{padding: 20, position: 'absolute', bottom: 0}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: '600',
                  textShadowColor: '#404040',
                  textShadowOffset: {width: 1, height: 1},
                  textShadowRadius: 3,
                }}>
                {pose.name}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  textShadowColor: '#404040',
                  textShadowOffset: {width: 1, height: 1},
                  textShadowRadius: 3,
                }}>
                {pose.tagLine}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RoutineDetailScreen;
