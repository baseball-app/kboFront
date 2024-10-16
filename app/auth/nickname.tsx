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
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
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
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity 
          style={[styles.button, nickname ? styles.buttonActive : null]}
          onPress={handleSubmit}
          disabled={!nickname}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#DDD',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

