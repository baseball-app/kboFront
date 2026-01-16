import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {AppleLoginButton, KakaoLoginButton, NaverLoginButton} from '@/features/auth/login'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'
import {Txt} from '@/shared/ui/Txt'

export default function LoginScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <Image source={require('@/assets/images/landing-logo.png')} style={styles.icon} resizeMode="contain" />
            <Image source={require('@/assets/images/title.png')} style={styles.titleImage} resizeMode="contain" />
            <Txt size={16} color={color_token.gray600} style={styles.subtitle}>
              반가워요! 오늘의 야구와 함께{'\n'}내가 응원하는 구단을 기록해보세요
            </Txt>
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
    backgroundColor: color_token.gray100,
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
    marginHorizontal: size(24),
    paddingBottom: size(24),
    justifyContent: 'center',
    alignItems: 'center',
    gap: size(12),
  },
  icon: {
    width: size(173),
    height: size(147),
    marginBottom: size(40),
  },
  subtitle: {
    textAlign: 'center',
  },
  titleImage: {
    width: size(140),
    marginBottom: size(20),
  },
})
