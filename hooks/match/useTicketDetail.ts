import ApiClient from '@/api'
import {useMutation, useQuery} from '@tanstack/react-query'
import {RegisterTicket} from './useWriteTicket'

type TicketDetail = {
  id: number
  date: string // '2024-03-22'
  result: string // '승리'
  weather: string // '흐림'
  is_ballpark: boolean
  score_our: number
  score_opponent: number
  starting_pitchers: string // '고우석'
  gip_place: string // 'ㅇㅇ'
  image: string // '/https%3A/kboapp-cdn.s3.amazonaws.com/5/20250303_siPoBDqgSie2V2QRReTZJQ'
  food: string // 'string'
  memo: string // 'string'
  is_homeballpark: boolean
  created_at: string // '2025-03-03T10:56:30.470226+09:00'
  updated_at: string // '2025-03-03T10:56:30.892490+09:00'
  ballpark: number
  game: number
  opponent: number
  writer: number
  like: number
  love: number
  haha: number
  yay: number
  wow: number
  sad: number
  angry: number
  only_me: boolean
  is_double: boolean
  favorite: boolean
}

//
export type ReactionType = 'like' | 'love' | 'haha' | 'yay' | 'wow' | 'sad' | 'angry'

const useTicketDetail = (id: number) => {
  const {data} = useQuery({
    queryKey: ['ticket', id],
    queryFn: () =>
      ApiClient.get<TicketDetail>(`/tickets/ticket_detail/`, {
        ticket_id: id,
      }),
    enabled: Boolean(id),
  })

  // 직관일기 삭제
  const {mutateAsync: deleteTicket} = useMutation({
    mutationFn: () => ApiClient.post(`/tickets/ticket_del/`, {id}),
  })

  // 직관일기 수정
  const {mutateAsync: updateTicket} = useMutation({
    mutationFn: (data: RegisterTicket) => ApiClient.post(`/tickets/ticket_upd/`, {...data, id}),
  })

  // 직관일기 반응 추가
  const {mutateAsync: addReaction} = useMutation({
    mutationFn: (data: {reaction_pos: 'add' | 'del'; reaction_type: ReactionType}) =>
      ApiClient.post(`/tickets/ticket_reaction/`, {...data, id}),
  })

  /**
   * 직관일기 최애경기 선정 및 해제
   * @params favorite_status: clear: 최애경기 해제, excute: 최애경기 선정
   */
  const {mutateAsync: updateFavorite} = useMutation({
    mutationFn: ({favorite_status}: {favorite_status: 'clear' | 'excute'}) =>
      ApiClient.post(`/tickets/ticket_favorite/`, {id, favorite_status}),
  })

  return {
    ticketDetail: data,
    deleteTicket,
    updateTicket,
    addReaction,
    updateFavorite,
  }
}

export default useTicketDetail
