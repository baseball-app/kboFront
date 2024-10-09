import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import LandingLogo from '../../assets/images/landing-logo@2x.png';

export default function HomeScreen() {
  const { width: windowWidth } = useWindowDimensions();

  // Calculate the maximum image width based on the screen width
  const maxImageWidth = windowWidth * 0.40; // 20% of screen width

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/landing-logo.png')} 
          style={[styles.icon, { width: maxImageWidth }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>오늘의 야구</Text>
        <Text style={styles.subtitle}>반가워요! 오늘의 야구와 함께{'\n'}내가 응원하는 구단을 기록해보세요</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginText}>이미 회원이신가요? <Text style={styles.loginBold}>로그인</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    // marginBottom: 20,
    height: undefined, // Allow height to adjust based on the image's aspect ratio
    aspectRatio: 1, // This should be adjusted to match your image's actual aspect ratio
  },
  calendarIcon: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  calendarTop: {
    height: 15,
    backgroundColor: '#4A90E2',
  },
  calendarBody: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF0000',
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
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginBold: {
    fontWeight: 'bold',
    color: '#000',
  },
});
