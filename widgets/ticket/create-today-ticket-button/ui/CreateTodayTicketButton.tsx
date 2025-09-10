import React from 'react'
import {useMatch} from '@/entities/match'
import dayjs from 'dayjs'
import {usePopup} from '@/slice/commonSlice'
import {useNavigateWriteTicket} from '@/features/match/navigate-write-ticket'
import {useAnalyticsStore} from '@/analytics/event'
import {usePathname} from 'expo-router'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'

const CreateTodayTicketButton = () => {
  const {matchingList: todayMatchingList} = useMatch({selectedDate: dayjs().toDate()})
  const {openCommonPopup} = usePopup()
  const {moveToWriteTicket} = useNavigateWriteTicket()
  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const pathname = usePathname()

  const onClickFloatingButton = async () => {
    if (!todayMatchingList?.length) {
      openCommonPopup('오늘은 진행 중인 경기가 없어요!')
      return
    }

    moveToWriteTicket({date: dayjs().format('YYYY-MM-DD'), step: 1}, () => {
      // ga 데이터 수집용도
      setScreenName(pathname)
      setDiaryCreate('메인 버튼')
    })
  }
  return (
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
  )
}

const styles = StyleSheet.create({
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

export {CreateTodayTicketButton}
