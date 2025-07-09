import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import useUserJoin from '@/hooks/auth/useUserJoin'

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={moveToPrevStep}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>
          오늘의 야구{'\n'}서비스 이용에 동의해{'\n'}주세요
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.agreementAllItem} onPress={toggleAllConsent}>
          <View style={[styles.circle, isAllChecked && styles.checkedCircle]}>
            <Image source={require('../../../assets/icons/check.png')} style={styles.checkIcon} />
          </View>
          <Text
            style={[
              styles.agreementText,
              styles.agreementTextActive,
              {
                fontWeight: 600,
              },
            ]}>
            필수 약관 모두 동의
          </Text>
        </TouchableOpacity>

        {consentList.map(consent => (
          <TouchableOpacity
            key={consent.value}
            style={styles.agreementItem}
            onPress={() => toggleConsent(consent.value)}>
            <View style={[styles.circle, isChecked(consent.value) && styles.checkedCircle]}>
              <Image source={require('../../../assets/icons/check.png')} style={styles.checkIcon} />
            </View>
            <Text style={[styles.agreementText, isChecked(consent.value) && styles.agreementTextActive]}>
              {consent.title}
            </Text>
            <TouchableOpacity onPress={() => moveToConsentDetail(consent.value)}>
              <Ionicons name="chevron-forward" size={20} color="#D1D1D6" style={styles.chevron} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.agreeButton, isAllChecked && styles.agreeButtonActive]}
          onPress={() => isAllChecked && moveToNextStep()}
          disabled={!isAllChecked}>
          <Text style={[styles.agreeButtonText, isAllChecked && styles.agreeButtonTextActive]}>동의하기</Text>
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
  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  circle: {
    width: 24,
    height: 24,
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
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingTop: 10,
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 24 * 1.4,
    marginBottom: 40,
  },
  agreementAllItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#F3F2EE',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  agreementText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: '#95938B',
    fontWeight: 400,
    lineHeight: 16 * 1.4,
  },
  agreementTextActive: {
    color: '#171716',
  },
  chevron: {
    marginLeft: 'auto',
  },
  agreeButton: {
    backgroundColor: '#E4E2DC',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
  },
  agreeButtonActive: {
    backgroundColor: '#1E5EF4',
  },
  agreeButtonText: {
    color: '#77756C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  agreeButtonTextActive: {
    color: '#FFFFFF',
  },
})

export default TermUseScreen
