import ApiClient from '@/api'
import {useQuery} from '@tanstack/react-query'
import React from 'react'

export type Team = {
  id: number
  logo_url: string
  name: string
  short_name?: string
}

const TEAMS = [
  {short_name: 'LG', name: 'LG 트윈스', logo: require('@/assets/team_logo/LG.png'), color: '#C1163A'},
  {short_name: 'KT', name: 'KT 위즈', logo: require('@/assets/team_logo/KT.png'), color: '#4B4B4B'},
  {short_name: 'SSG', name: 'SSG 랜더스', logo: require('@/assets/team_logo/SSG.png'), color: '#FDD484'},
  {short_name: 'NC', name: 'NC 다이노스', logo: require('@/assets/team_logo/NC.png'), color: '#17477D'},
  {short_name: '두산', name: '두산 베어스', logo: require('@/assets/team_logo/DOOSAN.png'), color: '#161332'},
  {short_name: 'KIA', name: 'KIA 타이거즈', logo: require('@/assets/team_logo/KIA.png'), color: '#E61A1E'},
  {short_name: '롯데', name: '롯데 자이언츠', logo: require('@/assets/team_logo/LOTTE.png'), color: '#62AEDB'},
  {short_name: '삼성', name: '삼성 라이온즈', logo: require('@/assets/team_logo/SAMSUNG.png'), color: '#2273FE'},
  {short_name: '한화', name: '한화 이글스', logo: require('@/assets/team_logo/HANWHA.png'), color: '#FF5A08'},
  {short_name: '키움', name: '키움 히어로즈', logo: require('@/assets/team_logo/KIWOOM.png'), color: '#810924'},
] as const

const useTeam = () => {
  const {data: teams} = useQuery({
    queryKey: ['team'],
    queryFn: () => ApiClient.get<Team[]>('/teams/'),
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

  const findTeamById = (id?: number) => {
    return teams?.find(team => team.id === id)
  }

  const findTeamByName = (name?: string) => {
    return teams?.find(team => team.name === name)
  }

  return {findTeamById, teams, findTeamByName}
}

export default useTeam
