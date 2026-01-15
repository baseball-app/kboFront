import {ROUTES, useAppRouter} from '@/shared'
import {useLocalSearchParams} from 'expo-router'

enum StatsDetailType {
  OPPONENT = 'opponent',
  BALLPARK = 'ballpark',
  HOME = 'home',
  AWAY = 'away',
  MY_HOME = 'my_home',
  ERROR = 'error',
}

type StatsDetailQuery =
  | {
      type: StatsDetailType.OPPONENT
      parameter_id: number
      view_gbn: 'team'
    }
  | {
      type: StatsDetailType.BALLPARK
      parameter_id: number
      view_gbn: 'ballpark'
    }
  | {
      type: StatsDetailType.HOME
      is_homeballpark: true
    }
  | {
      type: StatsDetailType.AWAY
      is_homeballpark: false
    }
  | {
      type: StatsDetailType.MY_HOME
      parameter_id: number
    }
  | {
      type: StatsDetailType.ERROR
    }

function useNavigateToStatsDetail() {
  const {push} = useAppRouter()

  const params = useLocalSearchParams()

  const getQuery = (): StatsDetailQuery => {
    if (params.type === StatsDetailType.OPPONENT) {
      return {
        type: params.type,
        parameter_id: Number(params.id),
        view_gbn: 'team',
      } as const
    }
    if (params.type === StatsDetailType.BALLPARK) {
      return {
        type: params.type,
        parameter_id: Number(params.id),
        view_gbn: 'ballpark',
      } as const
    }
    if (params.type === StatsDetailType.HOME) {
      return {
        type: params.type,
        is_homeballpark: true,
      } as const
    }

    if (params.type === StatsDetailType.AWAY) {
      return {
        type: params.type,
        is_homeballpark: false,
      } as const
    }

    if (params.type === StatsDetailType.MY_HOME) {
      return {
        type: params.type,
        parameter_id: Number(params.id),
      } as const
    }

    return {
      type: StatsDetailType.ERROR,
    } as const
  }

  // 상대구단별 승률 상세 페이지로 이동
  const navigateToOpponentStatsDetail = (id: number) => {
    push(ROUTES.STATS_DETAIL, {type: StatsDetailType.OPPONENT, id})
  }

  // 구장별 승률 상세 페이지로 이동
  const navigateToBallparkStatsDetail = (id: number) => {
    push(ROUTES.STATS_DETAIL, {type: StatsDetailType.BALLPARK, id})
  }

  // 홈 경기별 승률 상세 페이지로 이동
  const navigateToHomeStatsDetail = () => {
    push(ROUTES.STATS_DETAIL, {type: StatsDetailType.HOME})
  }

  // 원정 경기별 승률 상세 페이지로 이동
  const navigateToAwayStatsDetail = () => {
    push(ROUTES.STATS_DETAIL, {type: StatsDetailType.AWAY})
  }

  // 집관 경기별 승률 상세 페이지로 이동
  const navigateToMyHomeStatsDetail = (id: number) => {
    push(ROUTES.STATS_DETAIL, {type: StatsDetailType.MY_HOME, id})
  }

  return {
    getQuery,
    navigateToOpponentStatsDetail,
    navigateToBallparkStatsDetail,
    navigateToHomeStatsDetail,
    navigateToAwayStatsDetail,
    navigateToMyHomeStatsDetail,
  }
}

export {useNavigateToStatsDetail, StatsDetailType}
