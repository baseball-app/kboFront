import ApiClient from '@/api'
import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import useTeam from '@/hooks/match/useTeam'
import {useQuery} from '@tanstack/react-query'
import dayjs from 'dayjs'
import React from 'react'
import {View, Text, Image} from 'react-native'

type Rank = {
  id: number
  ranking: number
  ranks: {
    name: string
  }
  compare: 'stay' | 'up' | 'down'
  updated_at: string
}

const RankScreen = () => {
  const today = dayjs().format('YY.MM.DD')
  const {data} = useQuery<Rank[]>({
    queryKey: ['rank', today],
    queryFn: () => ApiClient.get<Rank[]>(`/ranks/rank_list/`),
  })

  return (
    <InitScrollProvider style={{backgroundColor: '#F3F2EE'}}>
      <RankHeader standardDate={today} />
      <View style={{gap: 10}}>
        {data?.map(item => (
          <TeamCard key={item.id} {...item} />
        ))}
      </View>
      <View style={{height: 24}} />
    </InitScrollProvider>
  )
}

const RankHeader = ({standardDate}: {standardDate: string}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        paddingTop: 24,
        paddingBottom: 20,
      }}>
      <Text style={{fontSize: 24, fontWeight: 600, color: '#171716'}}>팀순위</Text>
      <Text style={{fontSize: 16, fontWeight: 400, color: '#55524E'}}>({standardDate} 기준)</Text>
    </View>
  )
}

type TeamCardProps = Rank

const TeamCard = ({ranking, ranks, compare}: TeamCardProps) => {
  const rankColor = ranking <= 3 ? '#1E5EF4' : '#171716'
  const {findTeamByName} = useTeam()
  const team = findTeamByName(ranks.name)
  const statusImage = (status => {
    if (status === 'up') return require('@/assets/icons/rank_up.png')
    if (status === 'down') return require('@/assets/icons/rank_down.png')
    return null
  })(compare)

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginInline: 24,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 16,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: rankColor, width: 26, fontSize: 16, fontWeight: 600}}>{ranking}</Text>
        {team && <Image source={team?.logo} style={{width: 28, height: 28}} />}
        <Text style={{fontSize: 16, fontWeight: 600, marginLeft: 8}}>{team?.name}</Text>
      </View>
      {statusImage && <Image source={statusImage} style={{width: 16, height: 16}} />}
    </View>
  )
}

export default RankScreen
