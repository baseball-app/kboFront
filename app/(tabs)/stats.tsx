import {Image, ScrollView, StyleSheet} from 'react-native'
import {View} from 'react-native'
import React, {useState} from 'react'
import {logEvent} from '@/analytics/func'
import {EVENTS} from '@/analytics/event'
import {ROUTES, useAppRouter} from '@/shared'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {Button, Pressable, SelectBox, Txt} from '@/shared/ui'
import {SelectedStatsType, SelectSeasonBottomSheet, STATS_TYPE_LIST, useSelectedStatsFilter} from '@/entities/stat'
import {color_token} from '@/constants/theme'
import {
  SeasonStatsBoxWidget,
  TeamStatsCardList,
  StadiumStatsCardList,
  HomeAwayStatsCardList,
  MyHomeStatsCardList,
} from '@/widgets/stat'

const MatchScreen = () => {
  const router = useAppRouter()
  const {selectedStatsFilter, onChangeSeasonYear, onChangeType, toggleSort} = useSelectedStatsFilter()

  const [open, setOpen] = useState(false)

  const selectedYear = selectedStatsFilter?.year ?? 2025
  const selectedType = selectedStatsFilter?.type ?? '상대구단별'
  const selectedAlignment = selectedStatsFilter?.sort ?? '승률 높은순'

  const isSortedByHighWinRate = () => selectedAlignment === '승률 높은순'

  const toggleAlignment = () => {
    toggleSort()
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <Header
          leftButton={{
            content: (
              <Pressable onPress={() => setOpen(true)} style={styles.headerButton}>
                <Txt size={20} weight="bold">
                  {selectedYear} 시즌
                </Txt>
                <Image source={require('@/assets/icons/arrow_down.png')} style={styles.arrowIcon} />
              </Pressable>
            ),
          }}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentGap}>
            <SeasonStatsBoxWidget year={selectedYear} />
            <Button
              onPress={() => {
                logEvent(EVENTS.WIN_PREDICTION_CLICK, {screen_name: ROUTES.TICKET_MY_STAT})
                router.push(ROUTES.TICKET_MY_STAT)
              }}
              type="secondary">
              나의 승요력 보러가기
            </Button>
            <View style={styles.filterContainer}>
              <SelectBox
                list={STATS_TYPE_LIST}
                value={selectedType}
                onChange={value => onChangeType(value as SelectedStatsType)}
              />
              <Pressable onPress={toggleAlignment} style={sortStyles.container}>
                <Txt size={14} weight="medium" color={color_token.gray600}>
                  {isSortedByHighWinRate() ? '승률 높은순' : '승률 낮은순'}
                </Txt>
                <Image source={require('@/assets/icons/updown.png')} style={sortStyles.icon} />
              </Pressable>
            </View>
            <View style={styles.cardList}>
              {selectedType === '상대구단별' && <TeamStatsCardList />}
              {selectedType === '구장별' && <StadiumStatsCardList />}
              {selectedType === '홈/원정 경기별' && <HomeAwayStatsCardList />}
              {selectedType === '집관 경기별' && <MyHomeStatsCardList />}
            </View>
          </View>
        </ScrollView>
        <SelectSeasonBottomSheet
          isOpen={open}
          value={selectedYear}
          onConfirm={(year, season) => {
            onChangeSeasonYear(year)
            setOpen(false)
          }}
          onCancel={() => setOpen(false)}
        />
      </SafeAreaView>
    </>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowIcon: {
    width: 18,
    height: 18,
  },
  scrollView: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  contentGap: {
    gap: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardList: {
    gap: 12,
    marginTop: 12,
    paddingBottom: 70,
  },
})

const sortStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 16,
    height: 16,
  },
})
