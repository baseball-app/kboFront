import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Platform} from 'react-native'
import {router} from 'expo-router'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {Channel, useLogin} from '@/hooks/auth/useLogin'
import LoginModal from '../component/LoginModal'
import {AUTH_URL} from '@/constants/auth'
import {appleAuth} from '@invertase/react-native-apple-authentication'
import {Profile} from '@/hooks/my/useProfile'
import ApiClient from '@/api'
import {usePopup} from '@/slice/commonSlice'
type LoginButtonType = {
  name: string
  type: Channel
  url: string
}

export default function LoginScreen() {
  const [loginWebViewInfo, setLoginWebViewInfo] = useState<LoginButtonType | null>(null)
  const {openCommonPopup} = usePopup()
  const {startSignUpProcessWithCode} = useUserJoin()
  const {login} = useLogin()

  const onCloseWebView = () => {
    setLoginWebViewInfo(null)
  }

  const handleLoginSuccess = async (channel: Channel, code: string) => {
    try {
      await login(channel, code)

      const profile = await ApiClient.get<Profile>('/users/me/')
      const myTeamId = profile?.my_team?.id

      if (!myTeamId) {
        startSignUpProcessWithCode(code)
      } else {
        router.replace('/(tabs)')
      }

      onCloseWebView()
    } catch (error) {
      onCloseWebView()
      openCommonPopup('로그인에 실패했어요.\n다시 시도해주세요.')
    }
  }

  const loginButtonList = [
    {
      name: '카카오로 시작하기',
      type: 'kakao',
      url: AUTH_URL.KAKAO,
      style: {button: styles.kakaoButton, text: styles.kakaoButtonText},
      image: require('@/assets/icons/kakao.png'),
    },
    {
      name: '네이버로 시작하기',
      type: 'naver',
      url: AUTH_URL.NAVER,
      style: {button: styles.naverButton, text: styles.naverButtonText},
      image: require('@/assets/icons/naver.png'),
    },
  ] as const

  const isAndroid = Platform.OS === 'android'

  async function handleSignInApple() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    const authCode = appleAuthRequestResponse.authorizationCode

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED && authCode) {
      handleLoginSuccess('apple', authCode)
      // user is authenticated
    }
  }

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
            {!isAndroid && (
              <TouchableOpacity style={styles.appleButton} onPress={handleSignInApple}>
                <Image
                  source={require('@/assets/icons/apple.png')}
                  style={[styles.loginIcon, {height: 18, marginBottom: 3}]}
                />
                <Text style={styles.appleButtonText}>Apple로 시작하기</Text>
              </TouchableOpacity>
            )}

            {loginButtonList.map(loginButton => (
              <TouchableOpacity
                key={loginButton.name}
                style={loginButton.style.button}
                onPress={() => setLoginWebViewInfo(loginButton)}>
                <Image source={loginButton.image} style={[styles.loginIcon]} />
                <Text style={loginButton.style.text}>{loginButton.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <LoginModal
          showWebView={Boolean(loginWebViewInfo)}
          onClose={onCloseWebView}
          url={loginWebViewInfo?.url || ''}
          onLoginSuccess={code => handleLoginSuccess(loginWebViewInfo?.type!, code)}
        />
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
  appleButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    height: 50,
  },
  titleImage: {
    width: 140,
    marginBottom: 20,
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 8,

    // marginBottom: 10,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    height: 50,
  },
  kakaoButtonText: {
    color: '#191919',
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 8,
  },
  loginIcon: {
    marginRight: 5,
    width: 14,
    height: 14,
    // aspectRatio: 12 / 12, // This maintains the 327:50 ratio
  },
  naverButton: {
    backgroundColor: '#03C75A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 50,
    width: '100%',
  },
  naverButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 8,
  },
})
