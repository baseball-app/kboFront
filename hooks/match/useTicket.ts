import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import React, {useEffect} from 'react'
import {Match} from './useMatch'
import {usePathname, useRouter} from 'expo-router'

const useTicket = () => {
  const router = useRouter()

  const writeStore = useDailyWriteStore()

  const pathname = usePathname()
  const {setSelectedDate, setSelectedMatch} = writeStore

  /**
   * 경기일정에서 티켓 작성 페이지로 이동
   * @param match 매치 정보
   * @param date 날짜
   */
  const moveToWriteTicket = (date: Date, match: Match | null) => {
    setSelectedMatch(match)
    setSelectedDate(date)
    router.push('/write')
  }

  return {
    moveToWriteTicket,
    ...writeStore,
  }
}

export default useTicket
