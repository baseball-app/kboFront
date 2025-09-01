import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function NicknameScreen() {
  const {nickname, setNickname, moveToNextStep, moveToPrevStep} = useUserJoin()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={moveToPrevStep}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>닉네임을{'\n'}입력해주세요</Text>
        <Text style={styles.subtitle}>한글/영어/숫자/밑줄/띄어쓰기를{'\n'}사용할 수 있습니다.</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              placeholder="닉네임 입력"
              placeholderTextColor="#CCCCCC"
              maxLength={10}
            />
            <View style={[styles.inputUnderline, nickname ? styles.inputUnderlineActive : null]} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, nickname ? styles.buttonActive : null]}
            onPress={moveToNextStep}
            disabled={!nickname}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
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
    padding: 24,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    lineHeight: 24 * 1.4,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 16,
    color: '#77756C',
    lineHeight: 16 * 1.4,
    fontWeight: 400,
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
    marginBottom: 1,
  },
  inputUnderlineActive: {
    height: 2,
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
})
