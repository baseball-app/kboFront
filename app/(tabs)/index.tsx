import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FriendList from '@/components/home/FrendList'
import useProfile from '@/hooks/my/useProfile'
import {useEffect, useState} from 'react'
import useFriends from '@/hooks/my/useFriends'
import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import {CalendarContainer} from '@/components/home/Calendar/CalendarContainer'
import {TodayMatch} from '@/widgets'
import {MatchCalendarTitle} from '@/entities/match'
import {CreateTodayTicketButton} from '@/widgets/ticket/create-today-ticket-button'
import {useIsFocused} from '@react-navigation/native'
import {size} from '@/shared'
import {color_token} from '@/constants/theme'

const CalendarScreen = () => {
  const {profile} = useProfile()
  const [userId, setUserId] = useState<number | null>(null)
  const isMyDiary = userId === profile.id
  const isFocused = useIsFocused()

  // 페이지 이동 시, 초기화
  useEffect(() => {
    if (!profile.id) return
    if (userId === profile.id) return
    if (isFocused && !userId) setUserId(profile.id)
  }, [profile.id])

  const {friend_status} = useFriends()

  const selectedUserName = (() => {
    const nickname = friend_status?.friends.find(friend => friend.id === userId)?.nickname

    if (nickname) return nickname.length > 5 ? nickname.slice(0, 5) + '...' : nickname
    // 내 닉네임이라는 뜻
    return ''
  })()

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FriendList setUserId={setUserId} userId={userId} />
      <InitScrollProvider style={styles.scollContainer}>
        <MatchCalendarTitle selectedUserName={selectedUserName} />
        <TodayMatch />
        <View style={{marginBottom: size(70)}}>
          <CalendarContainer targetId={userId || profile.id!} />
        </View>
      </InitScrollProvider>

      {/* Floating Button */}
      {isMyDiary && <CreateTodayTicketButton />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  scollContainer: {
    flex: 1,
    backgroundColor: color_token.gray100,
    padding: size(24),
  },
})

export default CalendarScreen
