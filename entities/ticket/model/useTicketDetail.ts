import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import * as api from '../api';

/**
 * 티켓 상세 조회
 * @param id 티켓 id (알림, 티켓박스로 이동했을 때에만 있음)
 * @param date 날짜 (캘린더로 이동했을 때에만 있음)
 * @param target_id 타겟 유저 아이디
 * @returns
 */
const useTicketDetail = ({id, target_id, date}: {id?: number; date?: string; target_id: number}) => {
  // 1차 2차 선택하는 state
  const [ticketIndex, setTicketIndex] = useState<number>(0);
  const onChangeTicket = (index: number) => {
    setTicketIndex(index);
  };

  const {data, isSuccess} = useQuery({
    queryKey: ['ticket', id, target_id],
    queryFn: () => {
      if (!id && !date) throw new Error('id 또는 date가 필요합니다.');
      if (id && date) throw new Error('id와 date는 동시에 사용할 수 없습니다.');
      if (date) return api.findTicketDetailByDate({date, target_id});
      if (id) return api.findTicketDetailById({id, target_id});
    },
    enabled: Boolean(target_id && (id || date)),
    retry: false,
  });

  const ticketDetail = data?.[ticketIndex];

  const hasDoubleTicket = (data?.length || 0) > 1;

  return {
    ticketDetail,
    onChangeTicket,
    ticketIndex,
    isSuccess,
    hasDoubleTicket,
    data,
  };
};

export {useTicketDetail};
