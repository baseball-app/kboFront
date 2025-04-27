import ApiClient from '@/api'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import dayjs from 'dayjs'
import useProfile from '../my/useProfile'

type TeamInfo = {
  id: number
  name: string
  logo_url: string
}

export type Match = {
  id: number
  team_home_info: TeamInfo
  team_away_info: TeamInfo
  ballpark_info: {
    id: number
    name: string
    team_info: TeamInfo
  }
  game_date: string //'2025-02-16T08:27:20.308Z'
}

const useMatch = ({selectedDate}: {selectedDate: Date | null}) => {
  const {profile} = useProfile()
  const startDate = dayjs(selectedDate).format('YYYY-MM-DD')
  const queryClient = useQueryClient()

  const {
    data: matchingList,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['matchTeam', startDate],
    queryFn: async () =>
      ApiClient.get<Match[]>('/games/', {
        end_date: startDate,
        start_date: startDate,
      }),
    enabled: Boolean(selectedDate),
  })

  const checkIsMyTeamMatch = (match: Match) => {
    const isMyAwayTeam = match.team_away_info.id === profile.my_team?.id
    const isMyHomeTeam = match.team_home_info.id === profile.my_team?.id
    return isMyAwayTeam || isMyHomeTeam
  }

  const onlyMyTeamMatchingList = matchingList?.filter(match => checkIsMyTeamMatch(match))

  const prefetchMatchList = async (date: string) => {
    const queryKey = ['matchTeam', date]
    const data = queryClient.getQueryData<Match[]>(queryKey)

    if (data) return

    return queryClient.prefetchQuery({
      queryKey,
      queryFn: () =>
        ApiClient.get<Match[]>('/games/', {
          end_date: date,
          start_date: date,
        }),
    })
  }

  return {
    matchingList: matchingList || [],
    onlyMyTeamMatchingList: onlyMyTeamMatchingList || [],
    checkIsMyTeamMatch,
    isSuccess,
    prefetchMatchList,
    isPending,
  }
}

export default useMatch

// const a = [
//   {
//     ballpark_info: {id: 2, name: '잠실 종합운동장 야구장', team_info: [Object]},
//     game_date: '2025-04-27T14:00:00+09:00',
//     id: 836,
//     team_away_info: {id: 7, logo_url: 'https://image.com/', name: '롯데 자이언츠'},
//     team_home_info: {id: 4, logo_url: 'https://image.com/', name: '두산 베어스'},
//   },
//   {
//     ballpark_info: {id: 4, name: '인천 SSG 랜더스필드', team_info: [Object]},
//     game_date: '2025-04-27T14:00:00+09:00',
//     id: 837,
//     team_away_info: {id: 10, logo_url: 'https://image.com/', name: '키움 히어로즈'},
//     team_home_info: {id: 6, logo_url: 'https://image.com/', name: 'SSG 랜더스'},
//   },
//   {
//     ballpark_info: {id: 7, name: '대구 삼성 라이온즈 파크', team_info: [Object]},
//     game_date: '2025-04-27T14:00:00+09:00',
//     id: 838,
//     team_away_info: {id: 9, logo_url: 'https://image.com/', name: 'NC 다이노스'},
//     team_home_info: {id: 2, logo_url: 'https://image.com/', name: '삼성 라이온즈'},
//   },
//   {
//     ballpark_info: {id: 8, name: '광주 기아 챔피언스 필드', team_info: [Object]},
//     game_date: '2025-04-27T14:00:00+09:00',
//     id: 839,
//     team_away_info: {id: 3, logo_url: 'https://image.com/', name: 'LG 트윈스'},
//     team_home_info: {id: 1, logo_url: 'https://image.com/', name: 'KIA 타이거즈'},
//   },
//   {
//     ballpark_info: {id: 6, name: '대전 한화생명 볼파크', team_info: [Object]},
//     game_date: '2025-04-27T14:00:00+09:00',
//     id: 840,
//     team_away_info: {id: 5, logo_url: 'https://image.com/', name: 'KT 위즈'},
//     team_home_info: {id: 8, logo_url: 'https://image.com/', name: '한화 이글스'},
//   },
// ]
