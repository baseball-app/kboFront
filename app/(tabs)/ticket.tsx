import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import {useTicketListByTeam} from '@/entities/ticket'
import React from 'react'
import {StyleSheet} from 'react-native'
import {MyTicketList} from '@/widgets/ticket/my-ticket-list'
import {StatProfileBox} from '@/widgets/stat'
import {TeamTagList} from '@/widgets/match'

const MyTicketBoxScreen = () => {
  const {ticketList, onChangeTeam, selectedTeamId, isLoading} = useTicketListByTeam()

  return (
    <InitScrollProvider style={styles.container}>
      <StatProfileBox />
      <TeamTagList selectedTeamId={selectedTeamId} onChangeTeam={onChangeTeam} />
      <MyTicketList isLoading={isLoading} ticketList={ticketList} />
    </InitScrollProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
})

export default MyTicketBoxScreen
