import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import useConsent from '@/hooks/auth/useConsent'
import {Privacy} from '@/entities/terms'
import {useAppRouter} from '@/hooks/common'
const PrivacyPolicyScreen = () => {
  const {agreeConsent, isScrolledToBottom, handleScroll, scrollViewRef} = useConsent()
  const router = useAppRouter()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef} //
        style={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={400}>
        {/* 개인정보 처리방침 */}
        <Privacy />
      </ScrollView>
      <TouchableOpacity
        style={[styles.agreeButton]}
        onPress={() => {
          if (isScrolledToBottom) {
            agreeConsent('privacy-policy')
            router.back()
          } else {
            ;(scrollViewRef.current as any)?.scrollToEnd({animated: true})
          }
        }}>
        <Text style={styles.agreeButtonText}>{isScrolledToBottom ? '동의하기' : '아래로 스크롤하기'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3',
  },
  header: {
    padding: 16,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  agreeButton: {
    backgroundColor: '#1A73E8',
    padding: 14,
    alignItems: 'center',
    margin: 16,
    borderRadius: 10,
  },
  agreeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default PrivacyPolicyScreen
