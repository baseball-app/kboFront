import {useQueries} from '@tanstack/react-query'
import {DAYS_OF_WEEK} from '@/constants/day'
import {
  getWinPercent,
  getWeekdayMostWin,
  getLongestWinningStreak,
  getMostWinTeam,
  getBallparkMostView,
  getWinRateCalculation,
} from '../api'

const useMyStat = () => {
  const {data, isLoading, isSuccess} = useQueries({
    queries: [
      {
        queryKey: ['myStat', 'win_site_percent'],
        staleTime: 1000 * 20,
        // 직관승률
        queryFn: () => getWinPercent(true),
      },
      {
        queryKey: ['myStat', 'win_home_percent'],
        staleTime: 1000 * 20,
        // 집관승률
        queryFn: () => getWinPercent(false),
      },
      {
        queryKey: ['myStat', 'weekday_most_win'],
        staleTime: 1000 * 20,
        // 나의 승요 요일
        queryFn: () => getWeekdayMostWin(),
      },
      {
        queryKey: ['myStat', 'longest_winning_streak'],
        staleTime: 1000 * 20,
        // 나의 최대 연승
        queryFn: () => getLongestWinningStreak(),
      },
      {
        queryKey: ['myStat', 'most_win_team'],
        staleTime: 1000 * 20,
        // 나의 최다 승리 구단
        queryFn: () => getMostWinTeam(),
      },
      {
        queryKey: ['myStat', 'ballpark_most_view'],
        staleTime: 1000 * 20,
        // 나의 최다 관람 구장
        queryFn: () => getBallparkMostView(),
      },
      {
        queryKey: ['myStat', 'win_rate_calculation'],
        staleTime: 1000 * 20,
        // 티켓 경기 결과
        queryFn: () => getWinRateCalculation(),
      },
    ],
    combine(result) {
      const [
        winSitePercent,
        winHomePercent,
        weekdayMostWin,
        longestWinningStreak,
        mostWinTeam,
        mostWatchStadium,
        winRateCalculation,
      ] = result

      const isLoading = result.some(item => item.isLoading)
      const isSuccess = result.every(item => item.isSuccess)

      const weekdayMostWinDay = (() => {
        const day = weekdayMostWin?.data?.most_wins_day
        if (day === undefined || day === null) return '-'
        return DAYS_OF_WEEK[Number(day)]
      })()

      const longestWinningStreakText = (() => {
        const streak = longestWinningStreak?.data?.longest_winning_streak
        if (streak === undefined || streak === null) return '-'
        return `${streak}연승`
      })()

      return {
        data: {
          // 직관승률
          winSitePercent: winSitePercent?.data?.win_percent ?? 0,
          // 집관승률
          winHomePercent: winHomePercent?.data?.win_percent ?? 0,
          // 나의 승요 요일
          weekdayMostWin: weekdayMostWinDay,
          // 나의 최대 연승
          longestWinningStreak: longestWinningStreakText,
          // 나의 최다 승리 구단
          mostWinTeam: mostWinTeam?.data?.most_wins_opponent ?? '-',
          // 나의 최다 관람 구장
          mostWatchStadium: mostWatchStadium.data?.most_wins_ballpark ?? '-',
          // 티켓 경기 결과
          ballparkWinRateCalculation: winRateCalculation?.data?.is_ballpark_win_rate ?? {
            win_count: 0,
            loss_count: 0,
            draw_count: 0,
            cancel_count: 0,
          },
          notBallparkWinRateCalculation: winRateCalculation?.data?.is_not_ballpark_win_rate ?? {
            win_count: 0,
            loss_count: 0,
            draw_count: 0,
            cancel_count: 0,
          },
        },
        isLoading,
        isSuccess,
      }
    },
  })

  return {
    data,
    isLoading,
    isSuccess,
  }
}

export {useMyStat}
