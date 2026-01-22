import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {DAYS_OF_WEEK} from '@/constants/day';
import dayjs from 'dayjs';
import {BottomSheet, Pressable, Txt} from '@/shared/ui';
import WheelPicker2 from '@/components/WheelPicker2';
import {WeekCalendarController} from './WeekCalendarController';
import {size} from '@/shared';
import {color_token} from '@/constants/theme';

type Props = {
  onChange: (date: Date) => void;
  value: Date;
};

type CalendarCellProps = {
  day: Date;
  index: number;
  isSelected: boolean;
  currentDate: Date;
  onChange: (date: Date) => void;
};

const CalendarCell = React.memo(
  ({day, index, isSelected, onChange}: CalendarCellProps) => {
    const today = dayjs();
    const dayObj = dayjs(day);
    const isToday = dayObj.isSame(today, 'date');
    const isTodayAndNotSelected = isToday && !isSelected;

    return (
      <Pressable
        style={[styles.dayContainer, isSelected && styles.selectedDay, isTodayAndNotSelected && styles.todayDay]}
        onPress={() => onChange(day)}>
        <Txt size={13} color={isSelected ? color_token.white : isToday ? color_token.black : color_token.black}>
          {DAYS_OF_WEEK[index]}
        </Txt>
        <Txt
          size={18}
          weight="medium"
          color={isSelected ? color_token.white : isToday ? color_token.black : color_token.black}
          style={styles.dayText}>
          {dayObj.format('D')}
        </Txt>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    // isSelected가 같고 currentDate가 같으면 리렌더링하지 않음
    // console.log('CalendarCell :: ', prevProps.isSelected, nextProps.isSelected)
    return (
      prevProps.isSelected === nextProps.isSelected &&
      dayjs(prevProps.currentDate).isSame(nextProps.currentDate, 'date')
    );
  },
);

type MatchCalendarBodyProps = {
  currentDate: Date;
  selectedDate: Date;
  onChange: (date: Date) => void;
};

const MatchCalendarBody = ({currentDate, selectedDate, onChange}: MatchCalendarBodyProps) => {
  const days = Array.from({length: 7}, (_, i) => i);
  const startDate = dayjs(currentDate).startOf('week'); // 주의 첫 번째 날을 가져옴

  return (
    <View style={styles.weekRow}>
      {days.map((_, i) => {
        const day = dayjs(startDate).add(i, 'day');
        const isSelected = dayjs(day).isSame(selectedDate, 'date'); // 선택된 날짜 여부

        return (
          <CalendarCell
            key={i}
            day={day.toDate()}
            index={i}
            isSelected={isSelected}
            currentDate={currentDate}
            onChange={onChange}
          />
        );
      })}
    </View>
  );
};

const MatchWeekCalendar = ({onChange, value}: Props) => {
  // 현재 캘린더가 보고 있는 날짜
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = useCallback(() => setCurrentDate(currentDate => dayjs(currentDate).add(-1, 'week').toDate()), []);
  const nextMonth = useCallback(() => setCurrentDate(currentDate => dayjs(currentDate).add(1, 'week').toDate()), []);

  const handleChange = useCallback(
    (date: Date) => {
      setCurrentDate(date);
      onChange(date);
    },
    [onChange],
  );

  return (
    <>
      <WeekCalendarController
        setCurrentDate={handleChange}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        currentDate={currentDate}
      />
      <MatchCalendarBody
        currentDate={currentDate}
        selectedDate={value}
        onChange={date => {
          setCurrentDate(date);
          onChange(date);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dayText: {
    minWidth: size(20),
    width: '100%',
    textAlign: 'center',
  },
  selectedDay: {
    borderWidth: size(2),
    borderRadius: size(10),
    padding: size(4),
    backgroundColor: color_token.black,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: '1%',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: size(12),
    flexDirection: 'column',
    gap: size(6),
    borderRadius: size(10),
    borderWidth: size(2),
    borderColor: 'transparent',
    padding: size(4),
    flex: 1,
  },
  selectedText: {
    color: color_token.white,
  },
  todayDay: {
    borderWidth: size(2),
    borderRadius: size(10),
    padding: size(4),
    borderColor: '#55524E',
  },
  todayText: {
    color: color_token.black,
  },
  defaultText: {
    color: color_token.black,
  },
});

export {MatchWeekCalendar};
