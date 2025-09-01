import {useQuery, useQueryClient} from '@tanstack/react-query'
import {TicketRepository} from '@/feature/ticket/api/TicketRepository'
import ApiClient from '@/api'
import * as schema from '@/feature/ticket/types'

const getQueryKey = (currentYearMonth: string, targetId: number) => ['tickets', currentYearMonth, targetId]

const useMonthlyTicket = ({currentYearMonth, targetId}: {currentYearMonth: string; targetId: number}) => {
  const ticketRepository = new TicketRepository(ApiClient)
  const queryClient = useQueryClient()

  const {data: ticketList, isLoading: isTicketListLoading} = useQuery({
    queryKey: getQueryKey(currentYearMonth, targetId),
    queryFn: () =>
      ticketRepository.getTicketCalendarLog({
        date: currentYearMonth,
        user_id: targetId,
      }),
    enabled: Boolean(currentYearMonth && targetId),
  })

  // 캐시된 티켓 목록 조회
  const getCachedTicketsByDate = (currentYearMonth: string) => {
    return queryClient.getQueryData<schema.TicketCalendarLog[]>(getQueryKey(currentYearMonth, targetId))
  }

  // 티켓 목록 캐시 Prefetch
  const prefetchTicketsByDate = async (currentYearMonth: string) => {
    await queryClient.prefetchQuery({
      queryKey: getQueryKey(currentYearMonth, targetId),
      queryFn: () =>
        ticketRepository.getTicketCalendarLog({
          date: currentYearMonth,
          user_id: targetId,
        }),
    })
    return getCachedTicketsByDate(currentYearMonth)
  }

  return {ticketList, isTicketListLoading, getCachedTicketsByDate, prefetchTicketsByDate}
}

export {useMonthlyTicket}
