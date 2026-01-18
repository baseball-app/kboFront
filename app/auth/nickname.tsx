import React from 'react'
import {StyleSheet, View, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {SafeAreaView} from 'react-native-safe-area-context'
import {color_token} from '@/constants/theme'
import Header from '@/components/common/Header'
import {BackButton, BottomFloatSection, Button, Txt} from '@/shared/ui'
import {size} from '@/shared'

export default function NicknameScreen() {
  const {nickname, setNickname, moveToNextStep, moveToPrevStep} = useUserJoin()

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          content: <BackButton onPress={moveToPrevStep} />,
        }}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <View style={styles.inputSection}>
          <Txt size={24} weight="semibold" style={styles.title}>
            닉네임을{'\n'}입력해주세요
          </Txt>
          <Txt size={16} color={color_token.gray600}>
            한글/영어/숫자/밑줄/띄어쓰기를{'\n'}사용할 수 있습니다.
          </Txt>
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
        <BottomFloatSection>
          <Button type={nickname ? 'primary' : 'gray'} disabled={!nickname} onPress={moveToNextStep}>
            다음
          </Button>
        </BottomFloatSection>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  content: {
    flex: 1,
  },
  inputSection: {
    flex: 1,
    padding: size(24),
    paddingTop: size(28),
  },
  title: {
    marginBottom: size(8),
  },
  inputContainer: {
    marginTop: size(20),
  },
  input: {
    fontSize: size(16),
    paddingVertical: size(8),
    color: '#333333',
  },
  inputUnderline: {
    height: size(1),
    backgroundColor: '#CCCCCC',
    marginTop: size(4),
    marginBottom: size(1),
  },
  inputUnderlineActive: {
    height: size(2),
    backgroundColor: '#000000',
  },
})
