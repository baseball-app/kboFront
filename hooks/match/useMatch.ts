import ApiClient from '@/api'
import {Pagination} from '@/types/generic'
import {useQuery} from '@tanstack/react-query'
import dayjs from 'dayjs'

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
  const startDate = dayjs(selectedDate).format('YYYY-MM-DD')

  const {data: matchingList} = useQuery({
    queryKey: ['matchTeam', startDate],
    queryFn: async () =>
      ApiClient.get<Match[]>('/games/', {
        end_date: startDate,
        start_date: startDate,
      }),
    enabled: Boolean(selectedDate),
  })

  return {
    matchingList: matchingList || [],
  }
}

export default useMatch
