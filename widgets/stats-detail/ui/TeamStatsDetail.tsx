import React from 'react';
import {DetailSummary} from './DetailSummary';
import {StyleSheet, View} from 'react-native';
import {Txt} from '@/shared/ui';
import {useTeam} from '@/entities/match';
import {MyTicketList} from '@/widgets/ticket/my-ticket-list';
import {useQuery} from '@tanstack/react-query';
import ApiClient from '@/api';
import * as schema from '@/entities/ticket/types';
import {useOpponentWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat';
import {size} from '@/shared';
import {color_token} from '@/constants/theme';

type Props = {
  parameter_id: number;
};

function TeamStatsDetail({parameter_id}: Props) {
  const {teams} = useTeam();
  const team = teams?.find(team => team.id === parameter_id);

  const {selectedStatsFilter} = useSelectedStatsFilter();
  const {data: opponentWinPercentByYear} = useOpponentWinPercentByYear({year: selectedStatsFilter.year});

  const opponentMatch = opponentWinPercentByYear?.opponent_win_stat?.find(item => item.opponent_id === parameter_id);
  const opponentWin = opponentMatch?.wins ?? 0;
  const opponentDraw = opponentMatch?.draws ?? 0;
  const opponentLoss = opponentMatch?.losses ?? 0;
  const opponentTotal = opponentWin + opponentDraw + opponentLoss;
  const opponentPercent = Math.floor((opponentWin / opponentTotal) * 100);
  // 직관승률
  const directMatchPercent = opponentMatch?.ballpark_win_percent ?? '-';
  // 집관승률
  const notDirectMatchPercent = opponentMatch?.non_ballpark_win_percent ?? '-';

  const {data, isLoading} = useQuery({
    queryKey: ['tickets', 'teamStatsDetail', parameter_id],
    queryFn: () =>
      ApiClient.get<schema.TicketListByTeam[]>('/tickets/ticket_based_view_list/', {
        parameter_id: parameter_id,
        view_gbn: 'team',
      }),
  });

  return (
    <View style={styles.container}>
      <Txt weight="bold" size={22} style={styles.title}>
        {team?.name} 상대 경기 통계
      </Txt>
      <View style={styles.powerBoxContainer}>
        <View style={styles.powerBox}>
          <Txt size={16}>직관승률</Txt>
          <Txt size={24} weight="bold">
            {directMatchPercent}%
          </Txt>
        </View>
        <View style={styles.powerBox}>
          <Txt size={16}>직관승률</Txt>
          <Txt size={24} weight="bold">
            {notDirectMatchPercent}%
          </Txt>
        </View>
      </View>

      <DetailSummary
        title={`${team?.short_name}전 승요력`}
        percent={opponentPercent}
        win={opponentWin}
        draw={opponentDraw}
        lose={opponentLoss}
      />
      <View style={styles.contents}>
        <Txt size={18} weight="bold" style={styles.contentsTitle}>
          경기 티켓 보기
        </Txt>
        <MyTicketList isLoading={isLoading} ticketList={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {paddingBottom: size(24)},
  container: {
    paddingHorizontal: size(24),
    paddingTop: size(16),
  },
  contents: {
    paddingTop: size(28),
  },
  contentsTitle: {
    paddingBottom: size(20),
  },
  powerBox: {
    alignItems: 'center',
    paddingVertical: size(8),
    borderRadius: size(8),
    backgroundColor: color_token.white,
    borderWidth: 1,
    borderColor: color_token.gray350,
    flex: 1,
  },
  powerBoxContainer: {
    flexDirection: 'row',
    gap: size(15),
    marginBottom: size(12),
  },
});

export {TeamStatsDetail};
