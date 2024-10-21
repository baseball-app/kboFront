import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const teams = [
  { id: 1, name: 'LG 트윈스', logo: require('../../assets/team_logo/lg.png') },
  { id: 2, name: 'KT 위즈', logo: require('../../assets/team_logo/kt.png') },
  { id: 3, name: 'SSG 랜더스', logo: require('../../assets/team_logo/ssg.png') },
  { id: 4, name: 'NC 다이노스', logo: require('../../assets/team_logo/nc.png') },
  { id: 5, name: '두산 베어스', logo: require('../../assets/team_logo/doosan.png') },
  { id: 6, name: 'KIA 타이거즈', logo: require('../../assets/team_logo/kia.png') },
  { id: 7, name: '롯데 자이언츠', logo: require('../../assets/team_logo/lotte.png') },
  { id: 8, name: '삼성 라이온즈', logo: require('../../assets/team_logo/samsung.png') },
  { id: 9, name: '한화 이글스', logo: require('../../assets/team_logo/hanwha.png') },
  { id: 10, name: '키움 히어로즈', logo: require('../../assets/team_logo/kiwoom.png') },
];

export default function MyTeamScreen() {
  const [selectedTeam, setSelectedTeam] = useState({id: 0, name: '', logo: ''});
  const router = useRouter();

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team);
  };

  const handleNext = () => {
    if (selectedTeam) {
      // Navigate to the next screen or main app
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>마이팀을{'\n'}선택해주세요</Text>
        <Text style={styles.subtitle}>마이팀은 나가 응원하고 싶은{'\n'}최애 야구 구단을 뜻해요.</Text>
        <View style={styles.teamsGrid}>
          {teams.map((team) => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamButton, selectedTeam?.id === team.id && styles.selectedTeam]}
              onPress={() => handleTeamSelect(team)}
            >
              <Image source={team.logo} style={styles.teamLogo} />
              <Text style={styles.teamName}>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, selectedTeam && styles.nextButtonActive]}
          onPress={handleNext}
          disabled={!selectedTeam}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  header: {
    padding: 16,
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
});
