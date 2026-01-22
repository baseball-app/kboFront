import {groupBy} from '@/shared';
import {TicketCalendarLog} from '../types';

class MatchScreenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MatchScreenError';
  }
}

const TICKET_COUNT_THRESHOLD = 2;

const useCheckValidateTicket = () => {
  // 해당 날짜의 티켓 갯수가 기준 이상인지 확인하는 함수
  const isTicketCountOverThreshold = (threshold: number) => {
    return (ticketList: TicketCalendarLog[], date: string) => {
      const ticketListByDate = groupBy(ticketList || [], item => item.date);
      return (ticketListByDate[date] ?? []).length >= threshold;
    };
  };

  return {isCanNotWriteTicket: isTicketCountOverThreshold(TICKET_COUNT_THRESHOLD)};
};

export {useCheckValidateTicket, MatchScreenError, TICKET_COUNT_THRESHOLD};
