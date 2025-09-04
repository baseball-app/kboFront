import {theme} from '@/constants/Colors'
import {ROUTES, useAppRouter} from '@/hooks/common'
import useProfile from '@/hooks/my/useProfile'
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const TeamBox = () => {
  const router = useAppRouter()
  const {profile} = useProfile()
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamInfo}>
        <Image source={profile.my_team?.logo} style={styles.teamLogo} resizeMode="contain" />
        <Text style={styles.teamName}>{profile.my_team?.name}</Text>
      </View>

      <TouchableOpacity style={styles.teamSettingsIconBox} onPress={() => router.push(ROUTES.MY_CHANGE_TEAM)}>
        <Image source={require('@/assets/icons/gear.png')} style={styles.teamSettingsIcon} />
      </TouchableOpacity>
    </View>
  )
}

export {TeamBox}

const styles = StyleSheet.create({
  teamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    margin: 20,
    marginBottom: 14,
    padding: 15,
    borderRadius: 10,
    // width: 327,
    height: 68,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  teamName: {
    fontWeight: '600',
    fontSize: 16,
  },
  teamSettingsIconBox: {
    backgroundColor: '#00184F',
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamSettingsIcon: {
    width: 16,
    height: 16,
  },
})
