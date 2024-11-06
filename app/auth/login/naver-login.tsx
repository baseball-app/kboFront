import React, { useRef, useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { router } from 'expo-router';
interface NaverLoginModalProps {
  showWebView: boolean;
  setShowWebView: (show: boolean) => void;
  NAVER_AUTH_URL: string;
  onLoginSuccess: (code: string) => void;
}

const NAVER_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_LOGIN_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.EXPO_PUBLIC_NAVER_LOGIN_REDIRECT_URI;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${Math.random().toString(36).slice(2, 11)}`;

const NaverLoginScreen: React.FC<NaverLoginModalProps> = ({
  showWebView,
  setShowWebView,
  // NAVER_AUTH_URL,
  onLoginSuccess,
}) => {

  const [closeBtnVisable, setCloseBtnVisable] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);


  const cleanupWebView = () => {

    console.log("check webViewRef.current", webViewRef.current)
    if (webViewRef.current) {
      webViewRef.current.stopLoading();
    }
  };


  return (
      <SafeAreaView style={styles.webViewContainer}>
        {!closeBtnVisable && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              router.navigate('/auth/login')
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: NAVER_AUTH_URL }}
          onNavigationStateChange={(navState) => {

            console.log("navState", navState)
            try{
              // if (navState.url.startsWith(NAVER_AUTH_URL)) {
                const code = navState.url.split('code=')[1]?.split('&')[0];
              if (code) {
                console.log('Naver auth code:', code);
                // router.navigate('/')
                // onLoginSuccess(code);
                // setShowWebView(false);
                cleanupWebView();
                router.navigate('/auth/term-of-service');
              }

              const auth_type = navState.url.split('auth_type=')[1]
              // console.log("check webViewRef.current", webViewRef.current)
            
              if (auth_type === 'reauthenticate') {
                setCloseBtnVisable(false)
              }else{
                setCloseBtnVisable(true)
              }
          }
          catch (error) {
            console.log(error);
          }
          }}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: '10%',
    right: '3%',
    zIndex: 100,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    
  },
});

export default NaverLoginScreen;
