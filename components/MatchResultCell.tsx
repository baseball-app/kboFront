import React, {useMemo} from 'react'
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native'
import {findMatchResultImage} from '@/constants/match'
import {useTeam} from '@/entities/match'
import {TicketCalendarLog} from '@/entities/ticket/types'

//TODO: 애니메이션 및 컴포넌트 리팩터링 필요함
const MatchResultCell = ({
  data,
  onPress,
  isLoading,
}: {
  data: TicketCalendarLog[]
  onPress: () => void
  isLoading: boolean
}) => {
  const {findTeamByName} = useTeam()

  const {matchResult, opponent, myTeam} = useMemo(() => {
    const res = data[0]
    if (!res) return {matchResult: null, myTeam: null, opponent: null}
    return {
      matchResult: res.result,
      myTeam: findTeamByName(res.home),
      opponent: findTeamByName(res.opponent_name),
    }
  }, [data, findTeamByName])

  console.log(data)

  return (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={onPress}>
      {matchResult ? (
        <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image source={findMatchResultImage(matchResult)} style={styles.moodContainer} />
          <Text style={styles.teamText}>
            {myTeam?.short_name}:{opponent?.short_name}
          </Text>
          {data.length > 1 && (
            <View style={{flexDirection: 'row', gap: 3}}>
              <View style={[styles.swiperDot]} />
              <View style={[styles.swiperDot]} />
            </View>
          )}
        </View>
      ) : (
        <View style={[styles.moodContainer]} />
      )}
    </TouchableOpacity>
  )
}

export default MatchResultCell

const styles = StyleSheet.create({
  moodContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 2,
  },
  swiperDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#1E5EF4',
  },
  teamText: {
    width: '100%',
    color: '#171716',
    fontSize: 10,
    fontWeight: 400,
    textAlign: 'center',
    lineHeight: 14,
  },
})
