import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {TEAMS} from '@/constants/join'
import useUserJoin from '@/hooks/auth/useUserJoin'

export default function MyTeamScreen() {
  const {
    setMyTeam,
    myTeam,
    moveToNextStep, //
    moveToPrevStep,
  } = useUserJoin()

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
          {TEAMS.map(team => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamButton, myTeam?.id === team.id && styles.selectedTeam]}
              onPress={() => setMyTeam(team)}>
              <Image source={team.logo} style={styles.teamLogo} resizeMode="contain" />
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
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 30,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
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
