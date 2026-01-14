import {useQuery} from '@tanstack/react-query'
import {TEAMS} from './constants'
import {getTeams} from '../api'
import {TeamWithInfo} from '../types'

const useTeam = () => {
  const {data: teams} = useQuery({
    queryKey: ['team'],
    queryFn: () => getTeams(),
    select(data) {
      return data.map(team => {
        const static_team_info = TEAMS.find(t => t.name === team.name)

        return {
          id: team.id,
          logo: static_team_info?.logo,
          name: team.name,
          short_name: static_team_info?.short_name,
          color: static_team_info?.color,
          gradient: static_team_info?.gradient,
        } as TeamWithInfo
      })
    },
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const findTeamById = (id?: number): TeamWithInfo | undefined => teams?.find(team => Number(team.id) === Number(id))
  const findTeamByName = (name?: string): TeamWithInfo | undefined => teams?.find(team => team.name === name)

  return {findTeamById, teams, findTeamByName}
}

export {useTeam}
