import ApiClient from '@/api'
import {useQueries} from '@tanstack/react-query'
import {useLogin} from '../auth/useLogin'
import {DAYS_OF_WEEK} from '@/constants/day'

const useMyStat = () => {
  const {user} = useLogin()

  const {data, isLoading, isSuccess} = useQueries({
    queries: [
      {
        queryKey: ['myStat', user, 'win_site_percent'],
        staleTime: 1000 * 20,
        // 직관승률
        queryFn: () => ApiClient.get<number>('/tickets/win_site_percent/'),
      },
      {
        queryKey: ['myStat', user, 'win_home_percent'],
        staleTime: 1000 * 20,
        // 집관승률
        queryFn: () => ApiClient.get<number>('/tickets/win_home_percent/'),
      },
      {
        queryKey: ['myStat', user, 'weekday_most_win'],
        staleTime: 1000 * 20,
        // 나의 승요 요일
        queryFn: () =>
          ApiClient.get<{
            most_wins_day: number | null
          }>('/tickets/weekday_most_win/'),
      },
      {
        queryKey: ['myStat', user, 'longest_winning_streak'],
        staleTime: 1000 * 20,
        // 나의 최대 연승
        queryFn: () =>
          ApiClient.get<{
            longest_winning_streak: number
          }>('/tickets/longest_winning_streak/'),
      },
      {
        queryKey: ['myStat', user, 'most_win_team'],
        staleTime: 1000 * 20,
        // 나의 최다 승리 구단
        queryFn: () =>
          ApiClient.get<{
            most_wins_opponent: string
          }>('/tickets/opponent_most_win/'),
      },
      {
        queryKey: ['myStat', user, 'most_watch_stadium'],
        staleTime: 1000 * 20,
        // 나의 최다 관람 구장
        // TODO: API 연동 필요
        queryFn: () => {
          return '삼성 라이온즈 파크'
        },
      },
      {
        queryKey: ['myStat', user, 'win_rate_calculation'],
        staleTime: 1000 * 20,
        // 티켓 경기 결과
        // TODO: API 연동 필요
        queryFn: () =>
          ApiClient.get<{
            win_count: number
            loss_count: number
            draw_count: number
            cancel_count: number
          }>('/tickets/win_rate_calculation/'),
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
          winSitePercent: winSitePercent?.data ?? 0,
          // 집관승률
          winHomePercent: winHomePercent?.data ?? 0,
          // 나의 승요 요일
          weekdayMostWin: weekdayMostWinDay,
          // 나의 최대 연승
          longestWinningStreak: longestWinningStreakText,
          // 나의 최다 승리 구단
          mostWinTeam: mostWinTeam?.data?.most_wins_opponent ?? '-',
          // 나의 최다 관람 구장
          mostWatchStadium: mostWatchStadium?.data ?? '-',
          // 티켓 경기 결과
          winRateCalculation: winRateCalculation?.data ?? {
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

export default useMyStat
