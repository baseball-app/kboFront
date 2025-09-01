import ApiClient from '@/api'
import * as schema from '../types'

/**
 * 월별 티켓 목록 조회
 * @param req {date: 'YYYY-MM', user_id: number}
 */
export const getTicketCalendarLog = async (req: schema.TicketCalendarLogReq) => {
  return ApiClient.get<schema.TicketCalendarLog[]>('/tickets/ticket_calendar_log/', req)
}
