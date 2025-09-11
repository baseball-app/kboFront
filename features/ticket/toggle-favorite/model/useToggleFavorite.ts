import {useAppRouter} from '@/shared'
import {useCommonSlice} from '@/slice/commonSlice'
import {showToast} from '@/utils/showToast'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import React from 'react'
import * as api from '../api'
import {TicketDetail} from '@/entities/ticket'

const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  // 이거세개 가져와야 함
  const targetId = 1
  const ticketIndex = 0
  const data = [] as any

  /**
   * 직관일기 최애경기 선정 및 해제
   * @params favorite_status: clear: 최애경기 해제, excute: 최애경기 선정
   */
  const {mutateAsync: updateFavorite} = useMutation({
    mutationFn: ({id, favorite_status}: {id: number; favorite_status: 'clear' | 'excute'}) =>
      api.toggleFavorite({id, favorite_status}),
    onMutate: ({id, favorite_status}) => {
      const favorite = favorite_status === 'clear' ? false : true

      queryClient.setQueryData(['ticket', id, targetId], (old: TicketDetail[]) =>
        old.map((ticket, index) => (index === ticketIndex ? {...ticket, favorite} : ticket)),
      )
    },
    onError: (error, variables, context) => {
      const favorite = variables.favorite_status === 'clear' ? true : false
      const {id} = variables

      queryClient.setQueryData(['ticket', id, targetId], (old: TicketDetail[]) =>
        old.map((ticket, index) => (index === ticketIndex ? {...ticket, favorite} : ticket)),
      )
    },
    onSuccess: () => {
      queryClient.removeQueries({queryKey: ['ticketListByTeam']})
      queryClient.invalidateQueries({queryKey: ['ticketListByTeam']})
    },
  })

  const toggleFavorite = (id: number) => {
    if (!data?.[ticketIndex]) return
    updateFavorite({favorite_status: data?.[ticketIndex]?.favorite ? 'clear' : 'excute', id})
  }

  return {toggleFavorite}
}

export {useToggleFavorite}
