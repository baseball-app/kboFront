import React from 'react';
import {DetailSummary} from './DetailSummary';
import {StyleSheet, View} from 'react-native';
import {Txt} from '@/shared/ui';
import {MyTicketList} from '@/widgets/ticket/my-ticket-list';
import {useQuery} from '@tanstack/react-query';
import ApiClient from '@/api';
import * as schema from '@/entities/ticket/types';
import {useBallparkWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat';
import {getTempBaseballMediumName} from '@/shared';

type Props = {
  parameter_id: number;
};

function StadiumStatsDetail({parameter_id}: Props) {
  const {selectedStatsFilter} = useSelectedStatsFilter();
  const {data: ballparkWinPercentByYear} = useBallparkWinPercentByYear({year: selectedStatsFilter.year});

  const ballpark = ballparkWinPercentByYear?.by_user_ballpark_win_stat?.find(item => item.ballpark_id === parameter_id);
  const ballparkName = ballpark?.ballpark_nm;
  const ballparkWin = ballpark?.wins ?? 0;
  const ballparkDraw = ballpark?.draws ?? 0;
  const ballparkLoss = ballpark?.losses ?? 0;
  const ballparkTotal = ballparkWin + ballparkDraw + ballparkLoss;
  const ballparkPercent = Math.floor((ballparkWin / ballparkTotal) * 100);

  const {data, isLoading} = useQuery({
    queryKey: ['stadiumStatsDetail', parameter_id],
    queryFn: () =>
      ApiClient.get<schema.TicketListByTeam[]>('/tickets/ticket_based_view_list/', {
        parameter_id: parameter_id,
        view_gbn: 'ballpark',
      }),
  });

  return (
    <View style={styles.container}>
      <Txt weight="bold" size={22} style={styles.title}>
        {getTempBaseballMediumName(ballparkName ?? '')} 경기 통계
      </Txt>
      <DetailSummary
        title={`직관 승률`}
        percent={ballparkPercent}
        win={ballparkWin}
        draw={ballparkDraw}
        lose={ballparkLoss}
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

export {StadiumStatsDetail};
