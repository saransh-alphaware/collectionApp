import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from '../../components/DateTimePickerModal/DateTimePickerModal';
import { width } from '../../utils/Dimensions';
import useThemedStyles from '../../hooks/usethemestyle';
import useTheme from '../../hooks/useTheme';

const DateTimePickerScreen = () => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);
  
  // State to track picker visibility
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  
  // State to store selected dates/times
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };
  
  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date and time for display
  const formatDateTime = (date) => {
    return `${formatDate(date)} at ${formatTime(date)}`;
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Date & Time Picker Examples</Text>
      
      {/* Date Picker Example */}
      <View style={style.section}>
        <Text style={style.sectionTitle}>Date Picker</Text>
        <TouchableOpacity 
          style={style.pickerButton} 
          onPress={() => setDatePickerVisible(true)}
        >
          <Text style={style.buttonText}>Select Date</Text>
        </TouchableOpacity>
        <Text style={style.selectedValue}>
          Selected: {formatDate(selectedDate)}
        </Text>
        
        <DateTimePickerModal
          visible={isDatePickerVisible}
          onClose={() => setDatePickerVisible(false)}
          onConfirm={(date) => {
            setSelectedDate(date);
            setDatePickerVisible(false);
          }}
          initialDate={selectedDate}
          mode="date"
          title="Choose Date"
        />
      </View>
      
      {/* Time Picker Example */}
      <View style={style.section}>
        <Text style={style.sectionTitle}>Time Picker</Text>
        <TouchableOpacity 
          style={style.pickerButton} 
          onPress={() => setTimePickerVisible(true)}
        >
          <Text style={style.buttonText}>Select Time</Text>
        </TouchableOpacity>
        <Text style={style.selectedValue}>
          Selected: {formatTime(selectedTime)}
        </Text>
        
        <DateTimePickerModal
          visible={isTimePickerVisible}
          onClose={() => setTimePickerVisible(false)}
          onConfirm={(time) => {
            setSelectedTime(time);
            setTimePickerVisible(false);
          }}
          initialDate={selectedTime}
          mode="time"
          title="Choose Time"
        />
      </View>
      
      {/* DateTime Picker Example */}
      <View style={style.section}>
        <Text style={style.sectionTitle}>Date & Time Picker</Text>
        <TouchableOpacity 
          style={style.pickerButton} 
          onPress={() => setDateTimePickerVisible(true)}
        >
          <Text style={style.buttonText}>Select Date & Time</Text>
        </TouchableOpacity>
        <Text style={style.selectedValue}>
          Selected: {formatDateTime(selectedDateTime)}
        </Text>
        
        <DateTimePickerModal
          visible={isDateTimePickerVisible}
          onClose={() => setDateTimePickerVisible(false)}
          onConfirm={(dateTime) => {
            setSelectedDateTime(dateTime);
            setDateTimePickerVisible(false);
          }}
          initialDate={selectedDateTime}
          mode="datetime"
          title="Choose Date & Time"
        />
      </View>
    </View>
  );
};

export default DateTimePickerScreen;

const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: theme.colors.PRIMARYWHITE,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: width * 0.06,
    color: theme.colors.PRIMARYBLACK,
    marginBottom: width * 0.05,
    textAlign: 'center',
  },
  section: {
    marginBottom: width * 0.08,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.PRIMARYGRAY,
    paddingBottom: width * 0.05,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: width * 0.045,
    color: theme.colors.PRIMARYBLACK,
    marginBottom: width * 0.03,
  },
  pickerButton: {
    backgroundColor: theme.colors.PRIMARYBLUE,
    borderRadius: 5,
    paddingVertical: width * 0.03,
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: width * 0.04,
    color: theme.colors.PRIMARYBLACK,
  },
  selectedValue: {
    fontFamily: 'Roboto-Regular',
    fontSize: width * 0.04,
    color: theme.colors.PRIMARYBLACK,
    paddingVertical: width * 0.02,
  },
});