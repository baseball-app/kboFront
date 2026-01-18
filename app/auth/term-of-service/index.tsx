import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import useUserJoin from '@/hooks/auth/useUserJoin'
import {color_token, font} from '@/constants/theme'
import Header from '@/components/common/Header'
import {BackButton, BottomFloatSection, Button, Pressable, Txt} from '@/shared/ui'
import {size} from '@/shared'

const TermUseScreen = () => {
  const {consent, moveToNextStep, moveToPrevStep} = useUserJoin()

  const {
    isAllChecked,
    isChecked,
    toggleAllConsent,
    toggleConsent,
    moveToConsentDetail,
    consentList, //
  } = consent

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          content: <BackButton onPress={moveToPrevStep} />,
        }}
      />

      <View style={styles.content}>
        <Txt size={24} weight="semibold" style={styles.title}>
          오늘의 야구{'\n'}서비스 이용에 동의해{'\n'}주세요
        </Txt>
        <Pressable style={styles.agreementAllItem} onPress={toggleAllConsent}>
          <View style={[styles.circle, isAllChecked && styles.checkedCircle]}>
            <Image source={require('../../../assets/icons/check.png')} style={styles.checkIcon} />
          </View>
          <Txt size={16} weight="semibold" style={styles.agreementText}>
            필수 약관 모두 동의
          </Txt>
        </Pressable>

        {consentList.map(consent => (
          <Pressable key={consent.value} style={styles.agreementItem} onPress={() => toggleConsent(consent.value)}>
            <View style={[styles.circle, isChecked(consent.value) && styles.checkedCircle]}>
              <Image source={require('@/assets/icons/check.png')} style={styles.checkIcon} />
            </View>
            <Txt
              size={15}
              color={isChecked(consent.value) ? color_token.gray900 : color_token.gray500}
              style={styles.agreementText}>
              {consent.title}
            </Txt>
            <Pressable onPress={() => moveToConsentDetail(consent.value)}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isChecked(consent.value) ? color_token.gray900 : color_token.gray350}
                style={styles.chevron}
              />
            </Pressable>
          </Pressable>
        ))}
        <BottomFloatSection>
          <Button
            type={isAllChecked ? 'primary' : 'gray'}
            disabled={!isAllChecked}
            onPress={() => isAllChecked && moveToNextStep()}>
            동의하기
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
  circle: {
    width: size(24),
    height: size(24),
    borderRadius: 50, // Half of width/height
    backgroundColor: '#D1D1D6',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  checkedCircle: {
    backgroundColor: '#353430',
  },
  checkIcon: {
    // position: 'absolute',
    width: size(24),
    height: size(24),
  },
  content: {
    flex: 1,
    paddingHorizontal: size(24),
    // paddingTop: 10,
  },

  title: {
    marginBottom: size(40),
    marginTop: size(28),
  },
  agreementAllItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: size(12),
    backgroundColor: '#F3F2EE',
    paddingVertical: size(16),
    paddingHorizontal: size(16),
    borderRadius: size(10),
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: size(4),
    paddingVertical: size(16),
    paddingHorizontal: size(16),
    borderRadius: size(10),
  },
  agreementText: {
    marginLeft: size(14),
    flex: 1,
  },
  agreementTextActive: {
    color: color_token.gray900,
  },
  chevron: {
    marginLeft: 'auto',
  },
})

export default TermUseScreen
