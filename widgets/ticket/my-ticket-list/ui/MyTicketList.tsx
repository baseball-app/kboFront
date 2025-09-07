import Skeleton from '@/components/skeleton/Skeleton'
import {TicketCard, useTeam} from '@/entities/match'
import {ROUTES, useAppRouter} from '@/hooks/common'
import {TicketListByTeam} from '@/entities/ticket'
import useProfile from '@/hooks/my/useProfile'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const MyTicketList = ({isLoading, ticketList}: {isLoading: boolean; ticketList?: TicketListByTeam[]}) => {
  const {findTeamById} = useTeam()
  const {profile} = useProfile()
  const router = useAppRouter()
  return (
    <>
      <View style={styles.likeBoxContainer}>
        {(() => {
          if (isLoading) {
            return (
              <>
                <Skeleton height={100} width="100%" />
                <Skeleton height={100} width="100%" />
                <Skeleton height={100} width="100%" />
              </>
            )
          }

          return (
            <>
              {ticketList?.length ? (
                ticketList?.map(ticket => {
                  const homeTeam = findTeamById(Number(ticket.hometeam_id))
                  const awayTeam = findTeamById(Number(ticket.awayteam_id))

                  const opponentTeam = (() => {
                    if (profile.my_team?.id === homeTeam?.id) return awayTeam
                    if (profile.my_team?.id === awayTeam?.id) return homeTeam
                  })()

                  return (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      homeTeam={homeTeam}
                      awayTeam={awayTeam}
                      opponentTeam={opponentTeam}
                      onClick={() =>
                        router.push(ROUTES.WRITE_TODAY_TICKET_CARD, {
                          id: ticket.id,
                          target_id: profile.id,
                          from_ticket_box: 'true',
                        })
                      }
                    />
                  )
                })
              ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', height: 100}}>
                  <Text style={{fontSize: 14, fontWeight: 400, color: '#171716'}}>해당 경기 티켓이 없어요.</Text>
                </View>
              )}
            </>
          )
        })()}
      </View>
    </>
  )
}

export {MyTicketList}

const styles = StyleSheet.create({
  likeBoxContainer: {
    backgroundColor: '#F3F2EE',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 10,
    gap: 12,
    marginBottom: 20,
  },
})
