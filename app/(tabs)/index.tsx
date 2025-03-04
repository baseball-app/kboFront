import {StyleSheet, ScrollView, Image, Text, TouchableOpacity, View} from 'react-native'
import Calendar from '@/components/home/Calendar'
import {SafeAreaView} from 'react-native-safe-area-context'
import FriendList from '@/components/home/FrendList'
import {useRouter} from 'expo-router'
import GameContainer from '@/components/game/GameContainer'
import useMakeFriend from '@/hooks/my/useMakeFriend'
import {useEffect} from 'react'
import useMatch from '@/hooks/match/useMatch'
import dayjs from 'dayjs'
import {usePopup} from '@/slice/commonSlice'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'

const CalendarScreen = () => {
  const router = useRouter()
  const {openCommonPopup} = usePopup()

  const {addFriendList, friendInvitationCodeList} = useMakeFriend()
  const {matchingList: todayMatchingList} = useMatch({selectedDate: dayjs().toDate()})

  // 오늘 경기가 두 개 이상일 경우 클릭했을 때 안내문구 출력
  const overTwoMatch: boolean = true

  const onClickFloatingButton = () => {
    if (!todayMatchingList?.length) {
      openCommonPopup('오늘은 진행 중인 경기가 없어요!')
      return
    }

    if (overTwoMatch) {
      openCommonPopup(`오늘의 야구 티켓은 최대 2번까지만\n작성하실 수 있어요!`)
      return
    }

    // 오늘 날짜로 이동
    router.push({
      pathname: '/write',
      params: {
        date: dayjs().format('YYYY-MM-DD'),
      },
    })
  }

  useEffect(() => {
    if (friendInvitationCodeList) addFriendList()
  }, [friendInvitationCodeList])

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FriendList />
      <ScrollView style={styles.scollContainer}>
        <GameContainer />
        <View style={{marginBottom: 70}}>
          <Calendar />
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity //
        activeOpacity={0.95}
        style={styles.floatingButton}
        onPress={onClickFloatingButton}>
        <Image source={require('@/assets/icons/write.png')} resizeMode="contain" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scollContainer: {
    flex: 1,
    backgroundColor: '#fffcf3',
    padding: 24,
  },

  /* Floating Button */
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: '#353430',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})

export default CalendarScreen
