import ApiClient from '@/api'
import {TicketCalendarLog} from '@/components/home/Calendar'
import {groupBy} from '@/utils/groupBy'
import {useQuery} from '@tanstack/react-query'
import {format} from 'date-fns'

import {create, StateCreator} from 'zustand'
import useProfile from '../my/useProfile'
import {useEffect, useState} from 'react'
import {usePathname} from 'expo-router'

export interface IDiarySlice {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  userId: number
  setUserId: (userId: number) => void
}

export const diarySlice: StateCreator<IDiarySlice> = set => ({
  currentDate: new Date(),
  setCurrentDate: date => set({currentDate: date}),
  userId: 0,
  setUserId: userId => set({userId}),
})

export const useDiaryStore = create<IDiarySlice>(diarySlice)

const useDiary = () => {
  const {currentDate, setCurrentDate} = useDiaryStore()
  const {profile} = useProfile()

  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    if (!userId && profile.id) setUserId(profile.id)
  }, [userId, profile.id])

  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') setUserId(null)
  }, [])

  const currentYearMonth = format(currentDate, 'yyyy-MM')

  const {data: ticketList} = useQuery({
    queryKey: ['tickets', currentYearMonth, userId],
    queryFn: () =>
      ApiClient.get<TicketCalendarLog[]>('/tickets/ticket_calendar_log/', {
        date: currentYearMonth,
        user_id: userId || profile?.id,
      }),
    enabled: Boolean(currentYearMonth),
    select(data) {
      return groupBy(data, item => item.date)
    },
  })

  return {
    currentDate,
    setCurrentDate,
    setUserId,
    ticketList,
    currentYearMonth,
  }
}

export default useDiary
