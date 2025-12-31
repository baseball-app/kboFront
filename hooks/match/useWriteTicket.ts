import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import {Match} from '@/entities/match'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {uploadFile} from '@/api'
import useProfile from '../my/useProfile'
import {ROUTES, useAppRouter} from '@/shared'
import dayjs from 'dayjs'
import {IFormData} from '@/types/IFormData'
import {TicketRegisterRequestDto} from '@/features/ticket/create-ticket'

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
  const router = useAppRouter()

  const writeStore = useDailyWriteStore()
  const queryClient = useQueryClient()
  const {profile} = useProfile()

  const initializeTicket = (id: number) => {
    writeStore.clearState()
    queryClient.refetchQueries({queryKey: ['tickets']})

    router.dismissTo(ROUTES.WRITE_TODAY_TICKET_CARD, {
      id: id,
      target_id: profile.id,
    })
  }

  const {mutateAsync: registerTicket, isPending} = useMutation({
    mutationFn: (data: IFormData<TicketRegisterRequestDto>) => uploadFile<{id: number}>(`/tickets/ticket_add/`, data),
    onSuccess: data => initializeTicket(data.id),
  })

  /**
   * 경기일정에서 티켓 작성 페이지로 이동
   * @param match 매치 정보
   * @param date 날짜
   */
  const moveToWriteTicket = (date: Date, match?: Match | null) => {
    if (!match) {
      router.push(ROUTES.WRITE, {
        date: dayjs(date).format('YYYY-MM-DD'),
        step: 2,
      })
      return
    }

    router.push(ROUTES.WRITE, {
      matchId: match?.id,
      date: dayjs(date).format('YYYY-MM-DD'),
      step: 2,
    })
  }

  return {
    moveToWriteTicket,
    registerTicket,
    isPending,
    initializeTicket,
    ...writeStore,
  }
}

export default useWriteTicket
