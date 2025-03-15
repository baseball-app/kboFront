import ApiClient from '@/api'
import {Pagination} from '@/types/generic'
import {useQuery} from '@tanstack/react-query'
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

  const {data: matchingList, isSuccess} = useQuery({
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

  return {
    matchingList: matchingList || [],
    onlyMyTeamMatchingList: onlyMyTeamMatchingList || [],
    checkIsMyTeamMatch,
    isSuccess,
  }
}

export default useMatch
