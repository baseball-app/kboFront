import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {DEFAULT_PROFILE_IMAGE, PROFILE_IMAGES} from '@/constants/join'
import Header from '@/components/common/Header'
import {color_token} from '@/constants/theme'

export default function ProfileImageScreen() {
  const {profile, setProfile, moveToNextStep, moveToPrevStep} = useUserJoin()

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          onPress: moveToPrevStep, //
          content: <Ionicons name="chevron-back" size={24} color="black" />,
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>프로필 이미지를{'\n'}선택해주세요</Text>
        <Text style={styles.subtitle}>내가 응원하는 선수의 포지션에 맞는{'\n'}이미지를 선택해도 좋아요.</Text>
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
            <TouchableOpacity key={item.id} onPress={() => setProfile(item)}>
              <View style={[styles.imageOptionWrapper, profile?.id === item.id && styles.selectedImageOptionWrapper]}>
                <Image source={item.image} style={styles.imageOption} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!profile}
          style={[styles.nextButton, Boolean(profile) && styles.nextButtonActive]}
          onPress={() => Boolean(profile) && moveToNextStep()}>
          <Text style={[styles.nextButtonText, Boolean(profile) && styles.nextButtonTextActive]}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    lineHeight: 24 * 1.4,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 16,
    color: '#77756C',
    marginBottom: 40,
    lineHeight: 16 * 1.4,
    fontWeight: 400,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  selectedImageWrapper: {
    width: 174,
    height: 174,
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
    gap: 20,
  },
  selectedImageButton: {
    // transform: [{scale: 1.1}],
  },
  imageOptionWrapper: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0CEC7',
  },
  selectedImageOptionWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#353430',
  },
  imageOption: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  imageDimensions: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#E4E2DC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#77756C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonActive: {
    backgroundColor: '#1E5EF4',
  },
  nextButtonTextActive: {
    color: '#FFFFFF',
  },
})
