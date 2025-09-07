import {EVENTS} from '@/analytics/event'
import {logEvent} from '@/analytics/func'
import {InitScrollProvider} from '@/components/provider/InitScrollProvider'
import {ProfileImage} from '@/entities/user'
import {ROUTES, useAppRouter} from '@/hooks/common'
import {TeamTag, useTeam} from '@/entities/match'
import {useTicketListByTeam} from '@/entities/ticket'
import useProfile from '@/hooks/my/useProfile'
import {usePathname} from 'expo-router'
import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import {MyTicketList} from '@/widgets/ticket/my-ticket-list'
const width = Dimensions.get('window').width

const MyTicketBoxScreen = () => {
  const router = useAppRouter()
  const {profile} = useProfile()
  const {ticketList, onChangeTeam, selectedTeamId, isLoading} = useTicketListByTeam()
  const {teams} = useTeam()
  const pathname = usePathname()

  return (
    <InitScrollProvider style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.profileCard}>
          <ProfileImage source={profile.profile_image} />
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
            router.push(ROUTES.TICKET_MY_STAT)
          }}>
          <Text style={styles.buttonText}>나의 승요력 보러가기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ticketBox}>
        <Text style={styles.ticketTitle}>상대 구단별 경기티켓</Text>
        <View style={styles.tabContainer}>
          {[{id: 0, short_name: '최애 경기'}, ...(teams || []), {id: 999, short_name: '타구단'}]
            ?.filter(club => club.id !== profile.my_team?.id) //
            .map((club, index) => (
              <TeamTag
                paddingHorizontal={index < 5 ? (width - 251) / 10 : index < 10 ? (width - 221) / 10 : 12}
                key={club.id}
                name={club.short_name || ''} //
                isActive={club.id === selectedTeamId}
                onClick={() => onChangeTeam(club.id)}
              />
            ))}
        </View>
      </View>

      <MyTicketList isLoading={isLoading} ticketList={ticketList} />
    </InitScrollProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
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
