import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {CalendarScreenProps} from '../../types/calendar';

const MyCalendar = ({navigation}: CalendarScreenProps) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>메인 캘린더 화면</Text>
    </View>
  );
};
export default MyCalendar;
