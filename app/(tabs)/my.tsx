import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/profile_images/glove.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>최강야구님</Text>
          <Ionicons name="checkmark-circle" size={24} color="blue" />  
        </View>
        <Text style={styles.winRate}>승률력 76%</Text>
        
      </View>

      <View style={styles.teamCard}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamLogo}>SL</Text>
          <Text style={styles.teamName}>삼성 라이온즈</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>팔로워</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>팔로잉</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="card-outline" size={24} color="black" />
          <Text style={styles.statLabel}>초대코드</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>로그아웃</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>회원탈퇴</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  winRate: {
    fontSize: 14,
    color: 'gray',
  },
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  teamName: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 1,
  },
  menuText: {
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen;
