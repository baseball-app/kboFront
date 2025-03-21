import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import {Match} from './useMatch'
import {useRouter} from 'expo-router'
import {format} from 'date-fns'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {uploadFile} from '@/api'
import useProfile from '../my/useProfile'

export type RegisterTicket = {
  starting_pitchers: string
  is_double: boolean
  score_opponent: number
  only_me: boolean
  game: string
  weather: string //흐림
  gip_place: string
  memo: string
  image: string
  result: string //승리
  is_homeballpark: boolean
  food: string
  is_ballpark: boolean
  score_our: number
}

const useWriteTicket = () => {
  const router = useRouter()

  const writeStore = useDailyWriteStore()
  const queryClient = useQueryClient()
  const {profile} = useProfile()

  const {mutateAsync: registerTicket, isPending} = useMutation({
    mutationFn: (data: FormData) => uploadFile<{id: number}>(`/tickets/ticket_add/`, data),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['tickets']})

      router.push({
        pathname: '/write/todayTicketCard', //
        params: {id: data.id, target_id: profile.id},
      })
    },
  })

  /**
   * 경기일정에서 티켓 작성 페이지로 이동
   * @param match 매치 정보
   * @param date 날짜
   */
  const moveToWriteTicket = (date: Date, match: Match | null) => {
    router.push({
      pathname: '/write',
      params: {
        matchId: match?.id,
        date: format(date, 'yyyy-MM-dd'),
        step: 2,
      },
    })
  }

  return {
    moveToWriteTicket,
    registerTicket,
    isPending,
    ...writeStore,
  }
}

export default useWriteTicket
