import {z} from 'zod'

const TicketCalendarLogSchema = z.object({
  id: z.number(), // 5
  date: z.string(), // '2025-03-22'
  result: z.string(), // '승리'
  writer_id: z.number(), // 5
  game_id: z.number(), // 1
  opponent: z.object({
    id: z.number(), // 7
    name: z.string(), // '롯데 자이언츠'
  }),
  ballpark: z.object({
    id: z.number(), // 1
    name: z.string(), // '잠실야구장'
    team_id: z.number(), // 3
  }),
})

type TicketCalendarLog = z.infer<typeof TicketCalendarLogSchema>

const TicketCalendarLogReqSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}$/, {message: 'YYYY-MM 형식이어야 합니다'}),
  user_id: z.number(),
})

type TicketCalendarLogReq = z.infer<typeof TicketCalendarLogReqSchema>

export {TicketCalendarLogSchema, type TicketCalendarLog, TicketCalendarLogReqSchema, type TicketCalendarLogReq}
