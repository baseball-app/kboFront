export type TicketCalendarLog = {
  id: number // 5
  date: string // '2025-03-22'
  result: string // '승리'
  writer_id: number // 5
  game_id: number // 1
  opponent: {
    id: number // 7
    name: string // '롯데 자이언츠'
  }
  ballpark: {
    id: number // 1
    name: string // '잠실야구장'
    team_id: number // 3
  }
}
