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

//
type ReactionType = 'clap' | 'confused' | 'dislike' | 'good' | 'laugh' | 'petulance' | 'point_up' | 'rage' | 'wink'

type Reaction = Record<ReactionType, number>

type TicketDetail = {
  id: number
  date: string // '2024-03-22'
  result: string // '승리'
  weather: string // '흐림'
  is_ballpark: boolean
  score_our: number
  score_opponent: number
  starting_pitchers: string // '고우석'
  gip_place: string // 'ㅇㅇ'
  image: string // '/https%3A/kboapp-cdn.s3.amazonaws.com/5/20250303_siPoBDqgSie2V2QRReTZJQ'
  food: string // 'string'
  memo: string // 'string'
  is_homeballpark: boolean
  created_at: string // '2025-03-03T10:56:30.470226+09:00'
  updated_at: string // '2025-03-03T10:56:30.892490+09:00'
  ballpark: number
  game: number
  opponent: number
  writer: number

  hometeam_id: string
  awayteam_id: string

  only_me: boolean
  is_double: boolean
  direct_yn: boolean
  favorite: boolean
} & Reaction

export {
  TicketCalendarLogSchema,
  type TicketCalendarLog,
  TicketCalendarLogReqSchema,
  type TicketCalendarLogReq,
  type TicketDetail,
  type Reaction,
  type ReactionType,
}
