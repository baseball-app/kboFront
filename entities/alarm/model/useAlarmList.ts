import {useInfiniteQuery} from '@tanstack/react-query';
import * as api from '../api';

const useAlarmList = () => {
  const {data, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery({
    queryKey: ['notification'],
    queryFn: ({pageParam}) => api.getNotification(pageParam),
    getNextPageParam: ({last_page}, allPages, lastPageParam, allPageParams) =>
      last_page === lastPageParam ? null : lastPageParam + 1,
    initialPageParam: 1,
    staleTime: 1000 * 20,
  });

  const fetchNextNotificationPage = () => {
    if (hasNextPage) fetchNextPage();
  };

  return {
    alarmList: data?.pages.flatMap(_ => _.results) || [],
    fetchNextPage: fetchNextNotificationPage,
    refetch,
  };
};

export {useAlarmList};
