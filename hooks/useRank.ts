import ApiClient from '@/api'
import {useQuery} from '@tanstack/react-query'
import dayjs from 'dayjs'

type Rank = {
  id: number
  ranking: number
  ranks: {
    name: string
  }
  compare: 'stay' | 'up' | 'down'
  updated_at: string
}

const useRank = () => {
  const today = dayjs().format('YY.MM.DD')
  const {data, isLoading} = useQuery<Rank[]>({
    queryKey: ['rank', today],
    queryFn: () => ApiClient.get<Rank[]>(`/ranks/rank_list/`),
    staleTime: 1000 * 60 * 5,
  })
  const standardDate = dayjs(data?.[0].updated_at).format('YY.MM.DD')

  return {data, standardDate, isLoading}
}

export {useRank, type Rank}
