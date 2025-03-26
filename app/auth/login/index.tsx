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

  const handleLoginSuccess = async (channel: Channel, code: string, identityToken?: string) => {
    try {
      const data = await login(channel, code, identityToken)

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
      openCommonPopup(`로그인에 실패했어요.\n다시 시도해주세요.`)
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
      requestedScopes: [appleAuth.Scope.FULL_NAME],
    })

    const authCode = appleAuthRequestResponse.authorizationCode

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
    if (credentialState === appleAuth.State.AUTHORIZED) {
      handleLoginSuccess('apple', authCode!, appleAuthRequestResponse.identityToken!)
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
                  style={[styles.loginIcon, {height: 18, marginBottom: 2}]}
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
    marginRight: 4,
    width: 14,
    height: 14,
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

const a = {
  authorizationCode: 'cc740b73cd17f409c9cc95c37e18ab77f.0.prtxz.OYcRMKqi2bZUxlYk4DF2Vg',
  authorizedScopes: [],
  email: null,
  fullName: {familyName: null, givenName: null, middleName: null, namePrefix: null, nameSuffix: null, nickname: null},
  identityToken:
    'eyJraWQiOiJkTWxFUkJhRmRLIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoieHl6Lmtib2FwcCIsImV4cCI6MTc0Mjk5NjM1NywiaWF0IjoxNzQyOTA5OTU3LCJzdWIiOiIwMDEzNzkuMGU2YzAyN2RjMzdiNGFhN2FhMTNiYzAwOTBmYzUxYzcuMTMwMiIsIm5vbmNlIjoiMmJhNTVhMzFjMmY1ZjVkNDdiM2VkODQwYTY3M2VmZTM0NGRhMmI1NGEzZGE0MmJjNTA5NTFkZTg0ZGU5YjFkYSIsImNfaGFzaCI6IlQzSUZoLWQ4TkdXQmxZdVZWRWdqX3ciLCJlbWFpbCI6Ijk3bm54cnc4cWhAcHJpdmF0ZXJlbGF5LmFwcGxlaWQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzX3ByaXZhdGVfZW1haWwiOnRydWUsImF1dGhfdGltZSI6MTc0MjkwOTk1Nywibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.NgLsrmky9F7BI3N5y7AsFSUxt2j5wFvwESdEAODgESOooB7aDvX9sHw0Qbz_4n9ueTdyj7A5M27NuGowEQW2cRs00F-hO7Rbki2lGEo3z0e6u1ec1GXKBgJyRwCszVcjaZZ1fCPgWb_zLpMLuZKot2u1UpDXiuY8k6Z3QTFdvw3jmgtdaaLwRfodN6cwu7oqSIatsOP7CAzCBssDA8s3G8tRuh5UkaVBzDjEhHv0MSH2R_jZI44oB64QENuoqyH0cyClNYy37CEcyJ6nrKQoCKI-AKqOIUQFseSRkoK5Uvzo80qdkOSz50bTbBspTeHpxGj9hZEtwb65HjvW9sZ0Ig',
  nonce: 'fDC916vYbFxgUfB4U5ESZhHZSI3f3uH4',
  realUserStatus: 1,
  state: null,
  user: '001379.0e6c027dc37b4aa7aa13bc0090fc51c7.1302',
}
