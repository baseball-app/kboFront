import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyTicketBoxScreen = () => {
  const teams = [
    { name: '취예 경기', score: '+60', icon: '❤️' },
    { name: '삼성 라이온즈', score: '+52', icon: 'SL' },
    { name: 'LG 트윈스', score: '+8', icon: 'LG' },
    // ... add other teams
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>나의 티켓박스</Text>
      
      <View style={styles.profileCard}>
        <Image
          // source={require('./path-to-your-image.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>최강야구 님</Text>
          <Text style={styles.team}>삼성 라이온즈 팬 · 승률력 76%</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>나의 승률력 보러가기</Text>
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>발행한 티켓</Text>
      
      <ScrollView>
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
    </SafeAreaView>
  );
};

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
  },
  team: {
    color: '#666',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
});

export default MyTicketBoxScreen;