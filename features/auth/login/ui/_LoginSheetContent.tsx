import WebView from 'react-native-webview'
import {useRef} from 'react'

interface LoginModalProps {
  url: string
  onLoginSuccess: (code: string) => void
}

type NavState = {
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

const _LoginSheetContent = ({
  onLoginSuccess,
  url, //
}: LoginModalProps) => {
  const isAlreadyRequest = useRef(false)

  return (
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
  )
}

export {_LoginSheetContent}
