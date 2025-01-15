import { Modal } from "react-native";
import WebView from "react-native-webview";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useRef } from "react";

interface KaKaoLoginModalProps {
  showWebView: boolean;
  setShowWebView: (showWebView: boolean) => void;
  isKakaoLoginPage: boolean;
  setIsKakaoLoginPage: (isKakaoLoginPage: boolean) => void;
  //   KAKAO_AUTH_URL: string;
  onLoginSuccess: (code: string) => void;
}

const KAKAO_CLIENT_ID = process.env.EXPO_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
const KAKAO_AUTH_URL = [
  "https://kauth.kakao.com/oauth/authorize?",
  `client_id=${KAKAO_CLIENT_ID}`,
  `redirect_uri=${KAKAO_REDIRECT_URI}`,
  "response_type=code",
].join("&");

const KaKaoLoginModal = ({
  showWebView,
  setShowWebView,
  isKakaoLoginPage,
  setIsKakaoLoginPage,
  //   KAKAO_AUTH_URL,
  onLoginSuccess,
}: KaKaoLoginModalProps) => {
  const webViewRef = useRef(null);

  return (
    <Modal
      visible={showWebView}
      onRequestClose={() => !isKakaoLoginPage && setShowWebView(false)}
      animationType="slide"
    >
      <SafeAreaView style={styles.webViewContainer}>
        <WebView
          source={{ uri: KAKAO_AUTH_URL }}
          onNavigationStateChange={(navState) => {
            console.log("navState.url == ", navState.url);
            console.log("navState :: ", navState);

            console.log(
              "*******navState.url.startsWith(KAKAO_AUTH_URL)",
              navState.url.startsWith(KAKAO_REDIRECT_URI || "")
            );

            console.log(
              "navState.url?.split('code=')[1]?.split('&')[0]",
              navState.url?.split("code=")[1]?.split("&")[0]
            );

            const code = navState.url?.split("code=")[1]?.split("&")[0];

            console.log("code:*********************", code);
            if (code) {
              console.log("code:", code);
              // TODO: 여기에서 code -> register api 호출
              // 그럼 로그인 vs 회원가입은 어떻게 구분하지 ?
              setShowWebView(false);

              // 로그인 회원가입 구분해서 분기처리
              router.navigate("/auth/term-of-service");
            }

            if (navState.title === "Login with Kakao Account") {
              setIsKakaoLoginPage(true);
            } else {
              setIsKakaoLoginPage(false);
            }
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
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});

export default KaKaoLoginModal;
