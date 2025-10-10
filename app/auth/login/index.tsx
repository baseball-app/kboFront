import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {AppleLoginButton, KakaoLoginButton, NaverLoginButton} from '@/features/auth/login'

export default function LoginScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <Image source={require('@/assets/images/landing-logo.png')} style={styles.icon} resizeMode="contain" />
            <Image source={require('@/assets/images/title.png')} style={styles.titleImage} resizeMode="contain" />
            <Text style={styles.subtitle}>반가워요! 오늘의 야구와 함께{'\n'}내가 응원하는 구단을 기록해보세요</Text>
          </View>

          <View style={styles.bottomContent}>
            <AppleLoginButton />
            <KakaoLoginButton />
            <NaverLoginButton />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContent: {
    marginHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'center',
    // width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 173,
    height: 147,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 16 * 1.4,
    color: '#77756C',
    fontWeight: 400,
  },

  titleImage: {
    width: 140,
    marginBottom: 20,
  },
})
