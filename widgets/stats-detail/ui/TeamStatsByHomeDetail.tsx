import React from 'react'
import {DetailSummary} from './DetailSummary'
import {StyleSheet, View} from 'react-native'
import {Txt} from '@/shared/ui'
import {useTeam} from '@/entities/match'
import {MyTicketList} from '@/widgets/ticket/my-ticket-list'
type Props = {
  parameter_id: number
}

function TeamStatsByHomeDetail({parameter_id}: Props) {
  const {teams} = useTeam()
  const team = teams?.find(team => team.id === parameter_id)

  return (
    <View style={styles.container}>
      <Txt weight="bold" size={22} style={styles.title}>
        {team?.name}상대 경기 통계
      </Txt>
      <DetailSummary title={`${team?.short_name}전 승요력`} percent={100} win={10} draw={0} lose={0} />
      <View style={styles.contents}>
        <Txt size={18} weight="bold" style={styles.contentsTitle}>
          경기 티켓 보기
        </Txt>
        <MyTicketList isLoading ticketList={[]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {paddingBottom: 24},
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  contents: {
    paddingTop: 28,
  },
  contentsTitle: {
    paddingBottom: 20,
  },
})

export {TeamStatsByHomeDetail}
