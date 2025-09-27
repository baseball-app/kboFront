import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {TeamWithInfo} from '../types'
import {format} from 'date-fns'
import Ellipse from '@/components/common/Ellipse'

type TicketCardProps = {
  ticket: {
    score_our: number
    score_opponent: number
    ballpark: {
      name: string
    }
    date: string
    gip_place: string
  }
  homeTeam?: TeamWithInfo
  awayTeam?: TeamWithInfo
  opponentTeam?: TeamWithInfo
  onClick: () => void
}

const TicketCard = ({ticket, homeTeam, awayTeam, opponentTeam, onClick}: TicketCardProps) => {
  return (
    <View style={styles.teamCard}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 12}}>
        <View style={[styles.teamLabel, {backgroundColor: opponentTeam?.color ?? 'white'}]} />
        <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
          <View style={{display: 'flex', alignItems: 'center', width: 38}}>
            <Text style={styles.teamName}>{homeTeam?.short_name}</Text>
            <Text style={styles.teamScoreText}>{ticket.score_our}</Text>
          </View>
          <View style={{display: 'flex', gap: 6, justifyContent: 'center'}}>
            <Ellipse size={3} />
            <Ellipse size={3} />
          </View>
          <View style={{display: 'flex', alignItems: 'center', width: 38}}>
            <Text style={styles.teamName}>{awayTeam?.short_name}</Text>
            <Text style={styles.teamScoreText}>{ticket.score_opponent}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          width: 140,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#B9B8B3',
          borderStyle: 'dashed',
          justifyContent: 'center',
          borderRadius: 1,
          height: 102,
          marginRight: -2,
        }}>
        <Text style={styles.parkName} numberOfLines={1}>
          {ticket.gip_place || ticket.ballpark.name}
        </Text>
        <Text style={[styles.date, {marginBottom: 4}]}>{format(ticket.date, 'yyyy.MM.dd')}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClick}
          style={{
            backgroundColor: '#1E5EF4',
            padding: 8,
            borderRadius: 30,
            width: 'auto',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: 500}}>티켓보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export {TicketCard}

const styles = StyleSheet.create({
  teamCard: {
    gap: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    height: 100,
  },
  teamName: {
    fontSize: 16,
    color: '#171716',
    fontWeight: 500,
    lineHeight: 24,
  },
  teamScoreText: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: -2.5,
    textAlign: 'center',
  },
  teamLabel: {
    width: 8,
    height: 100,
  },
  parkName: {
    fontSize: 14,
    color: '#171716',
    fontWeight: 400,
    lineHeight: 21,
  },
  date: {
    fontSize: 13,
    color: '#95938B',
    fontWeight: 400,
    lineHeight: 19.5,
    textAlign: 'center',
  },
})
