import Header from '@/components/common/Header';
import {size, useAppRouter} from '@/shared';
import useProfile from '@/hooks/my/useProfile';
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {color_token} from '@/constants/theme';
import {BottomFloatSection, Button, Txt} from '@/shared/ui';

const ChangeNicknameScreen = () => {
  const {updateProfile, profile} = useProfile();
  const [nickname, setNickname] = useState(profile.nickname);
  const router = useAppRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header title="닉네임 변경하기" />
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="닉네임 입력"
                placeholderTextColor={color_token.gray400}
                maxLength={10}
              />
              <View style={[styles.inputUnderline, nickname ? styles.inputUnderlineActive : null]} />
              <Txt size={14} color={color_token.gray600} style={styles.subtitle}>
                * 한글/영어/숫자/밑줄/띄어쓰기를 사용할 수 있습니다.
              </Txt>
            </View>
          </View>
        </KeyboardAvoidingView>
        <BottomFloatSection>
          <Button
            type={nickname ? 'primary' : 'gray'}
            disabled={!nickname}
            onPress={() => updateProfile({nickname}).then(router.back)}>
            변경하기
          </Button>
          <View style={{height: insets.bottom}} />
        </BottomFloatSection>
      </View>
    </SafeAreaView>
  );
};

export default ChangeNicknameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  inputSection: {
    flex: 1,
    padding: size(20),
  },
  subtitle: {
    marginTop: size(16),
  },
  inputContainer: {
    marginTop: size(20),
  },
  input: {
    fontSize: 18,
    paddingVertical: size(8),
    lineHeight: 24,
    color: color_token.gray900,
    textAlign: 'center',
  },
  inputUnderline: {
    height: 2,
    backgroundColor: color_token.gray400,
    marginTop: size(4),
  },
  inputUnderlineActive: {
    backgroundColor: color_token.gray900,
  },
  button: {
    backgroundColor: color_token.gray400,
    padding: size(15),
    borderRadius: size(10),
    alignItems: 'center',
    marginTop: size(32),
  },
  buttonActive: {
    backgroundColor: color_token.primary,
  },
});
