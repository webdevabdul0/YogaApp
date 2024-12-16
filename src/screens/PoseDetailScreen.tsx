import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {PoseDetailScreenProps} from '../navigation/StackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';

const PoseDetailScreen: React.FC<PoseDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {pose} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: 'Yoga Session Reminder',
      message: 'Don’t forget your scheduled yoga session!',
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsDatePickerVisible(false);
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{paddingBottom: 80}}>
        {/* Image Header */}
        <View>
          <Image source={pose.image} className="w-full h-[235px]" />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-8 left-6 bg-black/30 p-3 rounded-lg">
            <Icon name="chevron-left" size={15} color="white" />
          </TouchableOpacity>
        </View>

        {/* Pose Details */}
        <View className="p-5">
          <View className="bg-gray-700/80 py-1 px-4 rounded-lg border border-gray-400 self-start">
            <Text className="text-white text-xs font-semibold">
              {pose.difficulty || 'Basic'}
            </Text>
          </View>
          <Text className="text-2xl font-bold mt-2 text-black">
            {pose.name}
          </Text>
          <View className="flex-row items-center mt-1">
            <View className="mr-1">
              <Icon name="user" size={16} color="#71727a" />
            </View>
            <Text className="text-gray-600 text-sm font-bold">
              {pose.gender}
            </Text>
          </View>
          <Text className="text-sm text-black mt-3">{pose.description}</Text>
        </View>

        {/* Time, Target Muscle, and Main Goal */}
        <View className="px-4 py-2">
          <View className="flex-row justify-between">
            <View className="bg-gray-200 rounded-xl p-4 w-[48%]">
              <Text className="text-gray-500 text-sm font-bold">Time</Text>
              <Text className="text-gray-900 text-base font-semibold">
                {pose.duration}
              </Text>
            </View>
            <View className="bg-gray-200 rounded-xl p-4 w-[48%]">
              <Text className="text-gray-500 text-sm font-bold">
                Target Muscle
              </Text>
              <Text className="text-gray-900 text-base font-semibold">
                {pose.targetMuscle}
              </Text>
            </View>
          </View>
          <View className="bg-gray-200 rounded-xl p-4 mt-3">
            <Text className="text-gray-600 text-sm font-bold">Main Goal</Text>
            <Text className="text-gray-900 text-base font-semibold">
              {pose.goal}
            </Text>
          </View>
        </View>

        {/* Schedule Button */}
        <TouchableOpacity
          className="bg-red-100 border border-red-400 rounded-2xl p-4 mx-4 my-2 flex-row justify-between items-center"
          onPress={toggleModal}>
          <View>
            <Text className="text-gray-500 font-bold text-sm">
              Set a Reminder for this Yoga Session
            </Text>
            <Text className="text-black font-bold text-base">
              Schedule Yoga Session
            </Text>
          </View>
          <Text className="text-red-400 text-3xl">⏰</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View className="flex-1 justify-end bg-black/50">
              <TouchableWithoutFeedback>
                <View className="bg-white rounded-t-3xl p-5 max-h-[60%]">
                  <Text className="text-center text-lg font-bold mb-4">
                    Schedule Date & Time
                  </Text>
                  <Text className="text-center text-base py-2">
                    {date.toDateString()}
                  </Text>
                  <Text className="text-center text-base py-2">
                    {date.toLocaleTimeString()}
                  </Text>
                  <TouchableOpacity
                    className="bg-red-500 rounded-lg p-3 mt-5"
                    onPress={showDatePicker}>
                    <Text className="text-white font-bold text-center">
                      Select Date & Time
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 rounded-lg p-3 mt-5"
                    onPress={handleNotification}>
                    <Text className="text-white font-bold text-center">
                      Schedule Time & Date
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Date Picker */}
        {isDatePickerVisible && (
          <DatePicker
            modal
            open={isDatePickerVisible}
            date={date}
            onConfirm={handleDateChange}
            onCancel={() => setIsDatePickerVisible(false)}
          />
        )}

        {/* Video Section */}
        <View className="px-4 mt-4">
          <Text className="text-lg font-black text-black">
            Learn with a Video
          </Text>
          <View className="h-52 rounded-lg overflow-hidden mt-3">
            <WebView
              source={{
                uri:
                  pose.videoUri || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              }}
              allowsFullscreenVideo
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Button */}
      <TouchableOpacity
        className="bg-red-500 h-12 rounded-full flex-row justify-center items-center px-5 absolute bottom-5 self-center w-[90%]"
        onPress={() =>
          navigation.navigate('CameraStream', {targetPose: pose.name})
        }>
        <View className="mr-2">
          <Icon name="play" size={16} color="white" />
        </View>
        <Text className="text-white font-bold">Start Yoga</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PoseDetailScreen;
