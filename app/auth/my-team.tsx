import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import useUserJoin from '@/hooks/auth/useUserJoin'
import useTeam from '@/hooks/match/useTeam'

export default function MyTeamScreen() {
  const {
    setMyTeam,
    myTeam,
    moveToNextStep, //
    moveToPrevStep,
  } = useUserJoin()

  const {teams} = useTeam()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={moveToPrevStep}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>마이팀을{'\n'}선택해주세요</Text>
        <Text style={styles.subtitle}>마이팀은 나가 응원하고 싶은{'\n'}최애 야구 구단을 뜻해요.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.teamsGrid}>
          {teams?.map(team => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamButton, myTeam?.id === team.id && styles.selectedTeam]}
              onPress={() => setMyTeam(team)}>
              <Image source={team.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, myTeam && styles.nextButtonActive]}
          onPress={moveToNextStep}
          disabled={!myTeam}>
          <Text style={styles.nextButtonText}>다음</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 8,
    lineHeight: 24 * 1.4,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 16,
    color: '#77756C',
    marginBottom: 24,
    lineHeight: 16 * 1.4,
    fontWeight: 400,
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  teamButton: {
    width: '30%',
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
    padding: 20,
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
