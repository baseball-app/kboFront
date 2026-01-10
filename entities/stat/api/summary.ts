import ApiClient from '@/api'
import type {
  BallparkWinPercentByYearResponse,
  HomeAwayWinPercentByYearResponse,
  NotBallparkWinPercentByYearResponse,
  OpponentWinPercentByYearResponse,
  TotalWinPercentByYearResponse,
} from '../types'

/**
 * 구장별 승률 표출
 */
export const getBallparkWinPercentByYear = ({year}: {year: number}) => {
  return ApiClient.get<BallparkWinPercentByYearResponse>('/statistics/ticket_by_user_ballpark_win_percent/', {
    year,
  })
}

/**
 * 홈/원정별 승률 표출
 */
export const getHomeAwayWinPercentByYear = ({year}: {year: number}) => {
  return ApiClient.get<HomeAwayWinPercentByYearResponse>('/statistics/ticket_home_away_win_percent/', {
    year,
  })
}

/**
 * 집관 승률 표출
 */
export const getNotBallparkWinPercentByYear = ({year}: {year: number}) => {
  return ApiClient.get<NotBallparkWinPercentByYearResponse>('/statistics/ticket_my_home_win_percent/', {
    year,
  })
}

/**
 * 상대구단별 승률 표출
 */
export const getOpponentWinPercentByYear = ({year}: {year: number}) => {
  return ApiClient.get<OpponentWinPercentByYearResponse>('/statistics/ticket_opponent_win_percent/', {
    year,
  })
}

/**
 * 총 승률 표출
 */
export const getTotalWinPercentByYear = ({year}: {year: number}) => {
  return ApiClient.get<TotalWinPercentByYearResponse>('/statistics/ticket_total_percent/', {
    year,
  })
}
