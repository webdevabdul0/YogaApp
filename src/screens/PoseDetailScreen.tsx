import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {PoseDetailScreenProps} from '../navigation/StackParamList';

const PoseDetailScreen: React.FC<PoseDetailScreenProps> = ({
  route,
  navigation,
}) => {
  // Use route to access params
  const {pose} = route.params; // Destructure pose from route params

  return (
    <View className="flex-1 p-4">
      <Image source={pose.image} style={{width: '100%', height: 200}} />
      <Text className="text-3xl font-bold mt-4">{pose.name}</Text>
      <Text className="text-lg mt-2">Duration: {pose.duration}</Text>
      <Text className="text-base mt-4">
        Here you can add more details about the pose...
      </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default PoseDetailScreen;
