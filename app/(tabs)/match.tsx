import {StyleSheet, FlatList} from 'react-native'
import {View} from 'react-native'
import MatchTeamBox from '@/components/MatchTeamBox'
import MatchCalendar from '@/components/MatchCalendar'
import MatchTopNotificationComponent from '@/app/match/components/MatchTopNotificationComponent'
import {useState} from 'react'
import EmptyMatchView from '@/components/match/EmptyMatchView'
import {useRouter} from 'expo-router'
import useMatch from '@/hooks/match/useMatch'
import useTicket from '@/hooks/match/useTicket'

const MatchScreen = () => {
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const {matchingList} = useMatch({selectedDate})
  const {moveToWriteTicket} = useTicket()

  return (
    <View style={styles.container}>
      <MatchTopNotificationComponent />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={matchingList}
        ListEmptyComponent={() => <EmptyMatchView />}
        ListHeaderComponent={() => (
          <MatchCalendar //
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        )}
        renderItem={({item: match}) => (
          <MatchTeamBox
            match={match} //
            onClick={() => moveToWriteTicket(selectedDate, match)}
          />
        )}
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
