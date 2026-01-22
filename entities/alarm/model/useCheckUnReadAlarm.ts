import {useQuery} from '@tanstack/react-query';
import * as api from '../api';

export const useCheckUnReadAlarm = () => {
  return useQuery({
    queryKey: ['alarm', 'unread'],
    queryFn: api.hasUnReadAlarm,
    staleTime: 1000 * 20,
  });
};
