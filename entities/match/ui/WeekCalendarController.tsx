import {color_token} from '@/constants/theme';
import {Pressable, size} from '@/shared';
import {DatePicker, Txt} from '@/shared/ui';
import {Ionicons} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

type MatchCalendarHeaderProps = {
  prevMonth: () => void;
  nextMonth: () => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};

const WeekCalendarController = ({setCurrentDate, prevMonth, nextMonth, currentDate}: MatchCalendarHeaderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMonthYearChange = () => {
    setIsModalVisible(prev => !prev);
  };

  return (
    <>
      <_HeaderController
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        currentDate={currentDate}
        openBottomSheet={handleMonthYearChange}
      />
      <DatePicker
        isOpen={isModalVisible}
        initialDate={currentDate}
        yearRange={{start: 2020, end: 2029}}
        onConfirm={date => {
          setCurrentDate(date);
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};

const _HeaderController = ({
  prevMonth,
  nextMonth,
  currentDate,
  openBottomSheet,
}: Omit<MatchCalendarHeaderProps, 'setCurrentDate'> & {openBottomSheet: () => void}) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={prevMonth} style={[styles.headerTextContainer]}>
        <Ionicons name="chevron-back" size={size(24)} color={color_token.gray900} />
      </Pressable>
      <Pressable style={[styles.headerTextContainer, {width: size(100)}]} onPress={openBottomSheet}>
        <Txt size={20} weight="bold">
          {dayjs(currentDate).format('YYYY.MM')}
        </Txt>
      </Pressable>
      <Pressable onPress={nextMonth} style={styles.headerTextContainer}>
        <Ionicons name="chevron-forward" size={size(24)} color={color_token.gray900} />
      </Pressable>
    </View>
  );
};

export {WeekCalendarController};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: size(10),
    marginTop: size(8),
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: size(8),
  },
});
