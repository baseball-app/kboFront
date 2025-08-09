import {StyleSheet, Image, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FriendList from '@/components/home/FrendList'
import {usePathname} from 'expo-router'
import GameContainer from '@/components/game/GameContainer'
import useMatch from '@/hooks/match/useMatch'
import dayjs from 'dayjs'
import {usePopup} from '@/slice/commonSlice'
import useDiary from '@/hooks/diary/useDiary'
import useProfile from '@/hooks/my/useProfile'
import {useEffect} from 'react'
import useNotification from '@/hooks/notification/useNotification'
import useFriends from '@/hooks/my/useFriends'
import {useAnalyticsStore} from '@/analytics/event'
import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import {CalendarContainer} from '@/components/home/Calendar/CalendarContainer'
import {ROUTES, useAppRouter} from '@/hooks/common'
// import {useRank} from '@/hooks/useRank'
const CalendarScreen = () => {
  const {openCommonPopup} = usePopup()

  const {matchingList: todayMatchingList} = useMatch({selectedDate: dayjs().toDate()})
  const {ticketList, isMyDiary, setUserId, userId} = useDiary()
  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const {friend_status} = useFriends()
  const router = useAppRouter()
  // const {} = useRank()

  const selectedUserName = (() => {
    const nickname = friend_status?.friends.find(friend => friend.id === userId)?.nickname

    if (nickname) return nickname.length > 5 ? nickname.slice(0, 5) + '...' : nickname
    // 내 닉네임이라는 뜻
    return ''
  })()

  const {profile} = useProfile()
  const {} = useNotification()

  const pathname = usePathname()

  // 페이지 이동 시, 초기화
  useEffect(() => {
    const tabPathList = ['/rank', '/match', '/my', '/ticket']
    if (profile.id && tabPathList.includes(pathname)) {
      setUserId(profile.id)
    }
  }, [pathname, profile.id])

  const todayTicketList = ticketList?.[dayjs().format('YYYY-MM-DD')]

  // 오늘 경기가 두 개 이상일 경우 클릭했을 때 안내문구 출력
  const overTwoMatch: boolean = Boolean(todayTicketList?.length) && Number(todayTicketList?.length) > 1

  const onClickFloatingButton = () => {
    if (!todayMatchingList?.length) {
      openCommonPopup('오늘은 진행 중인 경기가 없어요!')
      return
    }

    if (overTwoMatch) {
      openCommonPopup(`오늘의 야구 티켓은 최대 2번까지만\n작성하실 수 있어요!`)
      return
    }

    // ga 데이터 수집용도
    setScreenName(pathname)
    setDiaryCreate('메인 버튼')
    // ga 데이터 수집용도

    // 오늘 날짜로 이동
    router.push(ROUTES.WRITE, {
      date: dayjs().format('YYYY-MM-DD'),
    })
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FriendList setUserId={setUserId} userId={userId} />
      <InitScrollProvider style={styles.scollContainer}>
        <GameContainer selectedUserName={selectedUserName} />
        <View style={{marginBottom: 70}}>
          <CalendarContainer targetId={userId || profile.id!} />
        </View>
      </InitScrollProvider>

      {/* Floating Button */}
      {isMyDiary && (
        <TouchableOpacity //
          activeOpacity={0.95}
          style={styles.floatingButton}
          onPress={onClickFloatingButton}>
          <Image
            source={require('@/assets/icons/write.png')}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
      )}
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
    width: 48,
    height: 48,
    backgroundColor: '#353430',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 4, // Android shadow

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
})

export default CalendarScreen
