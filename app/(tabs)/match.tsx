import {StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native'
import {View} from 'react-native'
import MatchTeamBox from '@/components/MatchTeamBox'
import MatchCalendar from '@/components/MatchCalendar'
import {useEffect, useState} from 'react'
import useMatch, {Match} from '@/hooks/match/useMatch'
import dayjs from 'dayjs'
import {usePopup} from '@/slice/commonSlice'
import React from 'react'
import {usePathname} from 'expo-router'
import {useAnalyticsStore} from '@/analytics/event'
import {EmptyMatchView, LoadingMatchList, MatchNotification} from '@/feature/match/components'
import {ROUTES, useAppRouter} from '@/hooks/common'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import {clearFalsyValue} from '@/utils/clearFalsyValue'
import {MatchScreenError, useCheckValidateTicket} from '@/feature/ticket/write/useCheckValidateTicket'

const MatchScreen = () => {
  const insets = useSafeAreaInsets()

  const showToast = (text: string) => {
    Toast.show({
      type: 'info',
      text1: text,
      visibilityTime: 2000,
      autoHide: true,
      position: 'bottom',
      bottomOffset: insets.bottom + 24,
    })
  }

  const [selectedDate, setSelectedDate] = useState(new Date())
  const targetDate = dayjs(selectedDate).format('YYYY-MM-DD')

  const {matchingList, isPending} = useMatch({selectedDate})

  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const pathname = usePathname()

  const {validateTicketCount} = useCheckValidateTicket({selectedDate})
  const {openCommonPopup} = usePopup()
  const router = useAppRouter()

  const onClickMatch = async (match?: Match) => {
    const params = clearFalsyValue({date: targetDate, step: 2, matchId: match?.id || undefined})
    validateTicketCount(targetDate)
      .then(() => router.push(ROUTES.WRITE, params))
      .catch(error => {
        if (error instanceof MatchScreenError) return openCommonPopup(error.message)
        showToast('잠시 후 다시 시도해 주세요.')
      })
  }

  // 페이지 이동 시, 날짜 초기화
  useEffect(() => {
    if (pathname !== '/match' && !pathname.includes('write')) setSelectedDate(new Date())
  }, [pathname])

  return (
    <View style={styles.container}>
      <MatchNotification />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={matchingList}
        ListEmptyComponent={isPending ? <LoadingMatchList /> : <EmptyMatchView />}
        scrollEnabled
        ListHeaderComponent={
          <MatchCalendar //
            value={selectedDate}
            onChange={setSelectedDate}
          />
        }
        renderItem={({item: match}) => (
          <MatchTeamBox
            match={match} //
            onClick={() => {
              setScreenName(pathname)
              setDiaryCreate('경기 일정')
              onClickMatch(match)
            }}
          />
        )}
        ListFooterComponent={
          matchingList.length > 0 ? (
            <View style={styles.doubleHeaderBox}>
              <TouchableOpacity onPress={() => onClickMatch()} style={styles.doubleHeaderButton}>
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
