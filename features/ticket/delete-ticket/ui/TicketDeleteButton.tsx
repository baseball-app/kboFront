import {useCommonSlice} from '@/slice/commonSlice'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {useDeleteTicket} from '../model'
import {Txt} from '@/shared/ui'
import {color_token} from '@/constants/theme'

const TicketDeleteButton = ({ticketId}: {ticketId: number}) => {
  const {modal} = useCommonSlice()
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
            backgroundColor: color_token.gray300,
          },
        },
        {
          text: '삭제',
          onPress: () => deleteTicket(ticketId),
          buttonStyle: {
            backgroundColor: color_token.primary,
          },
          buttonTextStyle: {
            color: color_token.white,
          },
        },
      ],
    })
  }

  return (
    <TouchableOpacity
      onLayout={({nativeEvent}) => console.log(nativeEvent.layout.width)}
      onPress={() => onDeleteTicket()}>
      <Txt size={16} weight="semibold" color={color_token.primary}>
        삭제
      </Txt>
    </TouchableOpacity>
  )
}

export {TicketDeleteButton}
