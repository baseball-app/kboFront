import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getTicketCalendarLog} from '../api';
import * as schema from '../types';

const getQueryKey = (currentYearMonth?: string, targetId?: number) => [
  'tickets',
  'monthly',
  currentYearMonth,
  targetId,
];

/**
 * 월별 티켓 목록 조회 훅
 * @param param0 {currentYearMonth: YYYY-MM, targetId: 조회 유저 ID}
 */
const useMonthlyTicket = ({currentYearMonth, targetId}: {currentYearMonth?: string; targetId: number}) => {
  const queryClient = useQueryClient();

  const {data: ticketList, isLoading: isTicketListLoading} = useQuery({
    queryKey: getQueryKey(currentYearMonth, targetId),
    queryFn: () =>
      getTicketCalendarLog({
        date: currentYearMonth!,
        user_id: targetId,
      }),
    enabled: Boolean(currentYearMonth && targetId),
  });

  // 캐시된 티켓 목록 조회
  const getCachedTicketsByDate = (currentYearMonth: string) => {
    return queryClient.getQueryData<schema.TicketCalendarLog[]>(getQueryKey(currentYearMonth, targetId));
  };

  // 티켓 목록 캐시 Prefetch
  const prefetchTicketsByDate = async (currentYearMonth: string): Promise<schema.TicketCalendarLog[] | undefined> => {
    const cachedTickets = getCachedTicketsByDate(currentYearMonth);
    if (cachedTickets) return cachedTickets;

    await queryClient.prefetchQuery({
      queryKey: getQueryKey(currentYearMonth, targetId),
      queryFn: () =>
        getTicketCalendarLog({
          date: currentYearMonth,
          user_id: targetId,
        }),
    });
    return getCachedTicketsByDate(currentYearMonth);
  };

  return {ticketList, isTicketListLoading, getCachedTicketsByDate: prefetchTicketsByDate};
};

export {useMonthlyTicket};
