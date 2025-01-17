import {Modal} from 'react-native'
import WebView from 'react-native-webview'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {useRef} from 'react'
import useUserJoin from '@/hooks/auth/useUserJoin'

interface KaKaoLoginModalProps {
    showWebView: boolean
    onClose: () => void
    //   KAKAO_AUTH_URL: string;
    onLoginSuccess: (code: string, isUser: boolean) => void
}

const KAKAO_CLIENT_ID = process.env.EXPO_PUBLIC_KAKAO_LOGIN_CLIENT_ID
const KAKAO_REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
const KAKAO_AUTH_URL = [
    'https://kauth.kakao.com/oauth/authorize?',
    `client_id=${KAKAO_CLIENT_ID}`,
    `redirect_uri=${KAKAO_REDIRECT_URI}`,
    'response_type=code',
].join('&')

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

const KaKaoLoginModal = ({
    showWebView,
    onClose,
    //   KAKAO_AUTH_URL,
    onLoginSuccess,
}: KaKaoLoginModalProps) => {
    const {startSignUpProcessWithCode} = useUserJoin()

    const webViewRef = useRef(null)

    return (
        <Modal
            visible={showWebView}
            onRequestClose={onClose}
            animationType="slide" //
        >
            <SafeAreaView style={styles.webViewContainer}>
                <WebView
                    source={{uri: KAKAO_AUTH_URL}}
                    onNavigationStateChange={navState => {
                        const code = (navState as NavState).url?.split('code=')[1]?.split('&')[0]

                        console.log(code, navState)
                        if (code) {
                            // isUser: true -> 로그인, false -> 회원가입
                            onLoginSuccess(code, true)
                            // TODO: 여기에서 code -> register api 호출
                            // 그럼 로그인 vs 회원가입은 어떻게 구분하지 ?
                            // onClose()
                            // 로그인 회원가입 구분해서 분기처리
                        }
                    }}
                />
                {/* {!isKakaoLoginPage && (
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                )} */}
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

export default KaKaoLoginModal
