import Header from '@/components/common/Header'
import useUserJoin from '@/hooks/auth/useUserJoin'
import useProfile from '@/hooks/my/useProfile'
import {moderateScale, verticalScale} from '@/utils/metrics'
import {Ionicons} from '@expo/vector-icons'
import {useRouter} from 'expo-router'
import React, {useState} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const ChangeNicknameScreen = () => {
  const {updateProfile, profile} = useProfile()
  const [nickname, setNickname] = useState(profile.nickname)
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <Header title="닉네임 변경하기" variants="transparent" />
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
            <Text style={styles.subtitle}>* 한글/영어/숫자/밑줄/띄어쓰기를 사용할 수 있습니다.</Text>
            <TouchableOpacity
              style={[styles.button, nickname ? styles.buttonActive : null]}
              onPress={() => updateProfile({nickname}).then(router.back)}
              disabled={!nickname}>
              <Text style={styles.buttonText}>변경하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChangeNicknameScreen

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
    paddingHorizontal: verticalScale(24),
    flexDirection: 'row',
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#77756C',
    marginTop: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    fontSize: 18,
    paddingVertical: 8,
    lineHeight: 24,
    color: '#171716',
    textAlign: 'center',
  },
  inputUnderline: {
    height: 2,
    backgroundColor: '#CCCCCC',
    marginTop: 4,
  },
  inputUnderlineActive: {
    backgroundColor: '#171716',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 40, // Extra padding for Android
  },
  button: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonActive: {
    backgroundColor: '#1E5EF4',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginRight: verticalScale(16),
  },
})
