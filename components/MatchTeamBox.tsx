import {Match} from '@/app/(tabs)/match'
import {findTeamById} from '@/constants/join'
import {format} from 'date-fns'
import React from 'react'
import {View, Image, Text, StyleSheet, ImageSourcePropType} from 'react-native'

/** 매치 팀 경기 카드 컴포넌트 */
const MatchTeamBox = ({game_date, team_away_info, team_home_info, ballpark_info}: Match) => {
  const time = format(game_date, 'HH:mm')

  return (
    <View style={styles.gameInfoBox}>
      {/* <View style={isSelected ? styles.gameSelectedInfoBox : styles.gameInfoBox}> */}
      <View style={styles.matchDayBox}>
        <Text style={styles.matchDayTitle}>{time}</Text>
        <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" />
        <Text style={[styles.matchDayTitle, {marginLeft: 3}]}>{ballpark_info.name}</Text>
      </View>
      <View style={styles.matchTeamBox}>
        <View style={styles.matchTeamInfo}>
          <Image source={findTeamById(team_home_info.id)?.logo} resizeMode="contain" style={{width: 35, height: 35}} />
          <View style={styles.ellipseBox}>
            <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" />
            <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" />
          </View>
          <Image source={findTeamById(team_away_info.id)?.logo} resizeMode="contain" style={{width: 35, height: 35}} />
        </View>
        <View style={styles.teamNameBox}>
          <Text style={styles.teamText}>{team_home_info.name}</Text>
          <Text style={styles.teamText}>{team_away_info.name}</Text>
        </View>
      </View>
    </View>
  )
}

export default MatchTeamBox

const styles = StyleSheet.create({
  gameInfoBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D0CEC7',
    height: 113,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameSelectedInfoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#353430',
    height: 113,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  matchTeamBox: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  matchDayBox: {
    borderRadius: 10,
    backgroundColor: '#F3F2EE',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  matchDayTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
    color: '#000000',
  },
  matchTeamInfo: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
  },
  ellipseBox: {
    flexDirection: 'column',
    gap: 6,
    justifyContent: 'center',
  },
  teamNameBox: {
    width: '100%',
    marginTop: 4,
    flexDirection: 'row',
    gap: 45,
    justifyContent: 'center',
  },
  teamText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
    textAlign: 'center',
    width: 35,
  },
  teamImg: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
})
