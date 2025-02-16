import {StyleSheet, ScrollView, Text, FlatList} from 'react-native'
import {View} from 'react-native'
import MatchTeamBox from '@/components/MatchTeamBox'
import MatchCalendar from '@/components/MatchCalendar'
import MatchTopNotificationComponent from '@/app/match/components/MatchTopNotificationComponent'

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
const MatchScreen = () => {
  const renderListHeaderComponent = () => {
    return <MatchCalendar />
  }

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <MatchTeamBox
        time={item.time}
        homeTeamImg={item.homeTeamImg}
        awayTeamImg={item.awayTeamImg}
        homeTeamNm={item.homeTeamNm}
        awayTeamNm={item.awayTeamNm}
        isSelected={item.id === index}
      />
    )
  }

  return (
    <View style={styles.container}>
      <MatchTopNotificationComponent />

      <FlatList
        contentContainerStyle={styles.flatList}
        data={matchTeam}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeaderComponent}
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
