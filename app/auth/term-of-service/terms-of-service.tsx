import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import useConsent from '@/hooks/auth/useConsent'
import {Service} from '@/entities/terms'
import {useAppRouter} from '@/shared'
import {color_token} from '@/constants/theme'

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
        {/* 이용약관 */}
        <Service />
      </ScrollView>
      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() => {
          if (isScrolledToBottom) {
            agreeConsent('terms-of-service')
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
    backgroundColor: color_token.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
