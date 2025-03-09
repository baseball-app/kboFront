import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Modal, Button} from 'react-native'
import {format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from 'date-fns'
import {Picker} from '@react-native-picker/picker'
import {Ionicons} from '@expo/vector-icons'
import {ko} from 'date-fns/locale'
import {useRouter} from 'expo-router'
import {DAYS_OF_WEEK} from '@/constants/day'
import MatchResultCell from '../MatchResultCell'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'
import {groupBy} from '@/utils/groupBy'

export type TicketCalendarLog = {
  id: number // 5
  date: string // '2025-03-22'
  result: string // '승리'
  writer_id: number // 5
  game_id: number // 1
  opponent: {
    id: number // 7
    name: string // '롯데 자이언츠'
  }
  ballpark: {
    id: number // 1
    name: string // '잠실야구장'
    team_id: number // 3
  }
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const router = useRouter()

  const currentYearMonth = format(currentDate, 'yyyy-MM')

  const {data: ticketList} = useQuery({
    queryKey: ['tickets', currentYearMonth],
    queryFn: () =>
      ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
        date: currentYearMonth,
      }),
    enabled: Boolean(currentYearMonth),
    select(data) {
      return groupBy(data, item => item.date)
    },
  })

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTextContainer} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.headerText}>{format(currentDate, 'yyyy.MM')}</Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
  const dayClick = (pDay: Date) => {
    setSelectedDate(pDay)

    const ticketsGroupByDate = ticketList?.[format(pDay, 'yyyy-MM-dd')] || []

    if (ticketsGroupByDate?.length) {
      router.push({
        pathname: '/write/todayTicketCard', //
        params: {id: ticketsGroupByDate[0].id},
      })
    } else {
      router.push({pathname: '/write', params: {date: format(pDay, 'yyyy-MM-dd')}})
    }
  }

  const renderDaysOfWeek = () => {
    return (
      <View style={styles.daysOfWeekContainer}>
        {DAYS_OF_WEEK.map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>
    )
  }

  const renderDays = () => {
    const days = []
    const startDate = startOfWeek(startOfMonth(currentDate))
    const endDate = endOfWeek(endOfMonth(currentDate))
    const today = new Date()

    let day = startDate
    while (day <= endDate) {
      days.push(day)
      day = addDays(day, 1)
    }

    return (
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const ticketsGroupByDate = ticketList?.[format(day, 'yyyy-MM-dd')] || []

          return (
            <View
              key={index}
              style={[
                styles.day,
                !isSameMonth(day, currentDate) && styles.inactiveDay,
                Boolean(selectedDate) && isSameDay(day, selectedDate!) && styles.selectedDay,
                {height: 88},
              ]}>
              <Text style={[styles.dayText, isSameDay(day, today) && styles.today]}>{format(day, 'd')}</Text>
              <MatchResultCell
                onPress={() => dayClick(day)}
                data={ticketsGroupByDate} //
              />
            </View>
          )
        })}
      </View>
    )
  }

  const handleMonthYearChange = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1)
    setCurrentDate(newDate)
    setIsModalVisible(false)
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>원하시는 날짜를 선택해주세요</Text>
            <View style={styles.datePickerContainer}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={itemValue => setSelectedYear(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}>
                {Array.from({length: 10}, (_, i) => (
                  <Picker.Item key={i} label={`${2020 + i}년`} value={2020 + i} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={itemValue => setSelectedMonth(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}>
                {Array.from({length: 12}, (_, i) => (
                  <Picker.Item //
                    key={i}
                    label={format(new Date(0, i), 'LLLL', {locale: ko})}
                    value={i}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleMonthYearChange}>
                <Text style={styles.confirmText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
    marginBottom: 16,
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
    marginBottom: 8,
  },
  dayOfWeekText: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  day: {
    width: '14.28%',
    padding: 4,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'transparent',
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
    borderColor: '#000000',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginBottom: 28,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 13,
    marginTop: 40,
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

export default Calendar
