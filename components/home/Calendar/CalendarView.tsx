import MatchResultCell from '@/components/MatchResultCell';
import {DAYS_OF_WEEK} from '@/constants/day';
import {Ionicons} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, {memo, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TicketCalendarLog} from './type';
import {CALENDAR_END_DATE, CALENDAR_START_DATE} from '@/constants/day';
import {useQuery} from '@tanstack/react-query';
import ApiClient from '@/api';
import {groupBy, size} from '@/shared';
import LottieView from 'lottie-react-native';

import {Txt, YearMonthPicker} from '@/shared/ui';
import {color_token} from '@/constants/theme';

type Props = {
  date: Date;
  setDate: (date: Date) => void;
  onClick: (day: Date) => void;
  targetId: number;
  isLoading?: boolean;
};

const CalendarView = ({date, setDate, onClick, targetId, isLoading}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentYearMonth = dayjs(date).format('YYYY-MM');

  const {data: ticketList, isLoading: isTicketListLoading} = useQuery({
    queryKey: ['tickets', currentYearMonth, targetId],
    queryFn: async () => {
      return ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
        date: currentYearMonth,
        user_id: targetId,
      }).then(data => groupBy(data, item => item.date));
    },
    enabled: Boolean(currentYearMonth && targetId),
  });

  // const loading = true
  const loading = isLoading || isTicketListLoading;

  const memoizedDays = useMemo(() => dayjs(date).toDate(), [date, ticketList]);

  return (
    <View style={styles.container}>
      {loading && (
        <LottieView
          source={require('@/assets/lottie/calendar_loading.json')}
          autoPlay
          loop
          style={{
            width: size(100),
            height: size(100),
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{translateX: -50}, {translateY: -50}],
            zIndex: 1000,
            margin: 'auto',
          }}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTextContainer} onPress={() => setIsModalVisible(true)}>
          <Txt size={20} weight="semibold" color={color_token.gray900}>
            {dayjs(date).format('YYYY.MM')}
          </Txt>
          <Ionicons name="chevron-down" size={24} color={color_token.gray900} />
        </TouchableOpacity>
      </View>
      <CalendarHeader />
      <View style={{width: width}}>
        <View style={{width: width}}>
          <RenderDays
            isLoading={!ticketList} //
            date={memoizedDays}
            ticketList={ticketList}
            dayClick={onClick}
          />
        </View>
      </View>
      <YearMonthPicker
        isOpen={isModalVisible}
        initialYear={dayjs(date).year()}
        initialMonth={dayjs(date).month() + 1}
        yearRange={{
          start: CALENDAR_START_DATE.year(),
          end: CALENDAR_END_DATE.year(),
        }}
        onConfirm={(year, month) => {
          setDate(dayjs(`${year}-${String(month).padStart(2, '0')}-01`).toDate());
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const CalendarHeader = memo(() => {
  return (
    <View style={styles.daysOfWeekContainer}>
      {DAYS_OF_WEEK.map((day, index) => (
        <Txt
          size={13}
          key={index}
          weight="medium"
          color={color_token.gray900}
          style={[styles.dayOfWeekText, index === 0 && {color: '#FF0000'}, index === 6 && {color: '#1E5EF4'}]}>
          {day}
        </Txt>
      ))}
    </View>
  );
});

const dimensions = Dimensions.get('window');
const width = dimensions.width - 48;

const RenderDays = memo(
  ({
    date,
    dayClick,
    ticketList,
    isLoading,
  }: {
    date: Date;
    ticketList: Record<string, TicketCalendarLog[]> | null | undefined;
    dayClick: (day: Date) => void;
    isLoading: boolean;
  }) => {
    // UI에 검은 테두리 보여주는 상태
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [days] = useState<Date[]>(() => {
      const startDate = dayjs(date).startOf('month').startOf('week');
      const endDate = dayjs(date).endOf('month').endOf('week');

      return Array.from(
        {length: endDate.diff(startDate, 'day') + 1}, //
        (_, i) => startDate.add(i, 'day').toDate(),
      );
    });

    return (
      <View style={[styles.daysContainer, {width: width}]}>
        {days.map(day => {
          const ticketsGroupByDate = ticketList?.[dayjs(day).format('YYYY-MM-DD')] || [];
          const isSameMonth = dayjs(day).isSame(date, 'month');
          const isSameDay = dayjs(day).isSame(selectedDate, 'day');
          const isToday = dayjs(day).isSame(dayjs(), 'day');

          return (
            <View
              key={dayjs(day).format('YYYY-MM-DD')}
              style={[
                styles.day,
                !isSameMonth && styles.inactiveDay,
                Boolean(selectedDate) && isSameDay && styles.selectedDay,
                // styles.selectedDay,
                {height: 80},
              ]}>
              <Txt
                size={12}
                weight="medium"
                color={isSameMonth ? color_token.gray600 : color_token.gray400}
                style={[styles.dayText, isToday && styles.today]}>
                {dayjs(day).format('D')}
              </Txt>
              <MatchResultCell
                isLoading={isLoading}
                onPress={() => {
                  setSelectedDate(day);
                  dayClick(day);
                }}
                data={ticketsGroupByDate} //
              />
            </View>
          );
        })}
      </View>
    );
  },
);

export {CalendarView};

const styles = StyleSheet.create({
  container: {
    width: width,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the text and icon
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: size(12),
  },
  dayOfWeekText: {
    width: '14.28%',
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  day: {
    width: '14.28%',
    borderWidth: 1,
    borderRadius: size(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'transparent',
    paddingTop: size(2),
  },
  dayText: {
    marginBottom: size(2),
  },
  inactiveDay: {},
  today: {
    borderRadius: size(10),
    backgroundColor: color_token.black,
    color: color_token.white,
    width: size(30),
    textAlign: 'center',
  },
  selectedDay: {
    borderColor: color_token.gray500,
  },
});
