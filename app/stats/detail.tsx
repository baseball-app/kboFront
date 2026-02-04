import Header from '@/components/common/Header';
import {StatsDetailType, useNavigateToStatsDetail} from '@/features/stats';
import {
  AwayStatsDetail,
  HomeStatsDetail,
  StadiumStatsDetail,
  TeamStatsByHomeDetail,
  TeamStatsDetail,
} from '@/widgets/stats-detail/ui';
import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function StatsDetailScreen() {
  const {getQuery} = useNavigateToStatsDetail();
  const query = getQuery();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{paddingBottom: 24}}>
        <Header hasBackButton variants="transparent" />
        {query.type === StatsDetailType.OPPONENT && <TeamStatsDetail parameter_id={query.parameter_id} />}
        {query.type === StatsDetailType.BALLPARK && <StadiumStatsDetail parameter_id={query.parameter_id} />}
        {query.type === StatsDetailType.HOME && <HomeStatsDetail is_homeballpark />}
        {query.type === StatsDetailType.AWAY && <AwayStatsDetail is_homeballpark={false} />}
        {query.type === StatsDetailType.MY_HOME && <TeamStatsByHomeDetail parameter_id={query.parameter_id} />}
      </ScrollView>
    </SafeAreaView>
  );
}
