import React from 'react'
import {StyleSheet, View, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {DEFAULT_PROFILE_IMAGE, PROFILE_IMAGES} from '@/constants/join'
import Header from '@/components/common/Header'
import {color_token} from '@/constants/theme'
import {BackButton, BottomFloatSection, Button, Pressable, Txt} from '@/shared/ui'
import {size} from '@/shared'

export default function ProfileImageScreen() {
  const {profile, setProfile, moveToNextStep, moveToPrevStep} = useUserJoin()

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          content: <BackButton onPress={moveToPrevStep} />,
        }}
      />

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <Txt size={24} weight="semibold" style={styles.title}>
            프로필 이미지를{'\n'}선택해주세요
          </Txt>
          <Txt size={16} color={color_token.gray600} style={styles.subtitle}>
            내가 응원하는 선수의 포지션에 맞는{'\n'}이미지를 선택해도 좋아요.
          </Txt>
          <View style={styles.selectedImageContainer}>
            <View style={styles.selectedImageWrapper}>
              <Image
                source={!profile ? DEFAULT_PROFILE_IMAGE : profile.image}
                style={styles.selectedImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.imagesGrid}>
            {PROFILE_IMAGES.map(item => (
              <Pressable key={item.id} onPress={() => setProfile(item)}>
                <View style={[styles.imageOptionWrapper, profile?.id === item.id && styles.selectedImageOptionWrapper]}>
                  <Image source={item.image} style={styles.imageOption} />
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <BottomFloatSection>
          <Button
            type={profile ? 'primary' : 'gray'}
            disabled={!profile}
            onPress={() => Boolean(profile) && moveToNextStep()}>
            시작하기
          </Button>
        </BottomFloatSection>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: size(24),
    paddingTop: size(28),
    flex: 1,
  },
  title: {
    marginBottom: size(5),
  },
  subtitle: {
    marginBottom: size(40),
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: size(36),
  },
  selectedImageWrapper: {
    width: size(174),
    height: size(174),
    borderRadius: 999,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '70%',
    height: '70%',
  },
  imagesGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: size(20),
  },
  selectedImageButton: {
    // transform: [{scale: 1.1}],
  },
  imageOptionWrapper: {
    width: size(80),
    height: size(80),
    borderRadius: 999,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color_token.gray300,
  },
  selectedImageOptionWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: size(2),
    borderColor: '#353430',
  },
  imageOption: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
})
