import MatchResultCell from '@/components/MatchResultCell'
import {DAYS_OF_WEEK} from '@/constants/day'
import {Ionicons} from '@expo/vector-icons'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {TicketCalendarLog} from './type'
import {CALENDAR_END_DATE, CALENDAR_START_DATE} from '@/constants/day'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'
import {groupBy} from '@/shared'
import LottieView from 'lottie-react-native'

import {BottomSheet} from '@/shared/ui'
import WheelPicker2 from '@/components/WheelPicker2'

type Props = {
  date: Date
  setDate: (date: Date) => void
  onClick: (day: Date) => void
  targetId: number
  isLoading?: boolean
}

const CalendarView = ({date, setDate, onClick, targetId, isLoading}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const currentYearMonth = dayjs(date).format('YYYY-MM')

  const {data: ticketList, isLoading: isTicketListLoading} = useQuery({
    queryKey: ['tickets', currentYearMonth, targetId],
    queryFn: async () => {
      return ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
        date: currentYearMonth,
        user_id: targetId,
      }).then(data => groupBy(data, item => item.date))
    },
    enabled: Boolean(currentYearMonth && targetId),
  })

  // const loading = true
  const loading = isLoading || isTicketListLoading

  return (
    <View style={styles.container}>
      {loading && (
        <LottieView
          source={require('@/assets/lottie/calendar_loading.json')}
          autoPlay
          loop
          style={{
            width: 100,
            height: 100,
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
          <Text style={styles.headerText}>{dayjs(date).format('YYYY.MM')}</Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.daysOfWeekContainer}>
        {DAYS_OF_WEEK.map((day, index) => (
          <Text
            key={index}
            style={[styles.dayOfWeekText, index === 0 && {color: '#FF0000'}, index === 6 && {color: '#1E5EF4'}]}>
            {day}
          </Text>
        ))}
      </View>
      <View style={{width: width}}>
        <View style={{width: width}}>
          <RenderDays
            isLoading={!ticketList} //
            date={dayjs(date).toDate()}
            ticketList={ticketList}
            dayClick={onClick}
          />
        </View>
      </View>
      <YearMonthPicker
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={date => {
          setDate(date)
          setIsModalVisible(false)
        }}
        initialYearMonth={dayjs(date).format('YYYY.MM')}
      />
    </View>
  )
}

const YearMonthPicker = ({
  open,
  onCancel,
  onConfirm,
  initialYearMonth,
}: {
  open: boolean
  onCancel: () => void
  onConfirm: (date: Date) => void
  initialYearMonth: string
}) => {
  const [selectedYear, setSelectedYear] = useState(Number(initialYearMonth.split('.')[0]))
  const [selectedMonth, setSelectedMonth] = useState(Number(initialYearMonth.split('.')[1]))

  const [yearList] = useState(
    Array.from(
      {length: CALENDAR_END_DATE.diff(CALENDAR_START_DATE, 'year') + 1},
      (_, i) => `${CALENDAR_START_DATE.year() + i}년`,
    ),
  )

  return (
    <BottomSheet isOpen={open} duration={350} height={350}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>원하시는 날짜를 선택해주세요</Text>
        <View style={styles.datePickerContainer}>
          <WheelPicker2
            itemHeight={50}
            initialItem={`${selectedYear}년`}
            onItemChange={item => {
              setSelectedYear(Number(item.replaceAll(/\D/g, '')))
            }}
            items={yearList}
            containerStyle={{width: '49%'}}
          />
          <WheelPicker2
            items={Array.from({length: 12}, (_, i) => `${i + 1}월`)}
            itemHeight={50}
            initialItem={`${selectedMonth}월`}
            onItemChange={item => {
              console.log(item)
              setSelectedMonth(Number(item.replaceAll(/\D/g, '')))
            }}
            containerStyle={{width: '49%'}}
          />
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              console.log(`${selectedYear}-${selectedMonth}-01`)
              onConfirm(new Date(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`))
            }}>
            <Text style={styles.confirmText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const dimensions = Dimensions.get('window')
const width = dimensions.width - 48

const RenderDays = ({
  date,
  dayClick,
  ticketList,
  isLoading,
}: {
  date: Date
  ticketList: Record<string, TicketCalendarLog[]> | null | undefined
  dayClick: (day: Date) => void
  isLoading: boolean
}) => {
  // UI에 검은 테두리 보여주는 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [days] = useState<Date[]>(() => {
    const startDate = dayjs(date).startOf('month').startOf('week')
    const endDate = dayjs(date).endOf('month').endOf('week')

    return Array.from(
      {length: endDate.diff(startDate, 'day') + 1}, //
      (_, i) => startDate.add(i, 'day').toDate(),
    )
  })

  return (
    <View style={[styles.daysContainer, {width: width}]}>
      {days.map(day => {
        const ticketsGroupByDate = ticketList?.[dayjs(day).format('YYYY-MM-DD')] || []
        const isSameMonth = dayjs(day).isSame(date, 'month')
        const isSameDay = dayjs(day).isSame(selectedDate, 'day')
        const isToday = dayjs(day).isSame(dayjs(), 'day')

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
            <Text style={[styles.dayText, isToday && styles.today]}>{dayjs(day).format('D')}</Text>
            <MatchResultCell
              isLoading={isLoading}
              onPress={() => {
                setSelectedDate(day)
                dayClick(day)
              }}
              data={ticketsGroupByDate} //
            />
          </View>
        )
      })}
    </View>
  )
}

export {CalendarView}

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
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8, // Add some space between the text and the icon
  },
  navButton: {
    fontSize: 24,
    color: 'black',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  dayOfWeekText: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  day: {
    width: '14.28%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'transparent',
    paddingTop: 2,
  },
  dayText: {
    fontSize: 12,
    lineHeight: 16.8,
    marginBottom: 2,
    fontWeight: 500,
    color: '#77756C',
  },
  inactiveDay: {
    opacity: 0.5,
  },
  today: {
    borderRadius: 10,
    backgroundColor: '#000000',
    color: 'white',
    width: 30,
    textAlign: 'center',
  },
  selectedDay: {
    borderColor: '#95938B',
  },
  moodContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 4,
  },
  datePickerContainer: {
    flexDirection: 'row',
    // height: 134,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: 24,
    backgroundColor: '#fff',
  },
  moodIcon: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    padding: 24,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 13,
    marginTop: 30,
    marginBottom: 16,
  },
  confirmButton: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1E5EF4',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
    color: '#fff',
  },
  cancelButton: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#D0CEC7',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
    color: '#000',
  },
})
