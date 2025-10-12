import {ProfileImage} from '@/entities/user'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {logEvent} from '@/analytics/func'
import {EVENTS} from '@/analytics/event'
import {Pressable, ROUTES, useAppRouter} from '@/shared'
import useProfile from '@/hooks/my/useProfile'

const StatProfileBox = () => {
  const {profile} = useProfile()
  const router = useAppRouter()

  return (
    <View style={styles.infoBox}>
      <View style={styles.profileCard}>
        <ProfileImage source={profile.profile_image} />
        <View>
          <Text style={styles.name}>{profile.nickname} 님</Text>
          <Text style={styles.team}>
            {profile.my_team?.name} 팬 · 승요력 <Text style={{color: '#2D68FF'}}>{profile.predict_ratio}%</Text>
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          logEvent(EVENTS.WIN_PREDICTION_CLICK, {screen_name: ROUTES.TICKET_MY_STAT})
          router.push(ROUTES.TICKET_MY_STAT)
        }}>
        <Text style={styles.buttonText}>나의 승요력 보러가기</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000000', // 그림자 색상
    shadowOffset: {width: 0, height: 3}, // X, Y 방향 그림자 거리
    shadowOpacity: 0.08, // 그림자 투명도 (14% = 0.14보다 살짝 줄여야 자연스러움)
    shadowRadius: 15, // 그림자 흐림 정도
    elevation: 5, // 안드로이드용 그림자 (iOS는 위 속성만으로 충분)
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  team: {
    color: '#666',
  },
  button: {
    backgroundColor: '#081B46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22.4,
  },
})

export {StatProfileBox}
