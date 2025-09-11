import {ProfileImage} from '@/entities/user'
import {ROUTES, useAppRouter} from '@/shared'
import useProfile from '@/hooks/my/useProfile'
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const ProfileBox = () => {
  const router = useAppRouter()
  const {profile} = useProfile()

  return (
    <View style={styles.profileHeader}>
      <ProfileImage source={profile.profile_image} />

      <View style={styles.profileInfoBox}>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile?.nickname} 님</Text>
          <TouchableOpacity onPress={() => router.push(ROUTES.MY_CHANGE_NICKNAME)}>
            <Image
              source={require('@/assets/icons/edit_pen.png')}
              style={styles.profileEditIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.winRateContainer}>
          <Text style={styles.winRateLabel}>승요력</Text>
          <Text style={styles.winRateValue}>{profile?.predict_ratio}%</Text>
        </View>
      </View>
    </View>
  )
}

export {ProfileBox}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoBox: {
    gap: 10,
    justifyContent: 'center',

    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  profileEditIcon: {
    width: 18,
    height: 18,
  },
  winRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  winRateLabel: {
    fontSize: 16,
    marginRight: 3,
    lineHeight: 16 * 1.4,
    color: 'gray',
  },
  winRateValue: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: '#2D68FF', // Blue color for the percentage
    // fontWeight: "bold",
  },
})
