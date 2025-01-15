import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WebView from "react-native-webview";
import KaKaoLoginModal from "../component/KaKaoLoginModal";
import NaverLoginModal from "../component/NaverLoginModal";
import { router } from "expo-router";
import CommonModal from "@/components/common/CommonModal";
import { useCommonSlice } from "@/slice/commonSlice";
import CommonButton from "@/components/common/CommonButton";
const KAKAO_CLIENT_ID = process.env.EXPO_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

// console.log("check", Math.random().toString(36).slice(2, 11))

const NAVER_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_LOGIN_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.EXPO_PUBLIC_NAVER_LOGIN_REDIRECT_URI;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${Math.random()
  .toString(36)
  .slice(2, 11)}`;

export default function LoginScreen() {
  const [showKakaoWebView, setShowKakaoWebView] = useState(false);
  const [showNaverWebView, setShowNaverWebView] = useState(false);
  const [isKakaoLoginPage, setIsKakaoLoginPage] = useState(false);
  const { modal } = useCommonSlice();
  const handleKakaoLoginSuccess = (code: string) => {
    // Handle Kakao login success
    console.log("Kakao login successful, code:", code);
    // Implement your login logic here
  };

  const handleNaverLoginSuccess = (code: string) => {
    // Handle Naver login success
    console.log("Naver login successful, code:", code);
    // Implement your login logic here
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <Image
              source={require("../../../assets/images/landing-logo.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>오늘의 야구</Text>
            <Text style={styles.subtitle}>
              반가워요! 오늘의 야구와 함께{"\n"}내가 응원하는 구단을
              기록해보세요
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <CommonButton
              title={"안녕"}
              onPress={() => {
                modal.open({
                  header: "안내",
                  content:
                    "마이팀 변경시, 기존의 데이터는 삭제가 됩니다.\n 변경하시겠습니까?",
                  button: [
                    {
                      text: "취소",
                      onPress: modal.hide,
                      buttonStyle: {
                        backgroundColor: "#D0CEC7",
                      },
                      buttonTextStyle: {
                        color: "#171716",
                      },
                    },
                    {
                      text: "확인",
                      onPress: modal.hide,
                      buttonStyle: {
                        backgroundColor: "#1E5EF4",
                      },
                      buttonTextStyle: {
                        color: "#fff",
                      },
                    },
                  ],
                });
                // router.navigate('/auth/login/kakao-login')
                // setShowKakaoWebView(true)
              }}
              buttonStyleProps={{
                width: 30,
              }}
            />
            <TouchableOpacity
              style={styles.kakaoButton}
              onPress={() => {
                setShowKakaoWebView(true);
                // modal.open({
                //   header: "안내",
                //   content:
                //     "마이팀 변경시, 기존의 데이터는 삭제가 됩니다.\n 변경하시겠습니까?",
                //   button: [
                //     {
                //       text: "취소",
                //       onPress: modal.hide,
                //       buttonStyle: {
                //         backgroundColor: "#D0CEC7",
                //       },
                //       buttonTextStyle: {
                //         color: "#171716",
                //       },
                //     },
                //     {
                //       text: "확인",
                //       onPress: modal.hide,
                //       buttonStyle: {
                //         backgroundColor: "#1E5EF4",
                //       },
                //       buttonTextStyle: {
                //         color: "#fff",
                //       },
                //     },
                //   ],
                // });
                // router.navigate("/ticket");
              }}
            >
              <Image
                source={require("../../../assets/icons/kakao.png")}
                style={styles.loginIcon}
              />
              {/* <Ionicons name="chatbubble" size={24} color="black" style={styles.kakaoIcon} /> */}
              <Text style={styles.kakaoButtonText}>카카오로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.naverButton}
              onPress={() => router.navigate("/auth/login/naver-login")}
            >
              <Image
                source={require("../../../assets/icons/naver.png")}
                style={styles.loginIcon}
              />
              <Text style={styles.naverButtonText}>네이버로 시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <KaKaoLoginModal
          showWebView={showKakaoWebView}
          setShowWebView={setShowKakaoWebView}
          isKakaoLoginPage={isKakaoLoginPage}
          setIsKakaoLoginPage={setIsKakaoLoginPage}
          // KAKAO_AUTH_URL={KAKAO_AUTH_URL}
          onLoginSuccess={handleKakaoLoginSuccess}
        />

        <NaverLoginModal
          showWebView={showNaverWebView}
          setShowWebView={setShowNaverWebView}
          NAVER_AUTH_URL={NAVER_AUTH_URL}
          onLoginSuccess={handleNaverLoginSuccess}
        />
      </SafeAreaView>
      <CommonModal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF3",
  },
  contentContainer: {
    // flex: 1,
    justifyContent: "space-between",
  },
  topContent: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    marginTop: "40%",
    marginHorizontal: "10%",
    marginBottom: "20%",
  },
  bottomContent: {
    // marginHorizontal: 20,
    marginHorizontal: "10%",
    // paddingBottom: "3",
  },
  icon: {
    height: undefined,
    aspectRatio: 1,
    width: "50%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    aspectRatio: 327 / 50, // This maintains the 327:50 ratio
    marginBottom: 20,
  },
  kakaoButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,

    // marginBottom: 10,
  },
  loginIcon: {
    marginRight: 5,
    width: "5%",
    aspectRatio: 1,
    // aspectRatio: 12 / 12, // This maintains the 327:50 ratio
  },
  naverButton: {
    backgroundColor: "#03C75A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    aspectRatio: 327 / 50, // This maintains the 327:50 ratio
  },
  naverButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
