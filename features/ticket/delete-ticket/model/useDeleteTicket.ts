import {useAppRouter} from '@/shared'
import {useCommonSlice} from '@/slice/commonSlice'
import {showToast} from '@/shared'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import React from 'react'
import * as api from '../api'

const useDeleteTicket = () => {
  const {modal} = useCommonSlice()
  const queryClient = useQueryClient()
  const router = useAppRouter()

  const {mutate: deleteTicket} = useMutation({
    mutationFn: (id: number) => api.deleteTicket(id),
    onSuccess: (_, variables) => {
      setTimeout(() => {
        router.back()
      }, 500)
      showToast('삭제되었습니다.')

      queryClient.refetchQueries({queryKey: ['tickets']})
      queryClient.refetchQueries({queryKey: ['ticket']})
      queryClient.refetchQueries({queryKey: ['ticketListByTeam']})
    },
    onError: () => {
      showToast('잠시 후 다시 시도해 주세요')
    },
    onSettled: modal.hide,
  })

  return {deleteTicket}
}

export {useDeleteTicket}
