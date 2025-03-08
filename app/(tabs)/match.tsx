import {StyleSheet, FlatList, ScrollView} from 'react-native'
import {View} from 'react-native'
import MatchTeamBox from '@/components/MatchTeamBox'
import MatchCalendar from '@/components/MatchCalendar'
import MatchTopNotificationComponent from '@/app/match/components/MatchTopNotificationComponent'
import {useState} from 'react'
import EmptyMatchView from '@/components/match/EmptyMatchView'
import useMatch from '@/hooks/match/useMatch'
import useWriteTicket from '@/hooks/match/useWriteTicket'

const MatchScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const {matchingList, checkIsMyTeamMatch} = useMatch({selectedDate})
  const {moveToWriteTicket} = useWriteTicket()

  return (
    <View style={styles.container}>
      <MatchTopNotificationComponent />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={matchingList}
        ListEmptyComponent={<EmptyMatchView />}
        scrollEnabled
        ListHeaderComponent={
          <MatchCalendar //
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        }
        renderItem={({item: match}) => (
          <MatchTeamBox
            match={match} //
            isMyTeamMatch={checkIsMyTeamMatch(match)}
            onClick={() => checkIsMyTeamMatch(match) && moveToWriteTicket(selectedDate, match)}
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
    // flex: 1,
    paddingTop: 8,
    paddingHorizontal: 24,
    paddingBottom: 20,
    rowGap: 20,
  },
})
