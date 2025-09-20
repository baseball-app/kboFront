import React, {useEffect, useRef, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import {format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay} from 'date-fns'
import {Ionicons} from '@expo/vector-icons'
import {usePathname} from 'expo-router'
import {DAYS_OF_WEEK} from '@/constants/day'
import MatchResultCell from '../MatchResultCell'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import ApiClient from '@/api'
import {TicketDetail} from '@/hooks/match/useTicketDetail'
import {Match} from '@/entities/match'
import WheelPicker from '../WheelPicker'
import {Modal} from '@/components/common/Modal'
import {useAnalyticsStore} from '@/analytics/event'
import SwiperFlatList from 'react-native-swiper-flatlist'
import dayjs from 'dayjs'
import useProfile from '@/hooks/my/useProfile'
import {ROUTES, useAppRouter} from '@/shared'

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
  home: string
  opponent_name: string
}
const dimensions = Dimensions.get('window')
const width = dimensions.width - 48

const RenderDays = ({
  currentDate,
  selectedDate,
  dayClick,
  ticketList,
  isLoading,
  userId,
}: {
  currentDate: Date
  ticketList: Record<string, TicketCalendarLog[]> | null
  selectedDate: Date | null
  dayClick: (day: Date) => void
  isLoading: boolean
  userId: number
}) => {
  const {profile} = useProfile()
  const currentYearMonth = format(currentDate, 'yyyy-MM')
  // const {data: ticketList} = useQuery({
  //   queryKey: ['tickets', currentYearMonth, userId],
  //   queryFn: () => {
  //     return ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
  //       date: currentYearMonth,
  //       user_id: userId || profile?.id,
  //     })
  //   },
  //   enabled: Boolean(currentYearMonth),
  //   select(data) {
  //     return groupBy(data, item => item.date)
  //   },
  // })

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
    <View style={[styles.daysContainer, {width: width}]}>
      {days.map(day => {
        const ticketsGroupByDate = ticketList?.[format(day, 'yyyy-MM-dd')] || []
        // const ticketsGroupByDate = ticketList?.[format(day, 'yyyy-MM-dd')] || []

        return (
          <View
            key={dayjs(day).format('YYYY-MM-DD')}
            style={[
              styles.day,
              !isSameMonth(day, currentDate) && styles.inactiveDay,
              Boolean(selectedDate) && isSameDay(day, selectedDate!) && styles.selectedDay,
              // styles.selectedDay,
              {height: 80},
            ]}>
            <Text style={[styles.dayText, isSameDay(day, today) && styles.today]}>{format(day, 'd')}</Text>
            <MatchResultCell
              isLoading={isLoading}
              onPress={() => dayClick(day)}
              data={ticketsGroupByDate} //
            />
          </View>
        )
      })}
    </View>
  )
}

const Calendar = ({
  isMyDiary,
  targetId,
  currentDate,
  setCurrentDate,
  ticketList,
}: {
  isMyDiary: boolean
  targetId: number
  currentDate: Date
  setCurrentDate: (date: Date) => void
  ticketList: Record<string, TicketCalendarLog[]>
}) => {
  const queryClient = useQueryClient()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const router = useAppRouter()
  const pathname = usePathname()

  const prefetchTicket = async (date: string) => {
    const queryKey = ['ticket', date, targetId]

    if (queryClient.getQueryData<TicketDetail[]>(queryKey)) return

    return queryClient.prefetchQuery({
      queryKey,
      queryFn: () => ApiClient.get<TicketDetail[]>(`/tickets/ticket_detail/`, {date, target_id: targetId}),
    })
  }

  const prefetchMatchList = async (date: string) => {
    const queryKey = ['matchTeam', date]

    if (queryClient.getQueryData<Match[]>(queryKey)) return

    return queryClient.prefetchQuery({
      queryKey,
      queryFn: () =>
        ApiClient.get<Match[]>('/games/', {
          end_date: date,
          start_date: date,
        }),
    })
  }

  const dayClick = (pDay: Date) => {
    setSelectedDate(pDay)

    const targetDate = format(pDay, 'yyyy-MM-dd')
    const ticketsGroupByDate = ticketList?.[targetDate] || []

    if (ticketsGroupByDate?.length) {
      // 해당 날짜 직관일기 prefetch
      prefetchTicket(targetDate).finally(() => {
        router.push(ROUTES.WRITE_TODAY_TICKET_CARD, {date: targetDate, target_id: targetId})
      })
      return
    }

    if (isMyDiary) {
      // 해당 날짜 경기 일정 prefetch
      prefetchMatchList(targetDate).finally(() => {
        // ga 데이터 수집용도
        setScreenName(pathname)
        setDiaryCreate('메인 버튼')
        // ga 데이터 수집용도
        router.push(ROUTES.WRITE, {date: targetDate})
      })
    }
  }

  const handleMonthYearChange = () => {
    const newDate = new Date(`${selectedYear}-${selectedMonth}-01`)
    setCurrentDate(newDate)
    setIsModalVisible(false)
  }

  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(false)
  }, [currentDate.getMonth()])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTextContainer} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.headerText}>{format(currentDate, 'yyyy.MM')}</Text>
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
        <SwiperFlatList
          data={Array.from({length: 101}, (_, i) => i - 50)}
          initialNumToRender={3}
          index={50}
          onChangeIndex={({index}) => {
            setCurrentDate(
              dayjs()
                .add(index - 50, 'month')
                .toDate(),
            )
          }}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          // key={dayjs(currentDate).format('YYYY-MM')}
          renderItem={({item}) => {
            return (
              <View style={{width: width}}>
                <RenderDays
                  isLoading={isLoading}
                  currentDate={dayjs().add(item, 'month').toDate()}
                  ticketList={ticketList}
                  selectedDate={selectedDate}
                  dayClick={dayClick}
                  userId={targetId}
                />
              </View>
            )
          }}
          keyExtractor={(item, index) => item.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {isModalVisible && (
        <Modal key={JSON.stringify(isModalVisible)} visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>원하시는 날짜를 선택해주세요</Text>
              <View style={styles.datePickerContainer}>
                <WheelPicker
                  items={Array.from({length: 10}, (_, i) => `${2020 + i}년`)}
                  itemHeight={42}
                  initValue={`${selectedYear}년`}
                  onItemChange={item => setSelectedYear(Number(item.replaceAll(/\D/g, '')))}
                  containerStyle={{width: '49%'}}
                />
                <WheelPicker
                  items={Array.from({length: 12}, (_, i) => `${i + 1}월`)}
                  itemHeight={42}
                  initValue={`${selectedMonth}월`}
                  onItemChange={item => setSelectedMonth(Number(item.replaceAll(/\D/g, '')))}
                  containerStyle={{width: '49%'}}
                />
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
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
    width: width / 7,
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

export default Calendar
