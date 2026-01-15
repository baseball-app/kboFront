import React from 'react'
import {TeamTagList} from './TeamTagList'
import {MyTicketList} from './MyTicketList'
import {useTicketListByTeam} from '@/entities/ticket'
import {StyleSheet, View} from 'react-native'

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
      <View style={styles.ticketListContainer}>
        <MyTicketList isLoading={isLoading} ticketList={ticketList} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  ticketListContainer: {
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F3F2EE',
    borderRadius: 10,
  },
})

export {MyTicketBox}
