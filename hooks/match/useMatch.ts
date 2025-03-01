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

// const mock = [
//   {
//     id: 0,
//     team_home_info: {
//       id: 1,
//       name: 'LG',
//       logo_url: '',
//     },
//     team_away_info: {
//       id: 2,
//       name: 'KT',
//       logo_url: '',
//     },
//     ballpark_info: {
//       id: 1,
//       name: '잠실',
//       team_info: {
//         id: 1,
//         name: 'LG',
//         logo_url: '',
//       },
//     },
//     game_date: '2025-02-16T08:27:20.308Z',
//   },
// ]

const useMatch = ({selectedDate}: {selectedDate: Date | null}) => {
  const startDate = dayjs(selectedDate).startOf('date').format('YYYY-MM-DD')
  const endDate = dayjs(selectedDate).add(10, 'day').startOf('date').format('YYYY-MM-DD')

  const {data: matchingList} = useQuery({
    queryKey: ['matchTeam', startDate],
    queryFn: async () =>
      ApiClient.get<Pagination<Match>>('/games/', {
        end_date: endDate,
        start_date: startDate,
      }),
    enabled: Boolean(selectedDate),
  })

  console.log(startDate, matchingList)

  return {
    matchingList: matchingList?.results || [],
  }
}

export default useMatch
