import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use FontAwesome icons

const Calendar = () => {
  // Define the days of the week (Sunday to Saturday)
  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  // Get the current date and weekday
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  const currentDayOfMonth = currentDate.getDate(); // Current day of the month

  // Randomly assign ember (for true) or cross (for false) icons for each day
  const [iconStates, setIconStates] = useState([
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ]); // true = ember, false = cross

  // Function to display the date of each day (wraps around if exceeds 31)
  const getDisplayedDate = (index: number) => {
    const date = currentDayOfMonth + index;
    return date > 31 ? date - 31 : date;
  };

  // Calculate the highlighted day
  const getHighlightedDayIndex = (currentDayOfWeek: number) => {
    // The highlighted day is always today's day
    return currentDayOfWeek; // This maps to the correct index in the daysOfWeek array
  };

  const highlightedDayIndex = getHighlightedDayIndex(currentDayOfWeek);

  return (
    <View style={{flexDirection: 'row', marginTop: 20}}>
      {daysOfWeek.map((day, index) => {
        // Determine if the current day is the one being iterated
        const dayNumber = getDisplayedDate(index);
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
              name={iconStates[index] ? 'check' : 'close'} // Ember = 'fire', Cross = 'cancel'
              size={12}
              color={iconStates[index] ? 'green' : 'red'}
              style={{marginBottom: 5}}
            />

            {/* Day text */}
            <Text
              style={{color: isToday ? '#E53935' : '#757575', fontSize: 10}}>
              {day}
            </Text>

            {/* Date */}
            <Text
              style={{
                color: isToday ? '#E53935' : '#757575',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {dayNumber}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Calendar;
