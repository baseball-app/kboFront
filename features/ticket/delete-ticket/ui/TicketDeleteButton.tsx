import useProfile from '@/hooks/my/useProfile'
import {useCommonSlice} from '@/slice/commonSlice'
import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {useDeleteTicket} from '../model'

const TicketDeleteButton = ({ticketId}: {ticketId: number}) => {
  const {modal} = useCommonSlice()
  const {profile} = useProfile()
  const isMyTicket = profile?.id === ticketId
  const {deleteTicket} = useDeleteTicket()

  const onDeleteTicket = () => {
    modal.open({
      header: '안내',
      content: '해당 티켓을 삭제할까요?',
      button: [
        {
          text: '취소',
          onPress: modal.hide,
          buttonStyle: {
            backgroundColor: '#D0CEC7',
          },
        },
        {
          text: '삭제',
          onPress: () => deleteTicket(ticketId),
          buttonStyle: {
            backgroundColor: '#1E5EF4',
          },
          buttonTextStyle: {
            color: '#fff',
          },
        },
      ],
    })
  }

  if (!isMyTicket) return undefined

  return (
    <TouchableOpacity onPress={() => onDeleteTicket()}>
      <Text style={{color: '#1E5EF4', fontSize: 16, fontWeight: '500', lineHeight: 20 * 1.4}}>삭제</Text>
    </TouchableOpacity>
  )
}

export {TicketDeleteButton}
