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
          ? // 타구단
            {
              is_cheer: false,
            }
          : teamId
          ? // 팀 선택
            // team_id 팀 아이디를 드림
            // 1. 나의 전체 티켓에서 내 팀 아이디로 필터링
            // 2. 제가 드린 team_id로 필터링
            {
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
