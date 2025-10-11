import WheelPicker2 from '@/components/WheelPicker2'
import {AnimatedPressable} from '@/shared'
import {BottomSheet} from '@/shared/ui/BottomSheet'
import {Ionicons} from '@expo/vector-icons'
import dayjs from 'dayjs'
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'

type MatchCalendarHeaderProps = {
  prevMonth: () => void
  nextMonth: () => void
  currentDate: Date
  setCurrentDate: (date: Date) => void
}

const WeekCalendarController = ({setCurrentDate, prevMonth, nextMonth, currentDate}: MatchCalendarHeaderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleMonthYearChange = () => {
    setIsModalVisible(prev => !prev)
  }

  return (
    <>
      <_HeaderController
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        currentDate={currentDate}
        openBottomSheet={handleMonthYearChange}
      />
      <_BottomSheetController
        currentDate={currentDate}
        isModalVisible={isModalVisible}
        setCurrentDate={setCurrentDate}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  )
}

const _HeaderController = ({
  prevMonth,
  nextMonth,
  currentDate,
  openBottomSheet,
}: Omit<MatchCalendarHeaderProps, 'setCurrentDate'> & {openBottomSheet: () => void}) => {
  return (
    <View style={styles.header}>
      <PrevWeekButton onPress={prevMonth} />
      <TouchableOpacity style={[styles.headerTextContainer, {width: 100}]} onPress={openBottomSheet}>
        <Text style={styles.headerText}>{dayjs(currentDate).format('YYYY.MM')}</Text>
      </TouchableOpacity>
      <NextWeekButton onPress={nextMonth} />
    </View>
  )
}

const PrevWeekButton = memo(({onPress}: {onPress: () => void}) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    }
  })

  const handlePressIn = useCallback(() => {
    'worklet'
    scale.value = withTiming(0.85, {duration: 80})
  }, [])

  const handlePressOut = useCallback(() => {
    'worklet'
    scale.value = withTiming(1, {duration: 80})
  }, [])

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.headerTextContainer, animatedStyle]}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </AnimatedPressable>
  )
})

const NextWeekButton = memo(({onPress}: {onPress: () => void}) => {
  return (
    <AnimatedPressable onPress={onPress} style={styles.headerTextContainer}>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </AnimatedPressable>
  )
})

const _BottomSheetController = ({
  isModalVisible,
  setIsModalVisible,
  setCurrentDate,
  currentDate,
}: {
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  setCurrentDate: (date: Date) => void
  currentDate: Date
}) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1)
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate())

  useEffect(() => {
    setSelectedYear(currentDate.getFullYear())
    setSelectedMonth(currentDate.getMonth() + 1)
    setSelectedDay(currentDate.getDate())
  }, [currentDate])

  const selectedDayjs = useMemo(() => dayjs(`${selectedYear}-${selectedMonth}-01`), [selectedYear, selectedMonth])
  const dayList = useMemo(
    () => Array.from({length: selectedDayjs.daysInMonth()}, (_, i) => `${i + 1}일`),
    [selectedDayjs],
  )

  return (
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
  )
}

export {WeekCalendarController}

const styles = StyleSheet.create({
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
  datePickerContainer: {
    flexDirection: 'row',
    height: 134,
    overflow: 'hidden',
    justifyContent: 'space-between',
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
