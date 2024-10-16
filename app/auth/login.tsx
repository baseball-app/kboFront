import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, useWindowDimensions, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WebView from 'react-native-webview';

const KAKAO_CLIENT_ID = process.env.EXPO_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export default function LoginScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [isKakaoLoginPage, setIsKakaoLoginPage] = useState(false);
  const webViewRef = useRef(null);
  
  const { width: windowWidth } = useWindowDimensions();
  const maxImageWidth = windowWidth * 0.40;

  const handleKakaoLogin = () => {
    setShowWebView(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.topContent}>
          <Image 
            source={require('../../assets/images/landing-logo.png')} 
            style={[styles.icon, { width: maxImageWidth }]}
            resizeMode="contain"
          />
          <Text style={styles.title}>오늘의 야구</Text>
          <Text style={styles.subtitle}>반가워요! 오늘의 야구와 함께{'\n'}내가 응원하는 구단을 기록해보세요</Text>
        </View>
        
        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
            <Ionicons name="chatbubble" size={24} color="black" style={styles.kakaoIcon} />
            <Text style={styles.kakaoButtonText}>카카오톡으로 1초 시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showWebView}
        onRequestClose={() => !isKakaoLoginPage && setShowWebView(false)}
        animationType="slide"
      >
        <SafeAreaView style={styles.webViewContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: KAKAO_AUTH_URL }}
            onNavigationStateChange={(navState) => {
          
              if (navState.url.startsWith(KAKAO_REDIRECT_URI ?? '')) {
                const code = navState.url?.split('code=')[1]?.split('&')[0];
                if (code) {
                  console.log('code:', code);
                  setShowWebView(false);
                  // Navigate to the index tab
                  // router.navigate('/(tabs)');
                }
              }

              // if (navState.title === 'Login with Kakao Account') {
              
              //   setIsKakaoLoginPage(true);
              // } else {
              //   setIsKakaoLoginPage(false);
              // }
            }}
          />
          {!isKakaoLoginPage && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWebView(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          )}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bottomContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  icon: {
    height: undefined,
    aspectRatio: 1,
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
  },
  kakaoButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  kakaoIcon: {
    marginRight: 5,
  },
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
});
