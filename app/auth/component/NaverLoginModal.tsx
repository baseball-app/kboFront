import useUserJoin from '@/hooks/auth/useUserJoin'
import React from 'react'
import {Modal, SafeAreaView, TouchableOpacity, Text, StyleSheet} from 'react-native'
import WebView from 'react-native-webview'
import {NavState} from './KaKaoLoginModal'

interface NaverLoginModalProps {
    showWebView: boolean
    onClose: () => void
    onLoginSuccess: (code: string) => void
}

const NAVER_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_LOGIN_CLIENT_ID
const NAVER_REDIRECT_URI = process.env.EXPO_PUBLIC_NAVER_LOGIN_REDIRECT_URI
// const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${Math.random()
//     .toString(36)
//     .slice(2, 11)}`

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`

/**
 *
 * @param param0
 * @returns
 */

const NaverLoginModal: React.FC<NaverLoginModalProps> = ({
    showWebView, //
    onClose,
    onLoginSuccess,
}) => {
    return (
        <Modal visible={showWebView} onRequestClose={onClose} animationType="slide">
            <SafeAreaView style={styles.webViewContainer}>
                <WebView
                    source={{uri: NAVER_AUTH_URL}}
                    onNavigationStateChange={navState => {
                        // onNavigationStateChange 함수가 loading 중일 때와 아닐 때 두번 호출되어 에러 발생하는 현상 방지
                        if (navState.loading) return

                        const code = (navState as NavState).url?.split('code=')[1]?.split('&')[0]

                        if (code) onLoginSuccess(code)

                        // console.log('navState', navState)
                        // try {
                        //     if (navState.url.startsWith(NAVER_AUTH_URL)) {
                        //         const code = navState.url.split('code=')[1]?.split('&')[0]
                        //         if (code) {
                        //             console.log('Naver auth code:', code)
                        //             onLoginSuccess(code, true)
                        //         }
                        //     }
                        // } catch (error) {
                        //     console.log(error)
                        // }
                    }}
                    injectedJavaScript={`
            (function() {
              var style = document.createElement('style');
              style.textContent = 'header { display: none !important; }';
              document.head.appendChild(style);
            })();
          `}
                />
                {/* <TouchableOpacity style={styles.closeButton} onPress={() => setShowWebView(false)}>
                    <Text>Close</Text>
                </TouchableOpacity> */}
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
        top: 40,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
})

export default NaverLoginModal
