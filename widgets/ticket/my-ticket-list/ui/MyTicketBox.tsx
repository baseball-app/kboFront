import React from 'react'
import {TeamTagList} from './TeamTagList'
import {MyTicketList} from './MyTicketList'
import {useTicketListByTeam} from '@/entities/ticket'
import {StyleSheet, View} from 'react-native'
import {size} from '@/shared'
import {color_token} from '@/constants/theme'

const MyTicketBox = () => {
  const {
    ticketList,
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
    padding: size(16),
    marginHorizontal: size(20),
    marginBottom: size(20),
    backgroundColor: color_token.gray150,
    borderRadius: size(10),
  },
})

export {MyTicketBox}
