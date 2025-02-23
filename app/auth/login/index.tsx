import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native'
import {router} from 'expo-router'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {Channel, useLogin} from '@/hooks/useLogin'
import LoginModal from '../component/LoginModal'
import {AUTH_URL} from '@/constants/auth'

type LoginButtonType = {
  name: string
  type: Channel
  url: string
}

export default function LoginScreen() {
  const [loginWebViewInfo, setLoginWebViewInfo] = useState<LoginButtonType | null>(null)

  const {startSignUpProcessWithCode} = useUserJoin()
  const {login} = useLogin()

  const onCloseWebView = () => {
    setLoginWebViewInfo(null)
  }

  const handleLoginSuccess = async (channel: Channel, code: string) => {
    try {
      const data = await login(channel, code)

      if (data?.is_new_user) {
        startSignUpProcessWithCode(code)
      } else {
        router.navigate('/(tabs)')
      }

      onCloseWebView()
    } catch (error) {
      onCloseWebView()
    }
  }

  const loginButtonList = [
    {
      name: '카카오로 시작하기',
      type: 'kakao',
      url: AUTH_URL.KAKAO,
      style: {button: styles.kakaoButton, text: styles.kakaoButtonText},
      image: require('../../../assets/icons/kakao.png'),
    },
    {
      name: '네이버로 시작하기',
      type: 'naver',
      url: AUTH_URL.NAVER,
      style: {button: styles.naverButton, text: styles.naverButtonText},
      image: require('../../../assets/icons/naver.png'),
    },
  ] as const

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <Image
              source={require('../../../assets/images/landing-logo.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>오늘의 야구</Text>
            <Text style={styles.subtitle}>반가워요! 오늘의 야구와 함께{'\n'}내가 응원하는 구단을 기록해보세요</Text>
          </View>

          <View style={styles.bottomContent}>
            {loginButtonList.map(loginButton => (
              <TouchableOpacity
                key={loginButton.name}
                style={loginButton.style.button}
                onPress={() => setLoginWebViewInfo(loginButton)}>
                <Image source={loginButton.image} style={styles.loginIcon} />
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
    // flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: '40%',
    marginHorizontal: '10%',
    marginBottom: '20%',
  },
  bottomContent: {
    // marginHorizontal: 20,
    marginHorizontal: '10%',
    // paddingBottom: "3",
  },
  icon: {
    height: undefined,
    aspectRatio: 1,
    width: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
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
    aspectRatio: 327 / 50, // This maintains the 327:50 ratio
    marginBottom: 20,
  },
  kakaoButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,

    // marginBottom: 10,
  },
  loginIcon: {
    marginRight: 5,
    width: '5%',
    aspectRatio: 1,
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
    width: '100%',
    aspectRatio: 327 / 50, // This maintains the 327:50 ratio
  },
  naverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})
