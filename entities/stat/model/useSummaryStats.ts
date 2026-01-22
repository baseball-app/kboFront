import {useQuery} from '@tanstack/react-query';
import {
  getBallparkWinPercentByYear,
  getHomeAwayWinPercentByYear,
  getNotBallparkWinPercentByYear,
  getOpponentWinPercentByYear,
  getTotalWinPercentByYear,
} from '../api';

/**
 * 구장별 승률 표출
 */
const useBallparkWinPercentByYear = ({year}: {year: number}) => {
  return useQuery({
    queryKey: ['myStat', 'summary', 'ballpark_win_percent', year],
    staleTime: 1000 * 20,
    queryFn: () => getBallparkWinPercentByYear({year}),
  });
};

/**
 * 홈/원정별 승률 표출
 */
const useHomeAwayWinPercentByYear = ({year}: {year: number}) => {
  return useQuery({
    queryKey: ['myStat', 'summary', 'home_away_win_percent', year],
    staleTime: 1000 * 20,
    queryFn: () => getHomeAwayWinPercentByYear({year}),
  });
};

/**
 * 집관 승률 표출
 */
const useNotBallparkWinPercentByYear = ({year}: {year: number}) => {
  return useQuery({
    queryKey: ['myStat', 'summary', 'not_ballpark_win_percent', year],
    staleTime: 1000 * 20,
    queryFn: () => getNotBallparkWinPercentByYear({year}),
  });
};

/**
 * 상대구단별 승률 표출
 */
const useOpponentWinPercentByYear = ({year}: {year: number}) => {
  return useQuery({
    queryKey: ['myStat', 'summary', 'opponent_win_percent', year],
    staleTime: 1000 * 20,
    queryFn: () => getOpponentWinPercentByYear({year}),
  });
};

/**
 * 총 승률 표출
 */
const useTotalWinPercentByYear = ({year}: {year: number}) => {
  return useQuery({
    queryKey: ['myStat', 'summary', 'total_win_percent', year],
    staleTime: 1000 * 20,
    queryFn: () => getTotalWinPercentByYear({year}),
  });
};

export {
  useBallparkWinPercentByYear,
  useHomeAwayWinPercentByYear,
  useNotBallparkWinPercentByYear,
  useOpponentWinPercentByYear,
  useTotalWinPercentByYear,
};
