import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {PoseDetailScreenProps} from '../navigation/StackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PoseDetailScreen: React.FC<PoseDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [modalAnim] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false);
  // Use Animated API for content slide animation
  React.useEffect(() => {
    if (isModalVisible) {
      // Animate the modal content when modal is visible
      Animated.timing(modalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset animation when modal is closed
      Animated.timing(modalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  const {pose} = route.params;

  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleNotification = (scheduledDate: Date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id',
      title: 'Yoga Session Reminder',
      message: 'Don’t forget your scheduled yoga session!',
      date: scheduledDate, // Use the passed scheduled date
      allowWhileIdle: true, // Trigger even if the device is idle
    });

    console.log('Notification scheduled for:', scheduledDate);
    setModalVisible(false);
  };

  {
    /*

  const handleOutsidePress = () => {
    setModalVisible(false);
  };*/
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          animationType="none" // No animation for overlay
          transparent
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View className="flex-1 justify-end bg-black/50">
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: modalAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [500, 0],
                        }),
                      },
                    ],
                    backgroundColor: 'white',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    padding: 20,
                    maxHeight: '60%',
                  }}>
                  <Text className="text-start text-xl font-bold mb-4 text-black/80">
                    Schedule Date & Time
                  </Text>
                  <View className="flex-row w-full gap-3">
                    <TouchableOpacity
                      className="bg-red-500/10 flex-1 rounded-2xl p-3 mt-5 border-2 border-red-500/70 flex-row items-center justify-between"
                      onPress={showDatePicker}>
                      <View>
                        <Text className="font-semibold text-sm">
                          Select Date
                        </Text>
                        <Text className="text-black/70 font-bold text-center text-base">
                          {date.toDateString()}
                        </Text>
                      </View>

                      <MaterialIcons
                        name="keyboard-arrow-down"
                        color="rgba(0, 0, 0, 0.8)"
                        size={24}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="bg-red-500/10 flex-1 rounded-2xl p-3 mt-5 border-2 border-red-500/70 flex-row items-center justify-between"
                      onPress={showDatePicker}>
                      <View>
                        <Text className="font-semibold text-sm">
                          Select Time
                        </Text>
                        <Text className="text-black/70 font-bold text-center text-base">
                          {date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </View>

                      <MaterialIcons
                        name="keyboard-arrow-down"
                        color="rgba(0, 0, 0, 0.8)"
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    className="bg-red-500 h-12 rounded-full flex-row justify-center items-center px-5 mt-5"
                    onPress={() => handleNotification(date)} // Pass the selected date
                  >
                    <Text className="text-white font-bold text-center">
                      Schedule Time & Date
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
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
        onPress={() => navigation.navigate('CameraStream', {pose})}>
        <View className="mr-2">
          <Icon name="play" size={16} color="white" />
        </View>
        <Text className="text-white font-bold">Start Yoga</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PoseDetailScreen;
