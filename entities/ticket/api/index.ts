import ApiClient from '@/api';
import * as schema from '../types';
import {Reaction} from '../types';

/**
 * 월별 티켓 목록 조회
 * @param req {date: 'YYYY-MM', user_id: number}
 */
export const getTicketCalendarLog = async (req: schema.TicketCalendarLogReq) => {
  return ApiClient.get<schema.TicketCalendarLog[]>('/tickets/ticket_calendar_log/', req);
};

/**
 * 티켓 상세 조회
 * @param param0 {id: 티켓 아이디; target_id: 타겟 유저 아이디}
 * @returns
 */
export const findTicketDetailById = async ({id, target_id}: {id: number; target_id: number}) => {
  return ApiClient.get<schema.TicketDetail[]>('/tickets/ticket_detail/', {id, target_id});
};

/**
 * 티켓 상세 조회
 * @param param0 {date: 날짜; target_id: 타겟 유저 아이디}
 * @returns
 */
export const findTicketDetailByDate = async ({date, target_id}: {date: string; target_id: number}) => {
  return ApiClient.get<schema.TicketDetail[]>('/tickets/ticket_detail/', {date, target_id});
};

/**
 * 티켓 반응 조회
 * @param param0 {id: 티켓 아이디}
 * @returns
 */
export const findTicketReaction = async ({id}: {id: number}) => {
  return ApiClient.get<Reaction>(`/tickets/ticket_reaction_view/`, {id});
};

export const findTicketListByTeam = async ({teamId}: {teamId: number}) => {
  const params = (() => {
    // 타구단
    if (teamId === 999) return {is_cheer: false};
    // 팀 선택
    if (teamId) return {team_id: teamId, is_cheer: true};
    // 최애 경기
    return {favorite: true};
  })();

  return ApiClient.get<schema.TicketListByTeam[]>('/tickets/ticket_list/', params);
};
