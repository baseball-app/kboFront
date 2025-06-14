import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import useTeam from '@/hooks/match/useTeam'
import React from 'react'
import {View, Text, Image, FlatList} from 'react-native'

const RankScreen = () => {
  const data = [
    {rank: 1, id: 1, status: 'up'},
    {rank: 2, id: 2, status: 'down'},
    {rank: 3, id: 3, status: 'same'},
    {rank: 4, id: 4, status: 'down'},
    {rank: 5, id: 5, status: 'same'},
    {rank: 6, id: 6, status: 'down'},
    {rank: 7, id: 7, status: 'same'},
    {rank: 8, id: 8, status: 'down'},
    {rank: 9, id: 9, status: 'same'},
    {rank: 10, id: 10, status: 'down'},
  ] as const

  return (
    <InitScrollProvider>
      <FlatList
        ListHeaderComponent={<RankHeader standardDate="25.04.27" />}
        ListFooterComponent={<View style={{height: 24}}></View>}
        data={data}
        renderItem={({item}) => <TeamCard {...item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 10}}
      />
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

type TeamCardProps = {
  rank: number
  id: number
  status: 'up' | 'down' | 'same'
}

const TeamCard = ({rank, id, status}: TeamCardProps) => {
  const rankColor = rank <= 3 ? '#1E5EF4' : '#171716'
  const {findTeamById} = useTeam()
  const team = findTeamById(id)
  const statusImage = (status => {
    if (status === 'up') return require('@/assets/icons/rank_up.png')
    if (status === 'down') return require('@/assets/icons/rank_down.png')
    return null
  })(status)

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
        <Text style={{color: rankColor, width: 26, fontSize: 16, fontWeight: 600}}>{rank}</Text>
        {team && <Image source={team?.logo} style={{width: 28, height: 28}} />}
        <Text style={{fontSize: 16, fontWeight: 600, marginLeft: 8}}>{team?.name}</Text>
      </View>
      {statusImage && <Image source={statusImage} style={{width: 16, height: 16}} />}
    </View>
  )
}

export default RankScreen
