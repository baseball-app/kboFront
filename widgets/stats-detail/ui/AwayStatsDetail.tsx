import React from 'react';
import {DetailSummary} from './DetailSummary';
import {StyleSheet, View} from 'react-native';
import {Txt} from '@/shared/ui';
import {MyTicketList} from '@/widgets/ticket/my-ticket-list';
import {useQuery} from '@tanstack/react-query';
import ApiClient from '@/api';
import * as schema from '@/entities/ticket/types';
import {useHomeAwayWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat';

function AwayStatsDetail({is_homeballpark}: {is_homeballpark: boolean}) {
  const {selectedStatsFilter} = useSelectedStatsFilter();
  const year = selectedStatsFilter.year;
  const {data: homeAwayWinPercentByYear} = useHomeAwayWinPercentByYear({year});
  const awayMatch = homeAwayWinPercentByYear?.home_away_win_stat?.find(item => item.home_away === 'away');

  const awayWin = awayMatch?.wins ?? 0;
  const awayDraw = awayMatch?.draws ?? 0;
  const awayLoss = awayMatch?.losses ?? 0;
  const awayTotal = awayWin + awayDraw + awayLoss;
  const awayPercent = Math.floor((awayWin / awayTotal) * 100);

  const {data, isLoading} = useQuery({
    queryKey: ['awayStatsDetail', is_homeballpark],
    queryFn: () =>
      ApiClient.get<schema.TicketListByTeam[]>('/tickets/ticket_is_homeballpark_view_list/', {
        is_homeballpark: is_homeballpark,
      }),
  });

  return (
    <View style={styles.container}>
      <Txt weight="bold" size={22} style={styles.title}>
        원정 경기 통계
      </Txt>
      <DetailSummary title={`직관 승률`} percent={awayPercent} win={awayWin} draw={awayDraw} lose={awayLoss} />
      <View style={styles.contents}>
        <Txt size={18} weight="bold" style={styles.contentsTitle}>
          경기 티켓 보기
        </Txt>
        <MyTicketList isLoading={isLoading} ticketList={data} />
      </View>
    </View>
  );
}

export {AwayStatsDetail};

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
