import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {Ionicons} from '@expo/vector-icons'
import {size, useAppRouter} from '@/shared'
import {color_token} from '@/constants/theme'
import {Txt} from '@/shared/ui'

const TermsScreen = () => {
  const router = useAppRouter()
  const moveToDetail = (value: 'privacy-policy' | 'terms-of-service') => {
    router.push(`/my/terms/${value}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="이용약관" />

      <TouchableOpacity style={styles.menuItem} onPress={() => moveToDetail('terms-of-service')}>
        <Txt size={16} weight="medium">
          이용약관
        </Txt>
        <Ionicons name="chevron-forward" size={24} color={color_token.gray500} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => moveToDetail('privacy-policy')}>
        <Txt size={16} weight="medium">
          개인정보 처리방침
        </Txt>
        <Ionicons name="chevron-forward" size={24} color={color_token.gray500} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default TermsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: size(15),
    marginVertical: 1,
  },
})
