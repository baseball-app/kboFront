import {ProfileImage} from '@/entities/user'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import useProfile from '@/hooks/my/useProfile'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'
import {Txt} from '@/shared/ui'

const StatProfileBox = () => {
  const {profile} = useProfile()

  return (
    <View style={styles.infoBox}>
      <View style={styles.profileCard}>
        <ProfileImage source={profile.profile_image} />
        <View>
          <Txt size={18} weight="bold" style={styles.name}>
            {profile.nickname} 님
          </Txt>
          <Txt color={color_token.gray600}>
            {profile.my_team?.name} 팬 · 승요력{' '}
            <Txt color={color_token.primary}>{profile.predict_ratio}%</Txt>
          </Txt>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    padding: size(24),
    backgroundColor: color_token.white,
    shadowColor: color_token.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginBottom: size(4),
  },
})

export {StatProfileBox}
