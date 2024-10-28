import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {PoseDetailScreenProps} from '../navigation/StackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';

const PoseDetailScreen: React.FC<PoseDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {pose} = route.params;

  return (
    <View style={{flex: 1}}>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{paddingBottom: 80}}>
        {/* Image Header with Back Button */}
        <View>
          <Image source={pose.image} style={{width: '100%', height: 235}} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 30,
              left: 24,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: 15,
              borderRadius: 15,
            }}>
            <Icon name="chevron-left" size={15} color="white" />
          </TouchableOpacity>
        </View>

        {/* Pose Details Section */}
        <View className="p-5">
          <View
            style={{
              backgroundColor: 'rgba(73, 74, 80, 0.8)',
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#8f9098',
              alignSelf: 'flex-start',
            }}>
            <Text className="text-white text-[12px] font-semibold">
              {pose.difficulty || 'Basic'}
            </Text>
          </View>

          <Text className="text-2xl font-bold mt-2 tracking-tight text-black">
            {pose.name}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="user"
              size={16}
              color="#71727a"
              style={{marginRight: 5}}
            />
            <Text className="text-[#71727a] text-sm font-bold mt-1">
              {pose.gender}
            </Text>
          </View>

          <Text className="text-black text-sm mt-3 leading-tight">
            {pose.description}
          </Text>
        </View>

        {/* Time, Target Muscle, and Main Goal */}
        <View className="px-4 py-2">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                backgroundColor: '#e3e4e7',
                borderRadius: 15,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginRight: 10,
                width: '48%',
              }}>
              <Text className="text-gray-500 font-bold text-sm">Time</Text>
              <Text className="text-gray-900 text-base font-semibold">
                {pose.duration}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                backgroundColor: '#e3e4e7',
                borderRadius: 15,
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: '48%',
              }}>
              <Text className="text-gray-500 font-bold text-sm">
                Target Muscle
              </Text>
              <Text className="text-gray-900 text-base font-semibold">
                {pose.targetMuscle}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#e3e4e7',
              borderRadius: 15,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginTop: 12,
            }}>
            <Text className="text-gray-600 font-bold text-sm">Main Goal</Text>
            <Text className="text-gray-900 text-base font-semibold">
              {pose.goal}
            </Text>
          </View>
        </View>

        {/* Schedule Yoga Session Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fce8e8',
            borderWidth: 1,
            borderColor: '#eb544d',
            borderRadius: 15,
            padding: 12,
            marginHorizontal: 16,
            marginVertical: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text className="text-[#5d5d5d] font-bold text-sm">
              Set a Reminder for this Yoga Session
            </Text>
            <Text className="text-[#191919] text-base font-bold">
              Schedule Yoga Session
            </Text>
          </View>
          <Text className="text-red-500 text-xl">⏰</Text>
        </TouchableOpacity>

        {/* Video Section */}
        <View className="px-4 mt-4">
          <View className="px-4 py-2">
            <View style={{marginBottom: 16}}>
              <Text className="text-lg font-black text-[#191919] tracking-tight">
                Learn with a Video
              </Text>
            </View>

            <View style={{height: 200, borderRadius: 10, overflow: 'hidden'}}>
              <WebView
                source={{
                  uri:
                    pose.videoUri ||
                    'https://www.youtube.com/embed/YOUR_VIDEO_ID', // Use a dummy URL as fallback
                }}
                style={{flex: 1}}
                allowsFullscreenVideo
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#eb544d',
          height: 48,
          borderRadius: 24,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '90%',
        }}>
        <Icon name="play" size={16} color="white" style={{marginRight: 8}} />
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
          Start Yoga
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PoseDetailScreen;
