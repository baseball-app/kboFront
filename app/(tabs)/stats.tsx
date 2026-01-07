import {Image, ScrollView, StyleSheet, Text} from 'react-native'
import {View} from 'react-native'
import React, {useState} from 'react'
import {logEvent} from '@/analytics/func'
import {EVENTS} from '@/analytics/event'
import {ROUTES, useAppRouter} from '@/shared'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {LinearBorderBox, Pressable, SelectBox} from '@/shared/ui'
import {SelectSeasonBottomSheet, STATS_TYPE_LIST} from '@/entities/stat'
import {HomeAwayStatsCard, StadiumStatsCard, TeamStatsCard} from '@/entities/stat/ui'

const MatchScreen = () => {
  const router = useAppRouter()

  const [open, setOpen] = useState(false)

  const [selectedYear, setSelectedYear] = useState(2025)
  const [selectedType, setSelectedType] = useState('상대구단별')
  const [selectedAlignment, setSelectedAlignment] = useState('승률 높은순')

  const isSortedByHighWinRate = () => selectedAlignment === '승률 높은순'

  const toggleAlignment = () => {
    setSelectedAlignment(prev => (prev === '승률 높은순' ? '승률 낮은순' : '승률 높은순'))
  }

  return (
    <>
      <SafeAreaView style={[styles.container, {flex: 1}]} edges={['top', 'left', 'right']}>
        <Header
          leftButton={{
            content: (
              <Pressable onPress={() => setOpen(true)} style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Text style={{fontSize: 20, fontWeight: 700, color: '#161617'}}>{selectedYear} 시즌</Text>
                <Image source={require('@/assets/icons/arrow_down.png')} style={{width: 18, height: 18}} />
              </Pressable>
            ),
          }}
        />
        <ScrollView style={{paddingHorizontal: 24, paddingTop: 12}}>
          <View style={{gap: 12}}>
            <LinearBorderBox borderWidth={1.5} borderRadius={10} backgroundColor="#FFFFFF">
              <View style={{flexDirection: 'row', overflow: 'hidden'}}>
                <View
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderWidth: 0.7,
                    borderColor: '#C7C9D0',
                    borderStyle: 'dashed',
                    marginLeft: -1,
                    marginTop: -1,
                    marginBottom: -2,
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>
                    나의 승요력
                  </Text>
                  <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>100%</Text>
                </View>
                <View style={{paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                  <View style={{paddingVertical: 16, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>경기</Text>
                    <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>21</Text>
                  </View>
                  <View style={{paddingVertical: 16, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>승</Text>
                    <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>2</Text>
                  </View>
                  <View style={{paddingVertical: 16, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>패</Text>
                    <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>19</Text>
                  </View>
                  <View style={{paddingVertical: 16, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>무</Text>
                    <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>0</Text>
                  </View>
                </View>
              </View>
            </LinearBorderBox>
            <Pressable
              style={styles.button}
              onPress={() => {
                logEvent(EVENTS.WIN_PREDICTION_CLICK, {screen_name: ROUTES.TICKET_MY_STAT})
                router.push(ROUTES.TICKET_MY_STAT)
              }}>
              <Text style={styles.buttonText}>나의 승요력 보러가기</Text>
            </Pressable>
            <View style={styles.filterContainer}>
              <SelectBox list={STATS_TYPE_LIST} value={selectedType} onChange={setSelectedType} />
              <Pressable onPress={toggleAlignment} style={sortStyles.container}>
                <Text style={sortStyles.text}>{isSortedByHighWinRate() ? '승률 높은순' : '승률 낮은순'}</Text>
                <Image source={require('@/assets/icons/updown.png')} style={sortStyles.icon} />
              </Pressable>
            </View>
            <View style={{gap: 12, marginTop: 12, paddingBottom: 70}}>
              <TeamStatsCard teamName="삼성 라이온즈" matchResult={{win: 2, draw: 0, lose: 19}} />
              <TeamStatsCard teamName="두산 베어스" matchResult={{win: 2, draw: 0, lose: 19}} />
              <StadiumStatsCard stadiumName="부산 사직 야구장" matchResult={{win: 2, draw: 0, lose: 19}} />
              <StadiumStatsCard stadiumName="대구 삼성 라이온즈 파크" matchResult={{win: 2, draw: 0, lose: 19}} />
              <HomeAwayStatsCard title="홈" matchResult={{win: 2, draw: 0, lose: 19}} />
              <HomeAwayStatsCard title="원정" matchResult={{win: 2, draw: 0, lose: 19}} />
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#081B46',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})

const sortStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 15 * 1.4,
    color: '#6D6C77',
  },
  icon: {
    width: 16,
    height: 16,
  },
})
