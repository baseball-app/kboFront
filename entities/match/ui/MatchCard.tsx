import {Match} from '@/entities/match'
import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Ellipse from '@/components/common/Ellipse'
import {useTeam} from '../model'
import dayjs from 'dayjs'
import {size} from '@/shared'
import {color_token} from '@/constants/theme'
import {Pressable, Txt} from '@/shared/ui'

type Props = {
  match: Match
  onClick: () => void
  isSelected?: boolean
}

/** 매치 팀 경기 카드 컴포넌트 */
const MatchCard = ({match, onClick, isSelected}: Props) => {
  const time = dayjs(match.game_date).format('HH:mm')
  const {findTeamById} = useTeam()

  const homeTeam = findTeamById(match.team_home_info.id)
  const awayTeam = findTeamById(match.team_away_info.id)

  return (
    <Pressable onPress={onClick}>
      <View
        style={[
          styles.gameInfoBox, //
          isSelected && styles.gameSelectedInfoBox,
        ]}>
        <View style={styles.matchDayBox}>
          <Txt size={14} color={color_token.black}>
            {time}
          </Txt>
          <Ellipse />
          <Txt size={14} color={color_token.black} style={{marginLeft: size(3)}}>
            {match.ballpark_info.name.slice(0, 2)}
          </Txt>
        </View>
        <View style={styles.matchTeamBox}>
          <View style={styles.matchTeamInfo}>
            <Image source={homeTeam?.logo} resizeMode="contain" style={{width: size(35), height: size(35)}} />
            <View style={styles.ellipseBox}>
              <Ellipse size={size(5)} />
              <Ellipse size={size(5)} />
            </View>
            <Image source={awayTeam?.logo} resizeMode="contain" style={{width: size(35), height: size(35)}} />
          </View>
          <View style={styles.teamNameBox}>
            <Txt size={14} color={color_token.black}>
              {homeTeam?.short_name}
            </Txt>
            <Txt size={14} color={color_token.black}>
              {awayTeam?.short_name}
            </Txt>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export {MatchCard}

const styles = StyleSheet.create({
  gameInfoBox: {
    backgroundColor: color_token.white,
    borderRadius: size(10),
    width: '100%',
    borderWidth: 1,
    borderColor: color_token.gray350,
    height: size(113),
    padding: size(12),
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameSelectedInfoBox: {
    borderColor: color_token.gray800,
  },
  matchTeamBox: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: size(12),
  },
  matchDayBox: {
    borderRadius: size(10),
    backgroundColor: color_token.gray200,
    paddingHorizontal: size(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(5),
  },
  matchTeamInfo: {
    flexDirection: 'row',
    gap: size(20),
    width: '100%',
    justifyContent: 'center',
  },
  ellipseBox: {
    flexDirection: 'column',
    gap: size(6),
    justifyContent: 'center',
  },
  teamNameBox: {
    width: '100%',
    marginTop: size(4),
    flexDirection: 'row',
    gap: size(45),
    justifyContent: 'center',
  },
})
