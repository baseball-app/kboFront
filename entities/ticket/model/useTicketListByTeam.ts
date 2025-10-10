import * as api from '../api'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'

const useTicketListByTeam = () => {
  const [teamId, setTeamId] = useState<number>(0)

  const {data: ticketList, isLoading} = useQuery({
    queryKey: ['ticketListByTeam', teamId],
    queryFn: () => api.findTicketListByTeam({teamId}),
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

export {useTicketListByTeam}
