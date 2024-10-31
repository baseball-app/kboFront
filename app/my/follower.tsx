import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/metrics';

interface Follower {
  id: string;
  name: string;
}

const FollowerScreen = () => {

  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  
  // Mock data
  const followers: Follower[] = [
    { id: '1', name: '안방마님 양의지' },
    { id: '2', name: '오스틴딘' },
    { id: '3', name: '이선생' },
    { id: '4', name: '단단무지' },
    { id: '5', name: '감블러' },
    { id: '6', name: '칸데리니아' },
    { id: '7', name: '단단무지' },
    { id: '8', name: '명준명훈' },
    { id: '9', name: '감블러' },
    { id: '10', name: '두니주니' },
  ];

  // Mock data
  const following: Follower[] = [
    { id: '1', name: '안방마님 양의지' },
    { id: '2', name: '오스틴딘' },
    { id: '3', name: '이선생' },
    { id: '4', name: '단단무지' },
    { id: '5', name: '감블러' },
    { id: '6', name: '칸데리니아' },
    { id: '7', name: '단단무지' },
    { id: '8', name: '명준명훈' },
    { id: '9', name: '감블러' },
    { id: '10', name: '두니주니' },
  ];

  
  const handleTabChange = (tab: 'followers' | 'following') => {
    setActiveTab(tab);
  };

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={activeTab === 'followers' ? styles.ActiveTab : styles.NonActiveTab} onPress={() => handleTabChange('followers')}>
            <Text style={activeTab === 'followers' ? styles.tabTextActive : styles.tabTextNonActive}>15 팔로워</Text>
          </TouchableOpacity>
          <TouchableOpacity style={activeTab === 'following' ? styles.ActiveTab : styles.NonActiveTab} onPress={() => handleTabChange('following')}>
            <Text style={activeTab === 'following' ? styles.tabTextActive : styles.tabTextNonActive}>26 팔로잉</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Follower List */}
      <ScrollView style={styles.scrollView}>
        {followers.map((follower) => (
          <View key={follower.id} style={styles.followerItem}>
            <View style={styles.followerInfo}>
              <View style={styles.iconContainer}>
                {/* <Image 
                  source={require('@/assets/images/baseball.png')} 
                  style={styles.baseballIcon}
                /> */}
              </View>
              <Text style={styles.followerName}>{follower.name}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  header: {
    // paddingHorizontal: horizontalScale(20),
    paddingBottom: verticalScale(10),
  },
  backButton: {
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(20),
  },
  tabContainer: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderBottomColor: '#E4E2DC',
  },
  tab: {
    paddingVertical: verticalScale(10),
    marginRight: horizontalScale(20),
  },
  ActiveTab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  NonActiveTab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
//   followingActiveTab: {
//     flex: 1,
//     paddingVertical: verticalScale(10),
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: '#000',
//   },
//   followingNonActiveTab: {
//     flex: 1,
//     paddingVertical: verticalScale(10),
//     alignItems: 'center',
//   },
  tabTextNonActive: {
    fontSize: moderateScale(16),
    color: '#999',
  },
  tabTextActive: {
    fontSize: moderateScale(16),
    color: '#000',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#F3F2EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(12),
  },
  baseballIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#666',
  },
  followerName: {
    fontSize: moderateScale(14),
    color: '#000',
  },
  removeButton: {
    padding: moderateScale(4),
  },
});

export default FollowerScreen;