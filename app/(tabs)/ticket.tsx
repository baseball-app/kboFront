import ProfileImageBox from '@/components/common/ProfileImageBox'
import {theme} from '@/constants/Colors'
import useMyInfo from '@/hooks/my/useMyInfo'
import React from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

const MyTicketBoxScreen = () => {
  const teams = [
    {name: '취예 경기', score: '+60', icon: '❤️'},
    {name: '삼성 라이온즈', score: '+52', icon: 'SL'},
    {name: 'LG 트윈스', score: '+8', icon: 'LG'},
    // ... add other teams
  ]

  const {profile} = useMyInfo()

  return (
    <View style={styles.container}>
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

      <Text style={styles.sectionTitle}>발행한 티켓</Text>

      <ScrollView style={styles.likeBoxContainer}>
        {teams.map((team, index) => (
          <TouchableOpacity key={index} style={styles.teamRow}>
            <View style={styles.teamInfo}>
              <Text style={styles.teamIcon}>{team.icon}</Text>
              <Text style={styles.teamName}>{team.name}</Text>
            </View>
            <Text style={styles.teamScore}>{team.score}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
})

export default MyTicketBoxScreen
