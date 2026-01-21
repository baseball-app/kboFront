import WheelPicker2 from '@/components/WheelPicker2'
import {color_token} from '@/constants/theme'
import {Pressable, size} from '@/shared'
import {Button, Txt} from '@/shared/ui'
import {BottomSheet} from '@/shared/ui/BottomSheet'
import {Ionicons} from '@expo/vector-icons'
import dayjs from 'dayjs'
import React, {useEffect, useMemo, useState} from 'react'
import {StyleSheet, View} from 'react-native'

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
  )
}

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
    <BottomSheet isOpen={isModalVisible} duration={350} height={320}>
      <View style={styles.modalContent}>
        <Txt weight="bold" style={styles.modalTitle}>
          원하시는 날짜를 선택해주세요
        </Txt>
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
          <Button
            type="cancel"
            style={{flex: 1, paddingVertical: size(12), height: size(46)}}
            onPress={() => setIsModalVisible(false)}>
            취소
          </Button>
          <Button
            type="primary"
            style={{flex: 1, paddingVertical: size(12), height: size(46)}}
            onPress={() => {
              setCurrentDate(dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).toDate())
              setIsModalVisible(false)
            }}>
            완료
          </Button>
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
  datePickerContainer: {
    flexDirection: 'row',
    height: size(134),
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  modalContent: {
    width: '100%',
    padding: size(24),
    backgroundColor: 'white',
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    marginBottom: size(28),
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: size(13),
    marginTop: size(40),
    marginBottom: size(16),
  },
})
