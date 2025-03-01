import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import {Match} from './useMatch'
import {useRouter} from 'expo-router'
import {format} from 'date-fns'

const useTicket = () => {
  const router = useRouter()

  const writeStore = useDailyWriteStore()

  /**
   * 경기일정에서 티켓 작성 페이지로 이동
   * @param match 매치 정보
   * @param date 날짜
   */
  const moveToWriteTicket = (date: Date, match: Match | null) => {
    router.push({
      pathname: '/write',
      params: {
        matchId: match?.id,
        date: format(date, 'yyyy-MM-dd'),
      },
    })
  }

  return {
    moveToWriteTicket,
    ...writeStore,
  }
}

export default useTicket
