import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native'
import {useRouter} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import {moderateScale, verticalScale} from '@/utils/metrics'
import {TEAMS} from '@/constants/join'
import useProfile from '@/hooks/my/useProfile'

export default function ChangeScreen() {
  const {updateMyTeam, profile} = useProfile()

  const [selectedTeamId, setSelectedTeamId] = useState(profile.my_team?.id)

  const isChanged = selectedTeamId !== profile.my_team?.id

  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이팀 변경하기</Text>
      </View>

      <View style={styles.headerDescription}>
        <Text style={styles.headerDescriptionText}>내가 설정한 마이팀을 기준으로{'\n'}데이터가 새로 작성됩니다.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.teamsGrid}>
          {TEAMS.map(team => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamButton, selectedTeamId === team.id && styles.selectedTeam]}
              onPress={() => setSelectedTeamId(team.id)}>
              <Image source={team.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, isChanged && styles.nextButtonActive]}
          onPress={() => updateMyTeam(selectedTeamId)}
          disabled={!isChanged}>
          <Text style={styles.nextButtonText}>변경하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  header: {
    paddingHorizontal: verticalScale(24),
    flexDirection: 'row',
  },
  backButton: {
    marginBottom: 30,
  },
  content: {
    paddingHorizontal: verticalScale(24),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginRight: verticalScale(16),
  },

  headerDescription: {
    alignItems: 'center',
    paddingHorizontal: verticalScale(24),
    marginBottom: verticalScale(28),
  },

  headerDescriptionText: {
    fontSize: moderateScale(16),
    color: '#999999',
  },

  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  teamButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  selectedTeam: {
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#000',
  },
  teamLogo: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: verticalScale(24),
    paddingVertical: verticalScale(67),
  },
  nextButton: {
    backgroundColor: '#CCCCCC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#007AFF',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
