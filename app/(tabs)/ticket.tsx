import ProfileImageBox from '@/components/common/ProfileImageBox'
import Tag from '@/components/Tag'
import {theme} from '@/constants/Colors'
import {CLUB_LIST} from '@/constants/ticket'
import useMyInfo from '@/hooks/my/useMyInfo'
import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'

const MyTicketBoxScreen = () => {
  const [selectedClub, setSelectedClub] = useState(CLUB_LIST[0].value)
  const {profile} = useMyInfo()

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.profileCard}>
          <ProfileImageBox source={profile.profile_image} />
          <View>
            <Text style={styles.name}>{profile.nickname} 님</Text>
            <Text style={styles.team}>
              {profile.my_team?.name} 팬 · 승요력 {profile.predict_ratio}%
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>나의 승요력 보러가기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ticketBox}>
        <Text style={styles.ticketTitle}>상대 구단별 경기티켓</Text>
        <View style={styles.tabContainer}>
          {CLUB_LIST.map(club => (
            <Tag
              key={club.value}
              name={club.name} //
              isActive={club.value === selectedClub}
              onClick={() => setSelectedClub(club.value)}
            />
          ))}
        </View>
      </View>

      {/* <ScrollView style={styles.likeBoxContainer}>
        {teams.map((team, index) => (
          <TouchableOpacity key={index} style={styles.teamRow}>
            <View style={styles.teamInfo}>
              <Text style={styles.teamIcon}>{team.icon}</Text>
              <Text style={styles.teamName}>{team.name}</Text>
            </View>
            <Text style={styles.teamScore}>{team.score}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
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
    paddingBlock: 40,
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
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  },
  teamScore: {
    fontSize: 16,
    color: '#3498db',
  },
  likeBoxContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
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
