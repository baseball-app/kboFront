import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Modal, Button} from 'react-native'
import {format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from 'date-fns'
import {Picker} from '@react-native-picker/picker'
import {Ionicons} from '@expo/vector-icons'
import {ko} from 'date-fns/locale'
import {useRouter} from 'expo-router'
import {DAYS_OF_WEEK} from '@/constants/day'

const moodColors = {
  happy: 'green',
  sad: 'blue',
  neutral: 'orange',
  angry: 'red',
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const router = useRouter()
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
    router.navigate('/write')
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
          const mood = getMoodForDate(day) // Replace with your logic to get the mood for the date
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                !isSameMonth(day, currentDate) && styles.inactiveDay,
                Boolean(selectedDate) && isSameDay(day, selectedDate!) && styles.selectedDay,
              ]}
              onPress={() => dayClick(day)}>
              <Text style={[styles.dayText, isSameDay(day, today) && styles.today]}>{format(day, 'd')}</Text>
              <View style={[styles.moodContainer, mood && {backgroundColor: moodColors[mood]}]}>
                {/* <Text style={styles.moodIcon}>{mood && moodIcons[mood]}</Text> */}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const getMoodForDate = (date: Date) => {
    // Replace this with your logic to get the mood for the date
    const day = date.getDate()
    if (day % 5 === 0) return 'angry'
    if (day % 3 === 0) return 'neutral'
    if (day % 2 === 0) return 'sad'
    return 'happy'
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
  container: {
    padding: 16,
  },
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
  },
  day: {
    width: '14.28%',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    textAlign: 'center',
  },
  selectedDay: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
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
    height: 134,
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
