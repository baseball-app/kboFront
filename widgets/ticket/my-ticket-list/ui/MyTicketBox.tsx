import React from 'react'
import {TeamTagList} from './TeamTagList'
import {MyTicketList} from './MyTicketList'
import {useTicketListByTeam} from '@/entities/ticket'

const MyTicketBox = () => {
  const {
    ticketList, //
    onChangeTeam,
    selectedTeamId,
    isLoading,
  } = useTicketListByTeam()

  return (
    <>
      <TeamTagList selectedTeamId={selectedTeamId} onChangeTeam={onChangeTeam} />
      <MyTicketList isLoading={isLoading} ticketList={ticketList} />
    </>
  )
}

export {MyTicketBox}
