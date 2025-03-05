import ApiClient from '@/api'
import {useQuery} from '@tanstack/react-query'
import React, {useState} from 'react'

type TicketListByTeam = {
  id: number
  date: string // '2025-03-22'
  writer_id: number
  game_id: number
  opponent_id: number
  ballpark: {
    id: number
    name: string
    team_id: number
  }
  favorite: boolean
  direct_home_team: string
  direct_away_team: string
  direct_yn: boolean
}

const useTicketListByTeam = () => {
  const [teamId, setTeamId] = useState<number>(0)

  // /tickets/ticket_list/
  const {data: ticketList} = useQuery({
    queryKey: ['ticketListByTeam', teamId],
    queryFn: () =>
      ApiClient.get<TicketListByTeam[]>(
        '/tickets/ticket_list/',
        teamId
          ? {
              team_id: teamId,
            }
          : {
              favorite: true,
            },
      ),
  })

  const onChangeTeam = (teamId: number) => {
    setTeamId(teamId)
  }

  return {
    ticketList,
    onChangeTeam,
    selectedTeamId: teamId,
  }
}

export default useTicketListByTeam
