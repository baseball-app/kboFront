import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native'
import KaKaoLoginModal from '../component/KaKaoLoginModal'
import NaverLoginModal from '../component/NaverLoginModal'
import {router} from 'expo-router'
import CommonModal from '@/components/common/CommonModal'
import {useCommonSlice} from '@/slice/commonSlice'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {useLogin} from '@/hooks/useLogin'

export default function LoginScreen() {
    const [showKakaoWebView, setShowKakaoWebView] = useState(false)
    const [showNaverWebView, setShowNaverWebView] = useState(false)
    // const {modal} = useCommonSlice()

    const {startSignUpProcessWithCode} = useUserJoin()
    const {login} = useLogin()

    const onCloseWebView = () => {
        setShowKakaoWebView(false)
        setShowNaverWebView(false)
    }

    // TODO: Naver 소셜로그인 성공 시, response보고 합칠 수 있으면 kakao, naver 두개 합치는게 좋을 것 같음
    // apple도 추가될 거니까, URL만 전달하여 처리할 수 있는지 확인 필요
    const handleLoginSuccess = async (code: string, isUser: boolean) => {
        try {
            await startSignUpProcessWithCode(code)
            onCloseWebView()
        } catch (error) {
            await login(code)
            onCloseWebView()
            console.log(code)
        }
    }

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
                        <Text style={styles.subtitle}>
                            반가워요! 오늘의 야구와 함께{'\n'}내가 응원하는 구단을 기록해보세요
                        </Text>
                    </View>

                    <View style={styles.bottomContent}>
                        {/* <CommonButton
                            title={'안녕'}
                            onPress={() => {
                                modal.open({
                                    header: '안내',
                                    content: '마이팀 변경시, 기존의 데이터는 삭제가 됩니다.\n 변경하시겠습니까?',
                                    button: [
                                        {
                                            text: '취소',
                                            onPress: modal.hide,
                                            buttonStyle: {
                                                backgroundColor: '#D0CEC7',
                                            },
                                            buttonTextStyle: {
                                                color: '#171716',
                                            },
                                        },
                                        {
                                            text: '확인',
                                            onPress: modal.hide,
                                            buttonStyle: {
                                                backgroundColor: '#1E5EF4',
                                            },
                                            buttonTextStyle: {
                                                color: '#fff',
                                            },
                                        },
                                    ],
                                })
                                // router.navigate('/auth/login/kakao-login')
                                // setShowKakaoWebView(true)
                            }}
                            buttonStyleProps={{
                                width: 30,
                            }}
                        /> */}
                        <TouchableOpacity
                            style={styles.kakaoButton}
                            onPress={() => {
                                setShowKakaoWebView(true)
                            }}>
                            <Image source={require('../../../assets/icons/kakao.png')} style={styles.loginIcon} />
                            <Text style={styles.kakaoButtonText}>카카오로 시작하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.naverButton}
                            onPress={() => router.navigate('/auth/login/naver-login')}>
                            <Image source={require('../../../assets/icons/naver.png')} style={styles.loginIcon} />
                            <Text style={styles.naverButtonText}>네이버로 시작하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <KaKaoLoginModal
                    showWebView={showKakaoWebView}
                    onClose={onCloseWebView}
                    onLoginSuccess={handleLoginSuccess}
                />

                <NaverLoginModal
                    showWebView={showNaverWebView}
                    onClose={onCloseWebView}
                    onLoginSuccess={handleLoginSuccess}
                />
            </SafeAreaView>
            <CommonModal />
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
