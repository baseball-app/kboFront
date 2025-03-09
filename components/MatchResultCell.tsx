import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native'
import {TicketCalendarLog} from './home/Calendar'
import {findMatchResultImage} from '@/constants/match'
import {findTeamById} from '@/constants/join'

//TODO: 애니메이션 및 컴포넌트 리팩터링 필요함
const MatchResultCell = ({data, onPress}: {data: TicketCalendarLog[]; onPress: () => void}) => {
  const matchResult = data[0]?.result
  const opponent = findTeamById(data[0]?.opponent?.id)
  const myTeam = findTeamById(data[0]?.ballpark?.team_id)

  return (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={onPress}>
      {matchResult ? (
        <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image source={findMatchResultImage(matchResult)} style={styles.moodContainer} />
          <Text style={styles.teamText}>
            {myTeam?.shortName}:{opponent?.shortName}
          </Text>
          {data.length == 1 && (
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
