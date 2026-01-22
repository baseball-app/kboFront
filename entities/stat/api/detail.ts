import ApiClient from '@/api';
import type {
  WinPercentResponse,
  WeekdayMostWinResponse,
  LongestWinningStreakResponse,
  MostWinTeamResponse,
  BallparkMostViewResponse,
  WinRateCalculationResponse,
} from '../types';

/**
 * 승률 조회 (직관/집관)
 * @param isBallpark true: 직관승률, false: 집관승률
 */
export const getWinPercent = (isBallpark: boolean) => {
  return ApiClient.get<WinPercentResponse>('/tickets/win_percnet/', {
    is_ballpark: isBallpark,
  });
};

/**
 * 나의 승요 요일 조회
 */
export const getWeekdayMostWin = () => {
  return ApiClient.get<WeekdayMostWinResponse>('/tickets/weekday_most_win/');
};

/**
 * 나의 최대 연승 조회
 */
export const getLongestWinningStreak = () => {
  return ApiClient.get<LongestWinningStreakResponse>('/tickets/longest_winning_streak/');
};

/**
 * 나의 최다 승리 구단 조회
 */
export const getMostWinTeam = () => {
  return ApiClient.get<MostWinTeamResponse>('/tickets/opponent_most_win/');
};

/**
 * 나의 최다 관람 구장 조회
 */
export const getBallparkMostView = () => {
  return ApiClient.get<BallparkMostViewResponse>('/tickets/ballpark_most_view/');
};

/**
 * 티켓 경기 결과 조회
 */
export const getWinRateCalculation = () => {
  return ApiClient.get<WinRateCalculationResponse>('/tickets/win_rate_calculation/');
};
