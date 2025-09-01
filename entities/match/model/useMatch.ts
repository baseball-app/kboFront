import ApiClient from '@/api'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import dayjs from 'dayjs'
import {Match} from '../types'
import {getMatchByDate} from '../api'

const useMatch = ({selectedDate}: {selectedDate: Date | null}) => {
  const startDate = dayjs(selectedDate).format('YYYY-MM-DD')
  const queryClient = useQueryClient()

  const {
    data: matchingList,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['matchTeam', startDate],
    queryFn: async () => getMatchByDate(startDate),
    enabled: Boolean(selectedDate),
  })

  const prefetchMatchList = async (date: string) => {
    const queryKey = ['matchTeam', date]
    const data = queryClient.getQueryData<Match[]>(queryKey)

    if (data) return

    return queryClient.prefetchQuery({
      queryKey,
      queryFn: () =>
        ApiClient.get<Match[]>('/games/', {
          end_date: date,
          start_date: date,
        }),
    })
  }

  return {
    matchingList: matchingList || [],
    isSuccess,
    prefetchMatchList,
    isPending,
  }
}

export {useMatch}
