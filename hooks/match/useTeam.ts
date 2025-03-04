import ApiClient from '@/api'
import {useQuery} from '@tanstack/react-query'
import React from 'react'

const useTeam = () => {
  const findTeamById = (id?: number) => {
    const teams = [
      {id: 1, name: 'KIA 타이거즈', shortName: 'KIA', color: '#E61A1E'},
      {id: 2, name: '삼성 라이온즈', shortName: '삼성', color: '#2273FE'},
      {id: 3, name: 'LG 트윈스', shortName: 'LG', color: '#C1163A'},
      {id: 4, name: '두산 베어스', shortName: '두산', color: '#161332'},
      {id: 5, name: 'KT 위즈', shortName: 'KT', color: '#4B4B4B'},
      {id: 6, name: 'SSG 랜더스', shortName: 'SSG', color: '#FDD484'},
      {id: 7, name: '롯데 자이언츠', shortName: '롯데', color: '#62AEDB'},
      {id: 8, name: '한화 이글스', shortName: '한화', color: '#FF5A08'},
      {id: 9, name: 'NC 다이노스', shortName: 'NC', color: '#17477D'},
      {id: 10, name: '키움 히어로즈', shortName: '키움', color: '#810924'},
    ]

    return teams.find(team => team.id === id)
  }

  // const {} = useQuery({
  //   queryKey: ['team'],
  //   queryFn: () => ApiClient.get('/games/'),
  //   select(data) {},
  // })

  return {findTeamById}
}

export default useTeam
