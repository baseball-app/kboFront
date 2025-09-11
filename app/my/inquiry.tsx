import React, {useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useMutation} from '@tanstack/react-query'
import ApiClient from '@/api'
import {usePopup} from '@/slice/commonSlice'
import {useAppRouter} from '@/shared'
import {showToast} from '@/shared'

type Inquiry = {
  email: string
  title: string
  content: string
}

export default function NicknameScreen() {
  const router = useAppRouter()
  const [inquiry, setInquiry] = useState<Inquiry>({
    email: '',
    title: '문의하기',
    content: '',
  })

  const {openCommonPopup} = usePopup()

  const {mutate: submitInquiry} = useMutation({
    mutationFn: async (inquiry: Inquiry) => ApiClient.post('/users/submission-inquiry/', inquiry),
    onSuccess: () => {
      openCommonPopup(
        `적어주신 메일로 답변 보내드릴게요.\n답변까지 시간이 다소 걸릴 수 있으니\n조금만 기다려주세요!`,
        router.back,
      )
    },
    onError: () => showToast('오류가 발생했습니다. 다시 시도해주세요.'),
  })

  const onSubmit = () => {
    // email 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inquiry.email)) {
      showToast('이메일을 확인해 주세요')
      return
    }

    if (!inquiry.content.trim()) {
      showToast('내용을 입력해주세요')
      return
    }

    submitInquiry(inquiry)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>앱을 사용하면서{'\n'}불편했던 점을 적어주세요</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <TextInput
          placeholder="답변 받으실 이메일 주소를 적어주세요"
          value={inquiry.email} //
          onChangeText={text => setInquiry({...inquiry, email: text})}
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#D0CEC7',
            marginBottom: 14,
          }}
          placeholderTextColor={'#CCCCCC'}
          maxLength={50}
        />
        <TextInput
          placeholder={`소중한 의견을 기다리고 있습니다!\n비방, 욕설, 부적절한 내용이 포함될 경우 답변이 제한될 수 있고, 앱 이용이 제한될 수 있습니다.`}
          value={inquiry.content} //
          onChangeText={text => setInquiry({...inquiry, content: text})}
          multiline
          placeholderTextColor={'#CCCCCC'}
          numberOfLines={20}
          style={{
            padding: 20,
            height: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#D0CEC7',
            textAlignVertical: 'top',
          }}
          maxLength={500}
        />
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, inquiry.email && inquiry.content ? styles.buttonActive : null]}
          onPress={onSubmit}
          disabled={!inquiry.email || !inquiry.content}>
          <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 24,
    marginTop: 16,
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
    marginHorizontal: 24,
    marginTop: 16,
    flex: 1,
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
    marginHorizontal: 24,
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
