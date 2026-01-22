import {useAnalyticsStore} from '@/analytics/event';
import {EmptyMatchView, LoadingMatchList, Match, MatchCard, MatchWeekCalendar, useMatch} from '@/entities/match';
import {AddDoubleHeaderTicketButton, useNavigateWriteTicket} from '@/features/match';
import {size} from '@/shared';
import dayjs from 'dayjs';
import {usePathname} from 'expo-router';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

const MatchList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const date = dayjs(selectedDate).format('YYYY-MM-DD');

  // 경기 목록
  const {matchingList, isPending} = useMatch({selectedDate});

  // validation 이후, 티켓 작성 페이지로 이동
  const {moveToDoubleHeaderWriteTicket, moveToMatchWriteTicket} = useNavigateWriteTicket();

  const {setScreenName, setDiaryCreate} = useAnalyticsStore();
  const pathname = usePathname();

  // 페이지 이동 시, 날짜 초기화
  useEffect(() => {
    if (dayjs().isSame(selectedDate, 'date')) return;
    if (pathname !== '/match' && !pathname.includes('write')) setSelectedDate(new Date());
  }, [pathname]);

  const renderItem = useCallback(
    ({item: match}: {item: Match}) => (
      <MatchCard
        match={match} //
        onClick={() => {
          setScreenName(pathname);
          setDiaryCreate('경기 일정');
          moveToMatchWriteTicket(date, match.id);
        }}
      />
    ),
    [moveToMatchWriteTicket, date],
  );

  const keyExtractor = useCallback((item: Match) => `${item.id}`, []);

  return (
    <>
      <View style={{paddingHorizontal: size(24)}}>
        <MatchWeekCalendar //
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={matchingList}
        ListEmptyComponent={
          isPending ? <LoadingMatchList /> : <EmptyMatchView onClick={() => moveToDoubleHeaderWriteTicket(date)} />
        }
        scrollEnabled
        renderItem={renderItem}
        ListFooterComponent={
          matchingList.length > 0 ? (
            <AddDoubleHeaderTicketButton onPress={() => moveToDoubleHeaderWriteTicket(date)} /> //
          ) : null
        }
        keyExtractor={keyExtractor}
      />
    </>
  );
};

export {MatchList};

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 8,
    paddingHorizontal: 24,
    paddingBottom: 20,
    rowGap: 20,
  },
});
