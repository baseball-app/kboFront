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
