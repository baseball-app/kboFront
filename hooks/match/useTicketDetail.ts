import ApiClient from '@/api'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {RegisterTicket} from './useWriteTicket'
import {useEffect, useState} from 'react'
import useProfile from '../my/useProfile'
import {usePopup} from '@/slice/commonSlice'

//
export type ReactionType =
  | 'clap'
  | 'confused'
  | 'dislike'
  | 'good'
  | 'laugh'
  | 'petulance'
  | 'point_up'
  | 'rage'
  | 'wink'

export type Reaction = Record<ReactionType, number>

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

  only_me: boolean
  is_double: boolean
  favorite: boolean
} & Reaction

const reactionTypeList: {key: ReactionType; title: string; count: number}[] = [
  {key: 'laugh', title: '😁', count: 0},
  {key: 'wink', title: '🤣', count: 0},
  {key: 'good', title: '🥲', count: 0},
  {key: 'confused', title: '🤔', count: 0},
  {key: 'rage', title: '🤬', count: 0},
  {key: 'clap', title: '👏', count: 0},
  {key: 'petulance', title: '✌️', count: 0},
  {key: 'dislike', title: '👎', count: 0},
  {key: 'point_up', title: '👍', count: 0},
]

const useTicketDetail = (id: number | string, targetId: number) => {
  const queryClient = useQueryClient()
  const {profile} = useProfile()
  const {openCommonPopup} = usePopup()

  const isDate = typeof id === 'string'
  // 1차 2차 선택하는 state
  const [ticketIndex, setTicketIndex] = useState<number>(0)
  const onChangeTicket = (index: number) => {
    setTicketIndex(index)
  }

  const initializeTicketInfo = () => {
    queryClient.invalidateQueries({queryKey: ['ticket', id, targetId]})
  }

  const {data, isSuccess} = useQuery({
    queryKey: ['ticket', id, targetId],
    queryFn: () => {
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
    enabled: Boolean(id) && Boolean(targetId),
    retry: false,
  })
  const ticketDetail = data?.[ticketIndex]

  const {data: my_reaction} = useQuery({
    queryKey: ['ticket', id, 'reaction'],
    queryFn: () => ApiClient.get<Reaction>(`/tickets/ticket_reaction_view/`, {target_id: ticketDetail?.id}),
    enabled: Boolean(ticketDetail?.id),
  })

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
      ApiClient.post(`/tickets/ticket_reaction/`, {...data, id: Number(ticketDetail?.id)}),
    onSuccess: () => {
      initializeTicketInfo()
      queryClient.invalidateQueries({queryKey: ['ticket', id, 'reaction']})
    },
    onError: (error, variables, context) => {
      console.log('error', error)
      console.log('variables', variables, Number(ticketDetail?.id))
    },
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

      queryClient.setQueryData(['ticket', id, targetId], (old: TicketDetail[]) =>
        old.map((ticket, index) => (index === ticketIndex ? {...ticket, favorite} : ticket)),
      )
    },
    onError: (error, variables, context) => {
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

  const reactionList = reactionTypeList
    .map(reaction => {
      return {
        ...reaction,
        count: ticketDetail?.[reaction.key] || 0,
        isPressed: my_reaction?.[reaction.key] ? true : false,
      }
    })
    .sort((a, b) => b.count - a.count)

  const toggleReaction = (reaction: ReactionType) => {
    if (!ticketDetail) return
    if (ticketDetail.writer === profile.id) {
      openCommonPopup('반응은 친구만 남길 수 있어요!')
      return
    }

    addReaction({reaction_pos: my_reaction?.[reaction] ? 'del' : 'add', reaction_type: reaction})
  }

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
    toggleReaction,
    isSuccess,
  }
}

export default useTicketDetail
