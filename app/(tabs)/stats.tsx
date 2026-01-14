import {Image, ScrollView, StyleSheet} from 'react-native'
import {View} from 'react-native'
import React, {useState} from 'react'
import {logEvent} from '@/analytics/func'
import {EVENTS} from '@/analytics/event'
import {ROUTES, useAppRouter} from '@/shared'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {Button, Pressable, SelectBox, Txt} from '@/shared/ui'
import {SelectedStatsType, SelectSeasonBottomSheet, STATS_TYPE_LIST} from '@/entities/stat'
import {HomeAwayStatsCard, StadiumStatsCard, TeamStatsCard} from '@/entities/stat/ui'
import {color_token} from '@/constants/theme'
import {SeasonStatsBoxWidget} from '@/widgets/stat'

const MatchScreen = () => {
  const router = useAppRouter()

  const [open, setOpen] = useState(false)

  const [selectedYear, setSelectedYear] = useState(2025)
  const [selectedType, setSelectedType] = useState<SelectedStatsType>('상대구단별')
  const [selectedAlignment, setSelectedAlignment] = useState('승률 높은순')

  const isSortedByHighWinRate = () => selectedAlignment === '승률 높은순'

  const toggleAlignment = () => {
    setSelectedAlignment(prev => (prev === '승률 높은순' ? '승률 낮은순' : '승률 높은순'))
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
                onChange={value => setSelectedType(value as SelectedStatsType)}
              />
              <Pressable onPress={toggleAlignment} style={sortStyles.container}>
                <Txt size={14} weight="medium" color={color_token.gray600}>
                  {isSortedByHighWinRate() ? '승률 높은순' : '승률 낮은순'}
                </Txt>
                <Image source={require('@/assets/icons/updown.png')} style={sortStyles.icon} />
              </Pressable>
            </View>
            <View style={styles.cardList}>
              {(() => {
                if (selectedType === '상대구단별') {
                  return (
                    <>
                      <TeamStatsCard teamName="삼성 라이온즈" matchResult={{win: 2, draw: 0, lose: 19}} />
                      <TeamStatsCard teamName="두산 베어스" matchResult={{win: 2, draw: 0, lose: 19}} />
                    </>
                  )
                }
                if (selectedType === '구장별') {
                  return (
                    <>
                      <StadiumStatsCard stadiumName="부산 사직 야구장" matchResult={{win: 2, draw: 0, lose: 19}} />
                      <StadiumStatsCard
                        stadiumName="대구 삼성 라이온즈 파크"
                        matchResult={{win: 2, draw: 0, lose: 19}}
                      />
                    </>
                  )
                }
                if (selectedType === '홈/원정 경기별') {
                  return (
                    <>
                      <HomeAwayStatsCard title="홈" matchResult={{win: 2, draw: 0, lose: 19}} />
                      <HomeAwayStatsCard title="원정" matchResult={{win: 2, draw: 0, lose: 19}} />
                    </>
                  )
                }
                if (selectedType === '집관 경기별') {
                  return (
                    <>
                      <TeamStatsCard teamName="두산 베어스" matchResult={{win: 2, draw: 0, lose: 19}} />
                    </>
                  )
                }
                return null
              })()}
            </View>
          </View>
        </ScrollView>
        <SelectSeasonBottomSheet
          isOpen={open}
          value={selectedYear}
          onConfirm={(year, season) => {
            setSelectedYear(year)
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
