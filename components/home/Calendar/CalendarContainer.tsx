import React, {useEffect, useRef, useState} from 'react'
import {CalendarView} from './CalendarView'
import {TicketCalendarLog} from './type'
import dayjs from 'dayjs'
import {usePathname, useRouter} from 'expo-router'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {TicketDetail} from '@/hooks/match/useTicketDetail'
import ApiClient from '@/api'
import {Match} from '@/hooks/match/useMatch'
import {useAnalyticsStore} from '@/analytics/event'
import useProfile from '@/hooks/my/useProfile'
import {groupBy} from '@/utils/groupBy'
import {Dimensions, FlatList, View} from 'react-native'

type Props = {
  targetId: number
}

const width = Dimensions.get('window').width - 48

export const START_DATE = dayjs('2024-01-01')
export const END_DATE = dayjs(`${dayjs().year() + 1}-12-31`)

const CalendarContainer = ({targetId}: Props) => {
  const {profile} = useProfile()
  const isMyDiary = profile.id === targetId

  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const queryClient = useQueryClient()

  const router = useRouter()
  const pathname = usePathname()

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const currentYearMonth = dayjs(selectedDate).format('YYYY-MM')

  const {} = useQuery({
    queryKey: ['tickets', currentYearMonth, targetId],
    queryFn: async () => {
      return ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
        date: currentYearMonth,
        user_id: targetId,
      }).then(data => groupBy(data, item => item.date))
    },
    enabled: Boolean(currentYearMonth && targetId),
  })

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
    const targetDate = dayjs(pDay).format('YYYY-MM-DD')
    const ticketsGroupByDate = []
    // ticketList?.[targetDate] || []

    if (ticketsGroupByDate?.length) {
      // 해당 날짜 직관일기 prefetch
      prefetchTicket(targetDate).finally(() => {
        router.push({
          pathname: '/write/todayTicketCard', //
          params: {date: targetDate, target_id: targetId},
        })
      })
      return
    }

    // 없다면 작성화면으로 이동인데, 내 다이어리일 때에만 이동할 수 있어야 함
    if (isMyDiary) {
      // 해당 날짜 경기 일정 prefetch
      prefetchMatchList(targetDate).finally(() => {
        // ga 데이터 수집용도
        setScreenName(pathname)
        setDiaryCreate('메인 버튼')
        // ga 데이터 수집용도
        router.push({pathname: '/write', params: {date: targetDate}})
      })
    }
  }

  const [list, setList] = useState(
    Array.from({length: 3}, (_, i) =>
      dayjs()
        .set('date', 1)
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0)
        .add(i - 1, 'month')
        .toDate(),
    ),
  )

  const [scrollDirection, setScrollDirection] = useState<'front' | 'back' | null>(null)
  const [isSync, setIsSync] = useState(true)
  const throttle = useRef(false)
  const flatListRef = useRef<FlatList>(null)

  const setAsync = (func: () => void) => setTimeout(func, 0)
  const moveToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: false})
  }

  const onChangeList = (func: (list: Date[]) => Date[]) => {
    if (throttle.current) return
    throttle.current = true

    setList(func)

    setTimeout(() => {
      throttle.current = false
    }, 200)
  }

  const onAddFrontDate = (targetDate: Date) => {
    setScrollDirection('front')
    setSelectedDate(targetDate)
    onChangeList(prev => {
      const newList = Array.from({length: Math.ceil(Math.abs(dayjs(targetDate).diff(prev[0], 'month', true))) + 1}) //
        .map((_, i) =>
          dayjs(targetDate)
            .add(i - 1, 'month')
            .toDate(),
        )

      return newList.concat(prev).filter(date => !dayjs(date).isBefore(START_DATE))
    })
  }

  const onAddBackDate = (targetDate: Date) => {
    setScrollDirection('back')
    setSelectedDate(targetDate)
    onChangeList(prev => {
      const newList = Array.from({length: dayjs(targetDate).diff(prev.at(-1), 'month') + 1}) //
        .map((_, i) =>
          dayjs(prev.at(-1))
            .add(i + 1, 'month')
            .toDate(),
        )

      return prev.concat(newList).filter(date => !dayjs(date).isAfter(END_DATE))
    })
  }

  const onChangeDateByHeader = (date: Date) => {
    setSelectedDate(date)
    setIsSync(false)

    const targetIndex = list.findIndex(item => dayjs(item).format('YYYY-MM') === dayjs(date).format('YYYY-MM'))
    const hasTargetDate = targetIndex !== -1

    // 이미 존재하는 날짜라면 그대로 이동
    if (hasTargetDate) {
      moveToIndex(targetIndex)
      return
    }

    // 존재하지 않는 날짜라면 추가 후 이동
    // 날짜가 오늘보다 앞쪽이라면 앞쪽에 추가 (사이사이도 다 추가해야 함)
    // 날짜가 오늘보다 뒤쪽이라면 뒤쪽에 추가 (사이사이도 다 추가해야 함)
    // 기준이 오늘인 이유는 기본적으로 오늘 날짜 -1, 0, +1 이렇게 설정되어 있기 때문임
    const targetDate = dayjs(date).toDate()
    if (dayjs(targetDate).isBefore(dayjs())) {
      onAddFrontDate(targetDate)
    } else {
      onAddBackDate(targetDate)
    }
  }

  useEffect(() => {
    if (!scrollDirection) return
    setScrollDirection(null)
    if (scrollDirection === 'front') {
      const isSameWithStart = dayjs(selectedDate).format('YYYY-MM') === dayjs(START_DATE).format('YYYY-MM')
      const index = isSameWithStart ? 0 : 1
      // 2020-01이라면 0번으로 이동
      isSync ? moveToIndex(index) : setAsync(() => moveToIndex(index))
    } else {
      const isSameWithEnd = dayjs(selectedDate).format('YYYY-MM') === END_DATE.format('YYYY-MM')
      const index = isSameWithEnd ? list.length - 1 : list.length - 2
      // 2029-12이라면 마지막 인덱스로 이동
      isSync ? moveToIndex(index) : setAsync(() => moveToIndex(index))
    }
  }, [list])

  const getTicketList = (yearMonth: string) => {
    return queryClient.getQueryData<Record<string, TicketCalendarLog[]>>(['tickets', yearMonth, targetId])
  }

  const prefetchTicketList = (date: Date) => {
    console.log('prefetchTicketList', date)
    const yearMonth = dayjs(date).format('YYYY-MM')
    const ticketList = getTicketList(yearMonth)
    if (!ticketList) {
      queryClient.prefetchQuery({
        queryKey: ['tickets', yearMonth, targetId],
        queryFn: () => {
          return ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
            date: yearMonth,
            user_id: targetId,
          })
        },
      })
    }
  }
  useEffect(() => {
    list.forEach(item => {
      const yearMonth = dayjs(item).format('YYYY-MM')
      const ticketList = getTicketList(yearMonth)
      if (!ticketList) {
        prefetchTicketList(item)
      }
    })
  }, [list])

  return (
    <View style={{width: width}}>
      <FlatList
        ref={flatListRef}
        data={list}
        initialNumToRender={3}
        snapToInterval={width}
        decelerationRate="fast"
        snapToAlignment="center"
        initialScrollIndex={list.findIndex(
          item => dayjs(item).format('YYYY-MM') === dayjs(selectedDate).format('YYYY-MM'),
        )}
        onStartReached={() => {
          if (dayjs(list[0]).format('YYYY-MM') === dayjs(START_DATE).format('YYYY-MM')) return
          onAddFrontDate(dayjs(list[0]).toDate())
          setIsSync(true)
        }}
        onEndReached={() => {
          if (dayjs(list.at(-1)).format('YYYY-MM') === END_DATE.format('YYYY-MM')) return
          onAddBackDate(dayjs(list.at(-1)).toDate())
          setIsSync(true)
        }}
        onStartReachedThreshold={0.1}
        onEndReachedThreshold={0.1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({item}) => {
          const ticketList = getTicketList(dayjs(item).format('YYYY-MM'))

          return (
            <CalendarView
              date={item} //
              setDate={onChangeDateByHeader}
              isLoading={!ticketList}
              ticketList={ticketList}
              onClick={dayClick}
            />
          )
        }}
        keyExtractor={(item: Date) => item.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={3}
      />
    </View>
  )
}

export {CalendarContainer}
