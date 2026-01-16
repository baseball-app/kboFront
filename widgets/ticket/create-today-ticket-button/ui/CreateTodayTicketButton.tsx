import React from 'react'
import {useMatch} from '@/entities/match'
import dayjs from 'dayjs'
import {usePopup} from '@/slice/commonSlice'
import {useNavigateWriteTicket} from '@/features/match/navigate-write-ticket'
import {useAnalyticsStore} from '@/analytics/event'
import {Image, StyleSheet} from 'react-native'
import {Pressable, size} from '@/shared'

const CreateTodayTicketButton = () => {
  const {matchingList: todayMatchingList} = useMatch({selectedDate: dayjs().toDate()})
  const {openCommonPopup} = usePopup()
  const {moveToWriteTicket} = useNavigateWriteTicket()
  const {setScreenName, setDiaryCreate} = useAnalyticsStore()

  const onClickFloatingButton = async () => {
    if (!todayMatchingList?.length) {
      openCommonPopup('오늘은 진행 중인 경기가 없어요!')
      return
    }

    moveToWriteTicket({date: dayjs().format('YYYY-MM-DD'), step: 1}, () => {
      // ga 데이터 수집용도
      setScreenName('/')
      setDiaryCreate('메인 버튼')
    })
  }
  return (
    <Pressable //
      style={styles.floatingButton}
      onPress={onClickFloatingButton}>
      <Image
        source={require('@/assets/icons/write.png')}
        resizeMode="contain"
        style={{
          width: size(24),
          height: size(24),
        }}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  /* Floating Button */
  floatingButton: {
    position: 'absolute',
    right: size(20),
    bottom: size(20),
    width: size(48),
    height: size(48),
    backgroundColor: '#353430',
    borderRadius: size(28),
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 0, // Android shadow

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
})

export {CreateTodayTicketButton}
