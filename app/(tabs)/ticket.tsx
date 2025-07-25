import {EVENTS} from '@/analytics/event'
import {logEvent} from '@/analytics/func'
import ProfileImageBox from '@/components/common/ProfileImageBox'
import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import Skeleton from '@/components/skeleton/Skeleton'
import Tag from '@/components/Tag'
import useTeam from '@/hooks/match/useTeam'
import useTicketListByTeam, {TicketListByTeam} from '@/hooks/match/useTicketListByTeam'
import useProfile from '@/hooks/my/useProfile'
import {format} from 'date-fns'
import {router, usePathname} from 'expo-router'
import React, {useRef} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
const width = Dimensions.get('window').width

// 40 + 12 * 4 = 88

const MyTicketBoxScreen = () => {
  const {profile} = useProfile()
  const {ticketList, onChangeTeam, selectedTeamId, isLoading} = useTicketListByTeam()
  const {findTeamById, teams} = useTeam()
  const myTeam = findTeamById(profile.my_team?.id)
  const pathname = usePathname()

  const firstLine = useRef<number[]>([0, 0, 0, 0, 0])
  const secondLine = useRef<number[]>([0, 0, 0, 0, 0])

  console.log(
    'firstLine :: ',
    firstLine.current.reduce((acc, curr) => acc + curr, 0),
    '163',
  )

  // 88 + 163

  // (width - 251) / 10

  console.log(
    'secondLine :: ',
    secondLine.current.reduce((acc, curr) => acc + curr, 0),
    '133',
  )

  return (
    <InitScrollProvider style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.profileCard}>
          <ProfileImageBox source={profile.profile_image} />
          <View>
            <Text style={styles.name}>{profile.nickname} 님</Text>
            <Text style={styles.team}>
              {profile.my_team?.name} 팬 · 승요력 <Text style={{color: '#2D68FF'}}>{profile.predict_ratio}%</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logEvent(EVENTS.WIN_PREDICTION_CLICK, {screen_name: pathname})
            router.push('/ticket/my-stat')
          }}>
          <Text style={styles.buttonText}>나의 승요력 보러가기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ticketBox}>
        <Text style={styles.ticketTitle}>상대 구단별 경기티켓</Text>
        <View style={styles.tabContainer}>
          {[{id: 0, short_name: '최애 경기'}, ...(teams || []), {id: 999, short_name: '타구단'}]
            ?.filter(club => club.id !== myTeam?.id) //
            .map((club, index) => (
              <Tag
                // getTextWidth={textWidth => {
                //   if (index < 5) {
                //     firstLine.current[index] = textWidth
                //   } else if (index < 10) {
                //     secondLine.current[index - 5] = textWidth
                //   }
                // }}
                paddingHorizontal={index < 5 ? (width - 251) / 10 : index < 10 ? (width - 221) / 10 : 12}
                key={club.id}
                name={club.short_name || ''} //
                isActive={club.id === selectedTeamId}
                onClick={() => onChangeTeam(club.id)}
              />
            ))}
        </View>
      </View>

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
                        router.push({
                          pathname: '/write/todayTicketCard',
                          params: {id: ticket.id, target_id: profile.id, from_ticket_box: 'true'},
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
    </InitScrollProvider>
  )
}

// 40, 12

type TicketTeam = {
  id: number
  logo: any
  name: any
  short_name: any
  color: any
}

type TicketCardProps = {
  ticket: TicketListByTeam
  homeTeam?: TicketTeam
  awayTeam?: TicketTeam
  opponentTeam?: TicketTeam
  onClick: () => void
}

const TicketCard = ({ticket, homeTeam, awayTeam, opponentTeam, onClick}: TicketCardProps) => {
  return (
    <View style={styles.teamCard}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 12}}>
        <View style={[styles.teamLabel, {backgroundColor: opponentTeam?.color ?? 'white'}]} />
        <View style={{gap: 4, paddingVertical: 8}}>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{homeTeam?.short_name}</Text>
            <Text style={styles.teamSub}>{` VS `}</Text>
            <Text style={styles.teamName}>{awayTeam?.short_name}</Text>
          </View>
          <Text style={styles.parkName}>{ticket.ballpark.name}</Text>
          <Text style={styles.date}>{format(ticket.date, 'yyyy.MM.dd')}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClick}
          style={{
            backgroundColor: '#1E5EF4',
            padding: 8,
            borderRadius: 30,
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: 500}}>티켓보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000000', // 그림자 색상
    shadowOffset: {width: 0, height: 3}, // X, Y 방향 그림자 거리
    shadowOpacity: 0.08, // 그림자 투명도 (14% = 0.14보다 살짝 줄여야 자연스러움)
    shadowRadius: 15, // 그림자 흐림 정도
    elevation: 5, // 안드로이드용 그림자 (iOS는 위 속성만으로 충분)
  },
  ticketBox: {
    paddingInline: 20,
    paddingBlock: 24,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  team: {
    color: '#666',
  },
  button: {
    backgroundColor: '#081B46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22.4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamCard: {
    gap: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  teamName: {
    fontSize: 16,
    color: '#171716',
    fontWeight: 500,
    lineHeight: 24,
  },
  teamSub: {
    fontSize: 14,
    color: '#171716',
    fontWeight: 500,
    lineHeight: 21,
  },
  teamLabel: {
    width: 8,
    height: 100,
  },
  parkName: {
    fontSize: 14,
    color: '#171716',
    fontWeight: 400,
    lineHeight: 21,
  },
  date: {
    fontSize: 14,
    color: '#95938B',
    fontWeight: 400,
    lineHeight: 19.5,
  },
  teamScore: {
    fontSize: 16,
    color: '#3498db',
  },
  likeBoxContainer: {
    backgroundColor: '#F3F2EE',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 10,
    gap: 12,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 15,
    gap: 8,
    rowGap: 12,
  },
})

export default MyTicketBoxScreen
