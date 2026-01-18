import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useConsent from '@/hooks/auth/useConsent'
import {Service} from '@/entities/terms'
import {useAppRouter} from '@/shared'
import {color_token} from '@/constants/theme'
import Header from '@/components/common/Header'
import {BottomFloatSection, Button} from '@/shared/ui'

const PrivacyPolicyScreen = () => {
  const {agreeConsent, isScrolledToBottom, handleScroll, scrollViewRef} = useConsent()
  const router = useAppRouter()
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        ref={scrollViewRef} //
        style={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={400}>
        {/* 이용약관 */}
        <Service />
      </ScrollView>
      <BottomFloatSection style={styles.buttonContainer}>
        <Button
          onPress={() => {
            if (isScrolledToBottom) {
              agreeConsent('terms-of-service')
              router.back()
            } else {
              ;(scrollViewRef.current as any)?.scrollToEnd({animated: true})
            }
          }}>
          {isScrolledToBottom ? '동의하기' : '아래로 스크롤하기'}
        </Button>
      </BottomFloatSection>
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
    padding: 16,
  },
  buttonContainer: {
    backgroundColor: color_token.white,
  },
})

export default PrivacyPolicyScreen
