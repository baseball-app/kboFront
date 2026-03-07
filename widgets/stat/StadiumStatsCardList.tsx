import React, {useCallback, useMemo} from 'react';
import {useBallparkWinPercentByYear, useSelectedStatsFilter} from '@/entities/stat';
import {StadiumStatsCard} from '@/entities/stat/ui';
import {StatsList} from './StatsList';
import {useNavigateToStatsDetail} from '@/features/stats';
import {EventTracker} from '@/analytics/EventTracker';

const StadiumStatsCardList = () => {
  const {selectedStatsFilter, sortDataByWinRate} = useSelectedStatsFilter();
  const year = selectedStatsFilter?.year ?? 2026;
  const {data, isLoading, isError} = useBallparkWinPercentByYear({year});

  const {navigateToBallparkStatsDetail} = useNavigateToStatsDetail();

  const sortedData = useMemo(() => {
    if (!data?.by_user_ballpark_win_stat) return [];
    return sortDataByWinRate([...data.by_user_ballpark_win_stat]);
  }, [data, sortDataByWinRate]);

  const renderItem = useCallback(({item}: {item: (typeof sortedData)[0]}) => {
    return (
      <EventTracker
        eventName="구장별"
        params={{stadium_name: item.ballpark_nm, win: item.wins, draw: item.draws, lose: item.losses}}>
        <StadiumStatsCard
          onPress={() => navigateToBallparkStatsDetail(item.ballpark_id)}
          key={item.ballpark_id}
          stadiumName={item.ballpark_nm}
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

export {StadiumStatsCardList};
