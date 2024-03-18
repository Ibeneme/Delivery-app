import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SampleComponent = ({ numberOfLocations }) => {

    const locations = ['Lagos', 'Abuja'];
    
  const [selectedDates, setSelectedDates] = useState(Array(locations?.length).fill(new Date()));
  const [showPicker, setShowPicker] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const onChange = (event, selectedDate, index) => {
    console.log(event, 'event')
    if (event.type === 'set') { 
        setShowPicker(false); 
      const currentDate = selectedDate || selectedDates[index];
      setSelectedDates(prevDates => {
        const newDates = [...prevDates];
        newDates[index] = currentDate;
        return newDates;
      });
      console.log(`Date at index ${index}:`, currentDate);
    }
    setShowPicker(false); 
  };
  

  const handlePickerPress = (index) => {
    setSelectedIndex(index);
    setShowPicker(true); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedDates.map((date, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={() => handlePickerPress(index)}>
            <Text>Date Picker {index + 1}</Text>
          </TouchableOpacity>
          {showPicker && selectedIndex === index && ( // Conditionally render DateTimePicker
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => onChange(event, selectedDate, index)}
            />
          )}
          <Text>Selected Date: {selectedDates[index].toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );
};

export default SampleComponent;
