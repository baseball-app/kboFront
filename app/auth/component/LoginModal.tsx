import WebView, {WebViewMessageEvent} from 'react-native-webview'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useRef} from 'react'
import {Modal} from '@/components/common/Modal'

interface LoginModalProps {
  showWebView: boolean
  onClose: () => void
  url: string
  onLoginSuccess: (code: string) => void
}

export type NavState = {
  canGoBack: boolean // false
  canGoForward: boolean // false
  loading: boolean // true
  lockIdentifier: number // 0
  mainDocumentURL: string // ''
  navigationType: string // 'formsubmit'
  target: number // 92
  title: string // '카카오계정으로 로그인'
  url: string // 'http://localhost:8000/auths/kakao/callback?code=ltY5k0uhqPzqy5sQ4NyCDFMyTCrs03HLsICn9pTkResnHMfUjasmWgAAAAQKPXKYAAABlHLXYHgq3eF1vjqPRg'
}

const LoginModal = ({
  showWebView,
  onClose,
  onLoginSuccess,
  url, //
}: LoginModalProps) => {
  const isAlreadyRequest = useRef(false)

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data)
      console.log('Apple Login Success:', data)
      // 로그인 성공 시 처리 로직
    } catch (error) {
      console.error('Apple Login Error:', error)
    }
  }

  return (
    <Modal
      visible={showWebView}
      onRequestClose={onClose}
      animationType="slide" //
    >
      <SafeAreaView style={styles.webViewContainer}>
        <WebView
          source={{uri: url}}
          onNavigationStateChange={navState => {
            // onNavigationStateChange 함수가 loading 중일 때와 아닐 때 두번 호출되어 에러 발생하는 현상 방지
            if (isAlreadyRequest.current) return

            const code = (navState as NavState).url?.split('code=')[1]?.split('&')[0]

            if (code) {
              isAlreadyRequest.current = true
              onLoginSuccess(code)
            }
          }}
        />
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
})

export default LoginModal
