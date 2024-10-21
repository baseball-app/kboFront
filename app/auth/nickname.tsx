import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function NicknameScreen() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Here you would typically send the nickname to your backend
    console.log('Submitted nickname:', nickname);
    // Navigate to the next screen or main app
    router.replace('/auth/my-team');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.inputSection}>
          <View style={styles.header}>
            <Text style={styles.title}>닉네임을{'\n'}입력해주세요</Text>
            <Text style={styles.subtitle}>한글/영어/숫자/특수문자를{'\n'}사용할 수 있습니다.</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              placeholder="닉네임 입력"
              placeholderTextColor="#CCCCCC"
            />
            <View style={[
              styles.inputUnderline, 
              nickname ? styles.inputUnderlineActive : null
            ]} />
            
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, nickname ? styles.buttonActive : null]}
            onPress={handleSubmit}
            disabled={!nickname}
          >
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  content: {
    flex: 1,
  },
  inputSection: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333333',
  },
  inputUnderline: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: 4,
  },
  inputUnderlineActive: {
    backgroundColor: '#000000',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 40, // Extra padding for Android
  },
  button: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
