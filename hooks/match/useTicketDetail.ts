import ApiClient from '@/api'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {RegisterTicket} from './useWriteTicket'
import {useState} from 'react'

export type TicketDetail = {
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

  hometeam_id: string
  awayteam_id: string

  // 감정표현
  like: number
  love: number
  haha: number
  yay: number
  wow: number
  sad: number
  angry: number
  // 감정표현

  only_me: boolean
  is_double: boolean
  favorite: boolean
}

//
export type ReactionType = 'like' | 'love' | 'haha' | 'yay' | 'wow' | 'sad' | 'angry'

const reactionTypeList: {key: ReactionType; title: string; count: number}[] = [
  {key: 'like', title: '😜', count: 0},
  {key: 'love', title: '👍', count: 0},
  {key: 'haha', title: '🤨', count: 0},
  {key: 'yay', title: '👆', count: 0},
  {key: 'wow', title: '👎', count: 0},
  {key: 'sad', title: '😠', count: 0},
  {key: 'angry', title: '🤬', count: 0},
]
// 😆👏

const useTicketDetail = (id: number | string, targetId: number) => {
  const queryClient = useQueryClient()

  const isDate = typeof id === 'string'
  // 1차 2차 선택하는 state
  const [ticketIndex, setTicketIndex] = useState<number>(0)
  const onChangeTicket = (index: number) => {
    setTicketIndex(index)
  }

  const initializeTicketInfo = () => {
    queryClient.invalidateQueries({queryKey: ['ticket', id]})
  }

  const {data} = useQuery({
    queryKey: ['ticket', id, targetId],
    queryFn: () => {
      console.log(id, targetId)
      return ApiClient.get<TicketDetail[]>(
        `/tickets/ticket_detail/`,
        isDate
          ? {
              date: id,
              target_id: targetId,
            }
          : {
              id: id,
              target_id: targetId,
            },
      )
    },
    enabled: Boolean(id),
  })
  const ticketDetail = data?.[ticketIndex]

  // 직관일기 삭제
  const {mutateAsync: deleteTicket} = useMutation({
    mutationFn: () => ApiClient.post(`/tickets/ticket_del/`, {id}),
    onSuccess: initializeTicketInfo,
  })

  // 직관일기 수정
  const {mutateAsync: updateTicket} = useMutation({
    mutationFn: (data: RegisterTicket) => ApiClient.post(`/tickets/ticket_upd/`, {...data, id: ticketDetail?.id}),
    onSuccess: initializeTicketInfo,
  })

  // 직관일기 반응 추가
  const {mutateAsync: addReaction} = useMutation({
    mutationFn: (data: {reaction_pos: 'add' | 'del'; reaction_type: ReactionType}) =>
      ApiClient.post(`/tickets/ticket_reaction/`, {...data, id}),
    onSuccess: initializeTicketInfo,
  })

  /**
   * 직관일기 최애경기 선정 및 해제
   * @params favorite_status: clear: 최애경기 해제, excute: 최애경기 선정
   */
  const {mutateAsync: updateFavorite} = useMutation({
    mutationFn: ({favorite_status}: {favorite_status: 'clear' | 'excute'}) =>
      ApiClient.post(`/tickets/ticket_favorite/`, {id: ticketDetail?.id, favorite_status}),
    onMutate: ({favorite_status}) => {
      const favorite = favorite_status === 'clear' ? false : true
      console.log(favorite_status, id, targetId)

      queryClient.setQueryData(['ticket', id, targetId], (old: TicketDetail[]) =>
        old.map((ticket, index) => (index === ticketIndex ? {...ticket, favorite} : ticket)),
      )
    },
    onError: (error, variables, context) => {
      console.log('error')
      const favorite = variables.favorite_status === 'clear' ? true : false

      queryClient.setQueryData(['ticket', id, targetId], (old: TicketDetail[]) =>
        old.map((ticket, index) => (index === ticketIndex ? {...ticket, favorite} : ticket)),
      )
    },
  })

  const toggleFavorite = () => {
    if (!data?.[ticketIndex]) return
    updateFavorite({favorite_status: data?.[ticketIndex]?.favorite ? 'clear' : 'excute'})
  }

  const reactionList = reactionTypeList.map(reaction => {
    return {
      ...reaction,
      count: ticketDetail?.[reaction.key] || 0,
    }
  })

  return {
    ticketDetail: ticketDetail,
    deleteTicket,
    updateTicket,
    addReaction,
    updateFavorite,
    onChangeTicket,
    ticketIndex,
    data,
    toggleFavorite,
    reactionList,
  }
}

export default useTicketDetail
