export type WinPercentResponse = {
  win_percent: number
}

export type WeekdayMostWinResponse = {
  most_wins_day: number | null
}

export type LongestWinningStreakResponse = {
  longest_winning_streak: number
}

export type MostWinTeamResponse = {
  most_wins_opponent: string
}

export type BallparkMostViewResponse = {
  most_wins_ballpark: string
}

export type WinRateRecord = {
  win_count: number
  loss_count: number
  draw_count: number
  cancel_count: number
}

export type WinRateCalculationResponse = Record<'is_ballpark_win_rate' | 'is_not_ballpark_win_rate', WinRateRecord>
