import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TeamWithInfo} from '../types';
import Ellipse from '@/components/common/Ellipse';
import dayjs from 'dayjs';
import {getTempBaseballMediumName, size} from '@/shared';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

type TicketCardProps = {
  ticket: {
    score_our: number;
    score_opponent: number;
    ballpark: {
      name: string;
    };
    date: string;
    gip_place: string;
  };
  homeTeam?: TeamWithInfo;
  awayTeam?: TeamWithInfo;
  opponentTeam?: TeamWithInfo;
  onClick: () => void;
};

const TicketCard = ({ticket, homeTeam, awayTeam, opponentTeam, onClick}: TicketCardProps) => {
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamRowContainer}>
        <View style={[styles.teamLabel, {backgroundColor: opponentTeam?.color ?? color_token.white}]} />
        <View style={styles.scoreContainer}>
          <View style={styles.teamScoreBox}>
            <Txt size={16} weight="medium" color={color_token.gray900}>
              {homeTeam?.short_name}
            </Txt>
            <Txt size={32} weight="bold" style={styles.teamScoreTextFullWidth}>
              {ticket.score_our}
            </Txt>
          </View>
          <View style={styles.ellipseContainer}>
            <Ellipse size={3} />
            <Ellipse size={3} />
          </View>
          <View style={styles.teamScoreBox}>
            <Txt size={16} weight="medium" color={color_token.gray900}>
              {awayTeam?.short_name}
            </Txt>
            <Txt size={32} weight="bold" style={styles.teamScoreTextFullWidth}>
              {ticket.score_opponent}
            </Txt>
          </View>
        </View>
      </View>
      <View style={styles.infoBox}>
        <Txt size={14} weight="regular" color={color_token.gray800} numberOfLines={1}>
          {getTempBaseballMediumName(ticket.gip_place || ticket.ballpark.name)}
        </Txt>
        <Txt size={13} weight="regular" color={color_token.gray500} style={styles.dateMargin}>
          {dayjs(ticket.date).format('YYYY.MM.DD')}
        </Txt>
        <TouchableOpacity activeOpacity={0.8} onPress={onClick} style={styles.viewTicketButton}>
          <Txt size={13} weight="medium" color={color_token.white}>
            티켓보기
          </Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {TicketCard};

const styles = StyleSheet.create({
  teamCard: {
    gap: size(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color_token.white,
    borderRadius: size(10),
    overflow: 'hidden',
    height: size(100),
  },
  teamRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: size(20),
    justifyContent: 'center',
    marginHorizontal: 'auto',
    width: '100%',
  },
  teamScoreBox: {
    display: 'flex',
    alignItems: 'center',
    width: size(46),
  },
  teamScoreTextFullWidth: {
    width: '100%',
    letterSpacing: -2.5,
    textAlign: 'center',
  },
  ellipseContainer: {
    display: 'flex',
    gap: size(6),
    justifyContent: 'center',
  },
  teamLabel: {
    width: size(8),
    height: size(100),
  },
  infoBox: {
    display: 'flex',
    width: size(140),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color_token.gray400,
    borderStyle: 'dashed',
    justifyContent: 'center',
    borderRadius: size(1),
    height: size(104),
    marginRight: size(-2),
    marginBottom: size(-2),
    marginTop: size(-2),
  },
  dateMargin: {
    marginBottom: size(4),
  },
  viewTicketButton: {
    backgroundColor: color_token.primary,
    paddingHorizontal: size(10),
    paddingVertical: size(5),
    borderRadius: size(40),
    width: 'auto',
    alignSelf: 'center',
  },
});
