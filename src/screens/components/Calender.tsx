import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use FontAwesome icons
import firestore from '@react-native-firebase/firestore'; // Assuming Firebase Firestore is used
import auth from '@react-native-firebase/auth'; // Assuming Firebase Auth is used

const Calendar = () => {
  // Define the days of the week (Sunday to Saturday)
  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  // Get the current date and weekday
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

  // State for session days (fetched from Firestore)
  const [sessionDays, setSessionDays] = useState([
    false, // Initial value (false means not attended)
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Fetch session days from Firestore
  useEffect(() => {
    const fetchSessionDays = async () => {
      const user = auth().currentUser;
      if (!user) {
        console.log('User not logged in');
        return; // Handle case when user is not logged in
      }

      const userId = user.uid; // Get the current user ID

      console.log('User Id is ', userId);
      try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const userSessionDays = userData?.sessionDays || [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ];
          setSessionDays(userSessionDays); // Update sessionDays with the fetched data
        }
      } catch (error) {
        console.error('Error fetching session days:', error);
      }
    };

    fetchSessionDays();
  }, []);

  // Calculate the highlighted day
  const getHighlightedDayIndex = currentDayOfWeek => {
    // The highlighted day is always today's day
    return currentDayOfWeek; // This maps to the correct index in the daysOfWeek array
  };

  const highlightedDayIndex = getHighlightedDayIndex(currentDayOfWeek);

  return (
    <View style={{flexDirection: 'row', marginTop: 20}}>
      {daysOfWeek.map((day, index) => {
        const isToday = index === highlightedDayIndex; // Highlight the correct day

        return (
          <View
            key={index}
            style={{
              flex: 1,
              marginHorizontal: 3, // Add a horizontal gap between each day cell
              padding: 7,
              backgroundColor: isToday ? '#FFEBEE' : '#F5F5F5', // Highlight current day
              borderRadius: 10,
              alignItems: 'center',
            }}>
            {/* Ember or Cross icon above the day */}
            <Icon
              name={sessionDays[index] ? 'check' : 'close'} // Ember = 'check', Cross = 'close'
              size={12}
              color={sessionDays[index] ? 'green' : 'red'}
              style={{marginBottom: 5}}
            />

            {/* Day text */}
            <Text
              style={{
                color: isToday ? '#E53935' : '#757575',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {day}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Calendar;
