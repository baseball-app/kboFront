import React, {useState} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useMutation} from '@tanstack/react-query'
import ApiClient from '@/api'
import {usePopup} from '@/slice/commonSlice'
import {size, useAppRouter} from '@/shared'
import {showToast} from '@/shared'
import LottieView from 'lottie-react-native'
import {color_token} from '@/constants/theme'
import {BackButton, Txt} from '@/shared/ui'

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

  const {mutate: submitInquiry, isPending} = useMutation({
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
    if (isPending) return
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
      <Pressable style={styles.flex1} onPress={Keyboard.dismiss}>
        <View style={styles.header}>
          <BackButton onPress={router.back} />
          <Txt size={24} weight="semibold" style={styles.title}>
            앱을 사용하면서{'\n'}불편했던 점을 적어주세요
          </Txt>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
          <TextInput
            placeholder="답변 받으실 이메일 주소를 적어주세요"
            value={inquiry.email}
            onChangeText={text => setInquiry({...inquiry, email: text})}
            style={styles.emailInput}
            placeholderTextColor={color_token.gray400}
            maxLength={50}
          />
          <TextInput
            placeholder={`소중한 의견을 기다리고 있습니다!\n비방, 욕설, 부적절한 내용이 포함될 경우 답변이 제한될 수 있고, 앱 이용이 제한될 수 있습니다.`}
            value={inquiry.content}
            onChangeText={text => setInquiry({...inquiry, content: text})}
            multiline
            placeholderTextColor={color_token.gray400}
            numberOfLines={20}
            style={styles.contentInput}
            maxLength={500}
          />
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, inquiry.email && inquiry.content ? styles.buttonActive : null]}
            onPress={onSubmit}
            disabled={!inquiry.email || !inquiry.content}>
            {isPending ? (
              <LottieView
                source={require('@/assets/lottie/loading.json')}
                autoPlay
                loop
                style={styles.lottieView}
              />
            ) : (
              <Txt size={18} weight="bold" color={color_token.white}>
                등록하기
              </Txt>
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  flex1: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: size(24),
    marginTop: size(16),
  },
  header: {
    paddingHorizontal: size(24),
    paddingTop: size(24),
  },
  title: {
    marginBottom: size(8),
  },
  emailInput: {
    padding: size(20),
    backgroundColor: color_token.white,
    borderRadius: size(10),
    borderWidth: 1,
    borderColor: color_token.gray350,
    marginBottom: size(14),
  },
  contentInput: {
    padding: size(20),
    height: size(300),
    backgroundColor: color_token.white,
    borderRadius: size(10),
    borderWidth: 1,
    borderColor: color_token.gray350,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginHorizontal: size(24),
    paddingBottom: Platform.OS === 'ios' ? size(20) : size(40),
  },
  button: {
    backgroundColor: color_token.gray400,
    borderRadius: size(5),
    justifyContent: 'center',
    alignItems: 'center',
    height: size(50),
  },
  buttonActive: {
    backgroundColor: color_token.primary,
  },
  lottieView: {
    width: size(100),
    height: size(100),
  },
})
