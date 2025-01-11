import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {HomeScreenProps} from '../navigation/StackParamList';
import {useFocusEffect} from '@react-navigation/native';
import {center} from '@shopify/react-native-skia';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Calendar from './components/Calender';

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

const HomeScreen: React.FC<HomeScreenProps> = ({navigation, route}) => {
  const inputRef = useRef<TextInput>(null);
  const [userData, setUserData] = useState({
    firstName: 'Abdul',
    profilePic: '',
  });

  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [filteredPoses, setFilteredPoses] = useState(yogaPoses); // Filtered yoga poses based on search
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if search is active
  // Update filteredPoses whenever searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = yogaPoses.filter(pose =>
        pose.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPoses(filtered);
    } else {
      setFilteredPoses(yogaPoses); // Show all poses if no search query
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setUserData({
              firstName: data?.firstName || 'User',
              profilePic: data?.profilePic || '',
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {/* Header */}
      <View style={{padding: 20, paddingBottom: 0}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 26, fontWeight: 'bold', color: '#000'}}>
              Hello <Text style={{color: '#E53935'}}>{userData.firstName}</Text>
              ,
            </Text>
            <Text style={{fontSize: 16, color: '#757575'}}>
              Welcome to MyYoga
            </Text>
          </View>
          {userData.profilePic ? (
            <Image
              source={{uri: userData.profilePic}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E0E0E0',
              }}
            />
          )}
        </View>
        {/* Calendar */}
        <Calendar />
      </View>

      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            paddingVertical: 5,
            borderRadius: 20,
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          {/* Search Icon */}
          <Icon
            name="search"
            size={24}
            color="#888"
            style={{marginRight: 10}}
          />

          {/* TextInput for Search */}
          <TextInput
            ref={inputRef}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery} // Update the search query
            onFocus={() => setIsSearchActive(true)} // Set search to active when focused
            onBlur={() => setIsSearchActive(false)}
            style={{
              fontSize: 16,
              flex: 1, // Ensure it takes the remaining space
            }}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Only show Featured and Choose a Specific Yoga if search is not active */}
      {!isSearchActive && (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            paddingHorizontal: 20,
            backgroundColor: '#F8E2E1',

            borderRadius: 20,
          }}>
          {/* Left Section for Title, Description, and Button */}
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold'}}>
              Energy Morning
            </Text>
            <Text style={{color: '#000000', fontSize: 14}}>
              Fix Your Whole Body Posture
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#ED706A',
                paddingVertical: 15,
                paddingHorizontal: 50, // Reduced padding for smaller button width
                borderRadius: 15,
                marginTop: 10,
                alignSelf: 'flex-start', // Centers the button horizontally
              }}>
              <Text
                style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center'}}>
                Start
              </Text>
            </TouchableOpacity>
          </View>

          {/* Right Section for Image */}
          <Image
            source={require('../assets/energy-morning.png')}
            style={{
              width: 130,
              height: 130,
              marginLeft: 20,
              marginBottom: 20,
            }}
          />
        </View>
      )}

      {/* Yoga Poses */}
      <View style={{padding: 20}}>
        {!isSearchActive && (
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
            Choose a Specific Yoga
          </Text>
        )}

        {filteredPoses.map(pose => (
          <TouchableOpacity
            key={pose.id}
            style={{
              marginBottom: 20,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F5F5F5',
            }}
            onPress={() => navigation.navigate('PoseDetail', {pose})}>
            <ImageBackground
              source={pose.image}
              style={{
                height: 120,
                justifyContent: 'flex-end',
                padding: 20,
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 18}}>{pose.name}</Text>
              <Text style={{color: '#FFFFFF', fontSize: 14}}>
                {pose.duration}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
