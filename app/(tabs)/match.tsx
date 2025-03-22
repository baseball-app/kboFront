import {StyleSheet, FlatList, ScrollView, TouchableOpacity, Text} from 'react-native'
import {View} from 'react-native'
import MatchTeamBox from '@/components/MatchTeamBox'
import MatchCalendar from '@/components/MatchCalendar'
import MatchTopNotificationComponent from '@/app/match/components/MatchTopNotificationComponent'
import {useState} from 'react'
import EmptyMatchView from '@/components/match/EmptyMatchView'
import useMatch, {Match} from '@/hooks/match/useMatch'
import useWriteTicket from '@/hooks/match/useWriteTicket'
import {format} from 'date-fns'
import useTicketDetail from '@/hooks/match/useTicketDetail'
import dayjs from 'dayjs'
import useProfile from '@/hooks/my/useProfile'
import {usePopup} from '@/slice/commonSlice'
import {useRouter} from 'expo-router'

const MatchScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const {matchingList, prefetchMatchList} = useMatch({selectedDate})
  const {moveToWriteTicket} = useWriteTicket()
  const {openCommonPopup} = usePopup()
  const router = useRouter()

  const {profile} = useProfile()
  const {data, isSuccess} = useTicketDetail(dayjs(selectedDate).format('YYYY-MM-DD'), Number(profile?.id))

  console.log(dayjs(selectedDate).format('YYYY-MM-DD'), Number(profile?.id))

  const onClickMatch = (match: Match) => {
    if (isSuccess && Number(data?.length) > 1) {
      openCommonPopup('오늘의 야구 티켓은 최대 2번까지만\n작성하실 수 있어요!')
      return
    }

    moveToWriteTicket(selectedDate, match)

    // prefetchMatchList(format(selectedDate, 'yyyy-MM-dd')).finally(() => {
    //   return
    // })
  }

  return (
    <View style={styles.container}>
      <MatchTopNotificationComponent />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={matchingList}
        ListEmptyComponent={<EmptyMatchView selectedDate={dayjs(selectedDate).format('YYYY-MM-DD')} />}
        scrollEnabled
        ListHeaderComponent={
          <MatchCalendar //
            value={selectedDate}
            onChange={date => {
              prefetchMatchList(format(date, 'yyyy-MM-dd')).finally(() => setSelectedDate(date))
            }}
          />
        }
        renderItem={({item: match}) => (
          <MatchTeamBox
            match={match} //
            onClick={() => onClickMatch(match)}
          />
        )}
        ListFooterComponent={
          matchingList.length > 0 ? (
            <View style={styles.doubleHeaderBox}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/write',
                    params: {
                      date: dayjs(selectedDate).format('YYYY-MM-DD'),
                      step: 2,
                    },
                  })
                }
                style={styles.doubleHeaderButton}>
                <Text style={styles.doubleHeaderText}>더블헤더 작성하기</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
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
  doubleHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 16 * 1.4,
  },
  doubleHeaderButton: {
    backgroundColor: '#353430',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 99,
  },
  doubleHeaderBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
})
