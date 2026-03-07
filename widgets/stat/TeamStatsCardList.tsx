import React, {useCallback, useMemo} from 'react';
import {useOpponentWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat';
import {TeamStatsCard} from '@/entities/stat/ui';
import {StatsList} from './StatsList';
import {useNavigateToStatsDetail} from '@/features/stats';
import {EventTracker} from '@/analytics/EventTracker';

const TeamStatsCardList = () => {
  const {selectedStatsFilter, sortDataByWinRate} = useSelectedStatsFilter();
  const year = selectedStatsFilter.year;
  const {data, isLoading, isError} = useOpponentWinPercentByYear({year});

  const {navigateToOpponentStatsDetail} = useNavigateToStatsDetail();

  const sortedData = useMemo(() => {
    if (!data?.opponent_win_stat) return [];
    return sortDataByWinRate([...data.opponent_win_stat]);
  }, [data, sortDataByWinRate]);

  const renderItem = useCallback(({item}: {item: (typeof sortedData)[0]}) => {
    return (
      <EventTracker
        eventName="상대구단별"
        params={{team_name: item.team_nm, win: item.wins, draw: item.draws, lose: item.losses}}>
        <TeamStatsCard
          onPress={() => navigateToOpponentStatsDetail(item.opponent_id)}
          key={item.opponent_id}
          teamName={item.team_nm}
          matchResult={{
            win: item.wins,
            draw: item.draws,
            lose: item.losses,
          }}
        />
      </EventTracker>
    );
  }, []);

  return (
    <StatsList
      data={sortedData}
      isLoading={isLoading}
      isError={isError} //
      renderItem={renderItem}
    />
  );
};

export {TeamStatsCardList};
