import {useQuery} from '@tanstack/react-query'
import {TEAMS} from './constants'
import {getTeams} from '../api'

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
        }
      })
    },
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const findTeamById = (id?: number) => teams?.find(team => team.id === id)
  const findTeamByName = (name?: string) => teams?.find(team => team.name === name)

  return {findTeamById, teams, findTeamByName}
}

export default useTeam
