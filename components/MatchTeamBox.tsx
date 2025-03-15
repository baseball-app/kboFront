import {Match} from '@/hooks/match/useMatch'
import {format} from 'date-fns'
import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ellipse from './common/Ellipse'
import useTeam from '@/hooks/match/useTeam'

type Props = {
  match: Match
  onClick: () => void
  isSelected?: boolean
}

/** 매치 팀 경기 카드 컴포넌트 */
const MatchTeamBox = ({match, onClick, isSelected}: Props) => {
  const time = format(match.game_date, 'HH:mm')
  const {findTeamById, teams} = useTeam()

  const homeTeam = findTeamById(match.team_home_info.id)
  const awayTeam = findTeamById(match.team_away_info.id)

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
      <View
        style={[
          styles.gameInfoBox, //
          isSelected && styles.gameSelectedInfoBox,
        ]}>
        <View style={styles.matchDayBox}>
          <Text style={styles.matchDayTitle}>{time}</Text>
          <Ellipse />
          <Text style={[styles.matchDayTitle, {marginLeft: 3}]}>{match.ballpark_info.name.slice(0, 2)}</Text>
        </View>
        <View style={styles.matchTeamBox}>
          <View style={styles.matchTeamInfo}>
            <Image source={homeTeam?.logo} resizeMode="contain" style={{width: 35, height: 35}} />
            <View style={styles.ellipseBox}>
              <Ellipse size={5} />
              <Ellipse size={5} />
            </View>
            <Image source={awayTeam?.logo} resizeMode="contain" style={{width: 35, height: 35}} />
          </View>
          <View style={styles.teamNameBox}>
            <Text style={styles.teamText}>{homeTeam?.short_name}</Text>
            <Text style={styles.teamText}>{awayTeam?.short_name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  disabledGameInfoBox: {
    backgroundColor: '#DDDDDD88',
  },
  gameSelectedInfoBox: {
    borderColor: '#353430',
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
