import ApiClient, {uploadFile} from '@/api'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useState} from 'react'
import useProfile from '../my/useProfile'
import {usePopup} from '@/slice/commonSlice'
import {logEvent} from '@/analytics/func'
import {EVENTS} from '@/analytics/event'
import {TicketDetail} from '@/entities/ticket'

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

type UpdateReactionParam = {reaction_pos: 'add' | 'del'; reaction_type: ReactionType}

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
    queryClient.invalidateQueries({queryKey: ['ticket']})
    return refetch()
  }

  /**
   * 직관일기 반응 추가 시 최적화 업데이트
   * @param param0
   */
  const optimisticUpdateReaction = ({reaction_pos, reaction_type}: UpdateReactionParam) => {
    queryClient.setQueryData(['ticket', id, targetId], (old: TicketDetail[]) =>
      old.map(ticket =>
        ticket.id === ticketDetail?.id
          ? {
              ...ticket,
              [reaction_type]: reaction_pos === 'add' ? ticket[reaction_type] + 1 : ticket[reaction_type] - 1,
            }
          : ticket,
      ),
    )
    queryClient.setQueryData(['ticket', id, 'reaction'], (old: Reaction) => {
      return {
        ...old,
        [reaction_type]: reaction_pos === 'add' ? old[reaction_type] + 1 : old[reaction_type] - 1,
      }
    })
  }

  const {data, isSuccess, refetch} = useQuery({
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
  const {mutateAsync: updateTicket, isPending: isUpdating} = useMutation({
    mutationFn: (data: FormData) => uploadFile(`/tickets/ticket_upd/`, data),
    onSuccess: initializeTicketInfo,
  })

  // 직관일기 반응 추가
  const {mutateAsync: addReaction} = useMutation({
    mutationFn: (data: UpdateReactionParam) =>
      ApiClient.post(`/tickets/ticket_reaction/`, {...data, id: Number(ticketDetail?.id)}),
    onMutate: optimisticUpdateReaction,
    onSuccess: (_, variables) => {
      initializeTicketInfo()
      if (variables.reaction_pos === 'add') {
        logEvent(EVENTS.TICKET_REACTION, {
          ticket_id: ticketDetail?.id, //
          reaction_type: variables.reaction_type,
        })
      }
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
    onSuccess: () => {
      queryClient.removeQueries({queryKey: ['ticketListByTeam']})
      queryClient.invalidateQueries({queryKey: ['ticketListByTeam']})
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
    isUpdating,
    initializeTicketInfo,
  }
}

export default useTicketDetail
