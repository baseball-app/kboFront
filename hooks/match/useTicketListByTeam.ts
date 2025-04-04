import ApiClient from '@/api'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import React, {useState} from 'react'

export type TicketListByTeam = {
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
  hometeam_id: string
  awayteam_id: string
  direct_yn: boolean
}

const useTicketListByTeam = () => {
  const [teamId, setTeamId] = useState<number>(0)

  const {data: ticketList, isLoading} = useQuery({
    queryKey: ['ticketListByTeam', teamId],
    queryFn: () =>
      ApiClient.get<TicketListByTeam[]>(
        '/tickets/ticket_list/',
        teamId === 999
          ? {
              is_cheer: false,
            }
          : teamId
          ? {
              team_id: teamId,
              is_cheer: true,
            }
          : {
              // is_cheer: true,
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
    isLoading,
  }
}

export default useTicketListByTeam
