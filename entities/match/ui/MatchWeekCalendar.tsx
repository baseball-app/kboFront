import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {DAYS_OF_WEEK} from '@/constants/day'
import dayjs from 'dayjs'
import {BottomSheet} from '@/shared/ui'
import WheelPicker2 from '@/components/WheelPicker2'
import {WeekCalendarController} from './WeekCalendarController'

type Props = {
  onChange: (date: Date) => void
  value: Date
}

type MatchCalendarHeaderProps = {
  prevMonth: () => void
  nextMonth: () => void
  currentDate: Date
  setCurrentDate: (date: Date) => void
}

const MatchCalendarHeader = ({setCurrentDate, prevMonth, nextMonth, currentDate}: MatchCalendarHeaderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1)
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate())

  useEffect(() => {
    setSelectedYear(currentDate.getFullYear())
    setSelectedMonth(currentDate.getMonth() + 1)
    setSelectedDay(currentDate.getDate())
  }, [currentDate])

  const handleMonthYearChange = () => {
    setIsModalVisible(prev => !prev)
  }

  const selectedDayjs = dayjs(`${selectedYear}-${selectedMonth}-01`)
  const dayList = Array.from({length: selectedDayjs.daysInMonth()}, (_, i) => `${i + 1}일`)

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.headerTextContainer}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerTextContainer, {width: 100}]} onPress={handleMonthYearChange}>
          <Text style={styles.headerText}>{dayjs(currentDate).format('YYYY.MM')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextMonth} style={styles.headerTextContainer}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <BottomSheet isOpen={isModalVisible} duration={250} height={350}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>원하시는 날짜를 선택해주세요</Text>
          <View style={styles.datePickerContainer}>
            <WheelPicker2
              items={Array.from({length: 10}, (_, i) => `${2020 + i}년`)}
              itemHeight={50}
              initialItem={`${selectedYear}년`}
              onItemChange={item => setSelectedYear(Number(item.replaceAll(/\D/g, '')))}
              containerStyle={{width: '30%'}}
            />
            <WheelPicker2
              items={Array.from({length: 12}, (_, i) => `${i + 1}월`)}
              itemHeight={50}
              initialItem={`${selectedMonth}월`}
              onItemChange={item => setSelectedMonth(Number(item.replaceAll(/\D/g, '')))}
              containerStyle={{width: '30%'}}
            />
            <WheelPicker2
              items={dayList}
              itemHeight={50}
              initialItem={`${selectedDay}일`}
              onItemChange={item => setSelectedDay(Number(item.replaceAll(/\D/g, '')))}
              containerStyle={{width: '30%'}}
            />
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setCurrentDate(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).toDate())
                setIsModalVisible(false)
              }}>
              <Text style={styles.confirmText}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  )
}

type MatchCalendarBodyProps = {
  currentDate: Date
  selectedDate: Date
  onChange: (date: Date) => void
}

const MatchCalendarBody = ({currentDate, selectedDate, onChange}: MatchCalendarBodyProps) => {
  const days = []
  const startDate = dayjs(currentDate).startOf('week') // 주의 첫 번째 날을 가져옴

  // 7일 동안의 날짜를 요일과 함께 표시
  for (let i = 0; i < 7; i++) {
    const day = dayjs(startDate).add(i, 'day')
    const isSelected = dayjs(day).isSame(selectedDate, 'date') // 선택된 날짜 여부
    const today = dayjs()
    const isToday = dayjs(day).isSame(today)
    const isTodayAndNotSelected = isToday && !isSelected // 오늘이지만 선택되지 않은 경우

    days.push(
      <TouchableOpacity
        key={i}
        style={[styles.dayContainer, isSelected && styles.selectedDay, isTodayAndNotSelected && styles.todayDay]}
        onPress={() => onChange(day.toDate())}>
        <Text
          style={[
            styles.dayOfWeekText,
            isSelected ? styles.selectedText : isToday ? styles.todayText : styles.defaultText, // 선택된 날짜이면 선택된 스타일, 오늘이면 오늘 스타일, 기본이면 기본 스타일 적용
          ]}>
          {DAYS_OF_WEEK[i]}
        </Text>
        <Text
          style={[
            styles.dayText,
            isSelected ? styles.selectedText : isToday ? styles.todayText : styles.defaultText, // 선택된 날짜이면 선택된 스타일, 오늘이면 오늘 스타일, 기본이면 기본 스타일 적용
            Platform.OS === 'android' ? {paddingLeft: '15%'} : {},
          ]}>
          {dayjs(day).format('D')} {/* 날짜 */}
        </Text>
      </TouchableOpacity>,
    )
  }

  return <View style={styles.weekRow}>{days}</View>
}

const MatchWeekCalendar = ({onChange, value}: Props) => {
  // 현재 캘린더가 보고 있는 날짜
  const [currentDate, setCurrentDate] = useState(new Date())

  const prevMonth = useCallback(() => setCurrentDate(currentDate => dayjs(currentDate).add(-1, 'week').toDate()), [])
  const nextMonth = useCallback(() => setCurrentDate(currentDate => dayjs(currentDate).add(1, 'week').toDate()), [])

  const handleChange = useCallback(
    (date: Date) => {
      setCurrentDate(date)
      onChange(date)
    },
    [onChange],
  )

  return (
    <View style={styles.container}>
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
          setCurrentDate(date)
          onChange(date)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18.2,
    textAlign: 'center',
    width: '100%',
    color: '#000',
  },
  singleRowDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    lineHeight: 25.2,
    fontWeight: '500',
    minWidth: 20,
    width: '100%',
    textAlign: 'center',
  },
  inactiveDay: {
    opacity: 0.5,
  },

  selectedDay: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
    backgroundColor: '#000',
  },
  moodContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 4,
  },
  datePickerContainer: {
    flexDirection: 'row',
    height: 134,
    overflow: 'hidden',
    justifyContent: 'space-between',
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
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    position: 'absolute',
    top: 4,
    right: 4,
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
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: '1%',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    flexDirection: 'column',
    gap: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 4,
    flex: 1,
  },
  selectedText: {
    color: '#fff',
  },
  todayDay: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
    borderColor: '#55524E',
  },
  todayText: {
    color: '#000',
  },
  defaultText: {
    color: '#000',
  },
})

export {MatchWeekCalendar}
