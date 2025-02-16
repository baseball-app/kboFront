import {StyleSheet, ScrollView, Text, FlatList} from 'react-native'
import {View} from 'react-native'
import MatchTeamBox from '@/components/MatchTeamBox'
import MatchCalendar from '@/components/MatchCalendar'
import MatchTopNotificationComponent from '@/app/match/components/MatchTopNotificationComponent'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import ApiClient from '@/api'
import {format} from 'date-fns'
import {Pagination} from '@/types/generic'
import EmptyMatchView from '@/components/match/EmptyMatchView'

const matchTeam = [
  {
    id: 0,
    time: '14:00',
    homeTeamImg: require('@/assets/team_logo/SSG.png'),
    awayTeamImg: require('@/assets/team_logo/KT.png'),
    homeTeamNm: 'SSG',
    awayTeamNm: 'KT',
  },
  {
    id: 1,
    time: '15:00',
    homeTeamImg: require('@/assets/team_logo/SSG.png'),
    awayTeamImg: require('@/assets/team_logo/KT.png'),
    homeTeamNm: 'SSG',
    awayTeamNm: 'KT',
  },
  {
    id: 2,
    time: '16:00',
    homeTeamImg: require('@/assets/team_logo/SSG.png'),
    awayTeamImg: require('@/assets/team_logo/KT.png'),
    homeTeamNm: 'SSG',
    awayTeamNm: 'KT',
  },
]

type TeamInfo = {
  id: number
  name: string
  logo_url: string
}

export type Match = {
  id: number
  team_home_info: TeamInfo
  team_away_info: TeamInfo
  ballpark_info: {
    id: number
    name: string
    team_info: TeamInfo
  }
  game_date: string //'2025-02-16T08:27:20.308Z'
}

const MatchScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const {data} = useQuery({
    queryKey: ['matchTeam', format(selectedDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      return {
        results: [
          {
            id: 0,
            team_home_info: {
              id: 1,
              name: 'LG',
              logo_url: '',
            },
            team_away_info: {
              id: 2,
              name: 'KT',
              logo_url: '',
            },
            ballpark_info: {
              id: 1,
              name: '잠실',
              team_info: {
                id: 1,
                name: 'LG',
                logo_url: '',
              },
            },
            game_date: '2025-02-16T08:27:20.308Z',
          },
        ],
      }
      // return ApiClient.get<Pagination<Match>>('/games/', {
      //   end_date: format(selectedDate, 'yyyy-MM-dd'),
      //   start_date: format(selectedDate, 'yyyy-MM-dd'),
      // })
    },
  })

  return (
    <View style={styles.container}>
      <MatchTopNotificationComponent />

      <FlatList
        contentContainerStyle={styles.flatList}
        data={data?.results || []}
        ListEmptyComponent={() => <EmptyMatchView />}
        renderItem={({item: match}) => <MatchTeamBox {...match} />}
        ListHeaderComponent={() => <MatchCalendar value={selectedDate} onChange={date => setSelectedDate(date)} />}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf3',
  },
  flatList: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 24,
    rowGap: 20,
  },
})
