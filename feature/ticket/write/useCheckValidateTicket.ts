import useProfile from '@/hooks/my/useProfile'
import dayjs from 'dayjs'
import {useMonthlyTicket} from '../monthly/useMonthlyTicket'
import {groupBy} from '@/utils/groupBy'

class MatchScreenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MatchScreenError'
  }
}

const TICKET_COUNT_THRESHOLD = 2

const useCheckValidateTicket = ({selectedDate}: {selectedDate: Date}) => {
  const {profile} = useProfile()
  const {getCachedTicketsByDate, prefetchTicketsByDate} = useMonthlyTicket({
    currentYearMonth: dayjs(selectedDate).format('YYYY-MM'),
    targetId: Number(profile?.id),
  })

  // 해당 날짜의 티켓 갯수가 기준 이상인지 확인하는 함수
  const isTicketCountOverThreshold = (threshold: number) => {
    return async (date: string) => {
      const ticketList = await (() => {
        const yearMonth = dayjs(date).format('YYYY-MM')
        return getCachedTicketsByDate(yearMonth) ?? prefetchTicketsByDate(yearMonth)
      })()
      const ticketListByDate = groupBy(ticketList || [], item => item.date)

      return (ticketListByDate[date] ?? []).length >= threshold
    }
  }

  // 해당 날짜의 티켓이 2개 이상이면 false
  const isTicketCountOverByDate = isTicketCountOverThreshold(TICKET_COUNT_THRESHOLD)

  const validateTicketCount = async (targetDate: string) => {
    const isOver = await isTicketCountOverByDate(targetDate)
    if (isOver) throw new MatchScreenError('오늘의 야구 티켓은 최대 2번까지만\n작성하실 수 있어요!')
  }

  return {validateTicketCount}
}

export {useCheckValidateTicket, MatchScreenError}
