import React from 'react';
import {DetailSummary} from './DetailSummary';
import {StyleSheet, View} from 'react-native';
import {Txt} from '@/shared/ui';
import {useTeam} from '@/entities/match';
import {MyTicketList} from '@/widgets/ticket/my-ticket-list';
import {useNotBallparkWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat';
import {useQuery} from '@tanstack/react-query';
import ApiClient from '@/api';
import * as schema from '@/entities/ticket/types';

type Props = {
  parameter_id: number;
};

function TeamStatsByHomeDetail({parameter_id}: Props) {
  const {teams} = useTeam();
  const team = teams?.find(team => team.id === parameter_id);

  const {selectedStatsFilter} = useSelectedStatsFilter();
  const {data: notBallparkWinPercentByYear} = useNotBallparkWinPercentByYear({year: selectedStatsFilter.year});

  const opponentMatch = notBallparkWinPercentByYear?.my_home_win_stat?.find(item => item.team_id === parameter_id);
  const opponentWin = opponentMatch?.wins ?? 0;
  const opponentDraw = opponentMatch?.draws ?? 0;
  const opponentLoss = opponentMatch?.losses ?? 0;
  const opponentTotal = opponentWin + opponentDraw + opponentLoss;
  const opponentPercent = Math.floor((opponentWin / opponentTotal) * 100);

  const {data, isLoading} = useQuery({
    queryKey: ['tickets', 'teamStatsByHomeDetail', parameter_id],
    queryFn: () =>
      ApiClient.get<schema.TicketListByTeam[]>('/tickets/ticket_is_ballpark_view_list/', {
        parameter_id: parameter_id,
      }),
  });

  return (
    <View style={styles.container}>
      <Txt weight="bold" size={22} style={styles.title}>
        {team?.name}상대 경기 통계
      </Txt>
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
  title: {paddingBottom: 24},
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  contents: {
    paddingTop: 28,
  },
  contentsTitle: {
    paddingBottom: 20,
  },
});

export {TeamStatsByHomeDetail};
