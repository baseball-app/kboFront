import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useProfile from '@/hooks/my/useProfile'
import Header from '@/components/common/Header'
import {useTeam} from '@/entities/match'

export default function ChangeScreen() {
  const {updateMyTeam, profile} = useProfile()
  const {teams} = useTeam()
  const [selectedTeamId, setSelectedTeamId] = useState(profile.my_team?.id)

  const isChanged = selectedTeamId !== profile.my_team?.id

  return (
    <SafeAreaView style={styles.container}>
      <Header title="마이팀 변경" variants="transparent" />

      <View style={styles.headerDescription}>
        <Text style={styles.headerDescriptionText}>내가 설정한 마이팀을 기준으로{'\n'}데이터가 새로 작성됩니다.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.teamsGrid}>
          {teams?.map(team => (
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
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  backButton: {
    marginBottom: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 16,
  },

  headerDescription: {
    alignItems: 'center',
    marginBottom: 28,
  },

  headerDescriptionText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: '#999999',
    textAlign: 'center',
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  teamButton: {
    width: '31%',
    aspectRatio: 99 / 90,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  selectedTeam: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#000',
  },
  teamLogo: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16 * 1.4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  nextButton: {
    backgroundColor: '#CCCCCC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#1E5EF4',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
