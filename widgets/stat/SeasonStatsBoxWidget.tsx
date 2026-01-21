import {color_token} from '@/constants/theme'
import {useTeam} from '@/entities/match'
import {useProfile} from '@/entities/user'
import {LinearBorderBox, Txt} from '@/shared/ui'
import {useQuery} from '@tanstack/react-query'
import ApiClient from '@/api'
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {size} from '@/shared'

type AllTicketStats = {
  total_percent: number
  total_games: number
  wins: number
  losses: number
  draws: number
}

function SeasonStatsBoxWidget({year}: {year: number}) {
  const {profile} = useProfile()
  const {findTeamById} = useTeam()

  const {data} = useQuery({
    queryKey: ['ticket_total_percent', year],
    queryFn: () => ApiClient.get<{all_ticket_stats: AllTicketStats}>(`/statistics/ticket_total_percent/?year=${year}`),
    placeholderData: {
      all_ticket_stats: {
        total_percent: 0,
        total_games: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      },
    },
  })

  const all_ticket_stats = data?.all_ticket_stats

  return (
    <LinearBorderBox
      borderWidth={size(2)}
      borderRadius={size(10)}
      backgroundColor={color_token.white}
      colors={
        Number(data?.all_ticket_stats.total_games) > 0
          ? findTeamById(profile.my_team?.id)?.gradient || [color_token.gray350, color_token.gray350]
          : [color_token.gray350, color_token.gray350]
      }>
      <View style={styles.container}>
        <View style={styles.powerBox}>
          <Txt size={16}>나의 승요력</Txt>
          <Txt size={24} weight="bold">
            {Math.ceil(all_ticket_stats?.total_percent || 0)}%
          </Txt>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Txt size={14}>경기</Txt>
            <Txt size={24} weight="bold">
              {all_ticket_stats?.total_games}
            </Txt>
          </View>
          <View style={styles.statItem}>
            <Txt size={14}>승</Txt>
            <Txt size={24} weight="bold">
              {all_ticket_stats?.wins}
            </Txt>
          </View>
          <View style={styles.statItem}>
            <Txt size={14}>패</Txt>
            <Txt size={24} weight="bold">
              {all_ticket_stats?.losses}
            </Txt>
          </View>
          <View style={styles.statItem}>
            <Txt size={14}>무</Txt>
            <Txt size={24} weight="bold">
              {all_ticket_stats?.draws}
            </Txt>
          </View>
        </View>
      </View>
    </LinearBorderBox>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  powerBox: {
    paddingHorizontal: size(20),
    paddingVertical: size(16),
    alignItems: 'center',
    borderWidth: size(1),
    borderColor: color_token.gray350,
    borderStyle: 'dashed',
    marginLeft: -1,
    marginTop: -1,
    marginBottom: -2,
  },
  statsRow: {
    paddingHorizontal: size(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statItem: {
    paddingVertical: size(16),
    alignItems: 'center',
    gap: size(2),
  },
})

export {SeasonStatsBoxWidget}
