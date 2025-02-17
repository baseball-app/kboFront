import ApiClient from '@/api'
import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import {Pagination} from '@/types/generic'
import {useQuery} from '@tanstack/react-query'
import {format} from 'date-fns'
import React from 'react'

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

const mock = [
  {
    id: 0,
    team_home_info: {
      id: 1,
      name: 'LG',
      logo_url: '',
    },
    team_away_info: {
      id: 2,
      name: 'KT',
      logo_url: '',
    },
    ballpark_info: {
      id: 1,
      name: '잠실',
      team_info: {
        id: 1,
        name: 'LG',
        logo_url: '',
      },
    },
    game_date: '2025-02-16T08:27:20.308Z',
  },
]

const useMatch = ({selectedDate}: {selectedDate: Date | null}) => {
  const {data: matchingList} = useQuery({
    queryKey: ['matchTeam', format(selectedDate!, 'yyyy-MM-dd')],
    queryFn: async () =>
      ApiClient.get<Pagination<Match>>('/games/', {
        end_date: format(selectedDate!, 'yyyy-MM-dd'),
        start_date: format(selectedDate!, 'yyyy-MM-dd'),
      }),
    enabled: Boolean(selectedDate),
  })

  // const moveToW

  return {
    matchingList: mock,
    // matchingList: matchingList?.results || mock,
  }
}

export default useMatch
