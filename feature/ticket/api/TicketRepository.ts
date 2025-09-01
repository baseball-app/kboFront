import ApiClient from '@/api'
import * as schema from '@/feature/ticket/types'

export class TicketRepository {
  constructor(private readonly apiClient: typeof ApiClient) {}

  /**
   * 월별 티켓 목록 조회
   * @param req {date: 'YYYY-MM', user_id: number}
   */
  getTicketCalendarLog = async (req: schema.TicketCalendarLogReq) => {
    return this.apiClient.get<schema.TicketCalendarLog[]>('/tickets/ticket_calendar_log/', req)
  }
}
