import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import {Ionicons} from '@expo/vector-icons'
import {useAppRouter} from '@/shared'
import {color_token} from '@/constants/theme'

const TermsScreen = () => {
  const router = useAppRouter()
  const moveToDetail = (value: 'privacy-policy' | 'terms-of-service') => {
    router.push(`/my/terms/${value}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="이용약관" />

      <TouchableOpacity style={styles.menuItem} onPress={() => moveToDetail('terms-of-service')}>
        <Text style={styles.menuText}>이용약관</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => moveToDetail('privacy-policy')}>
        <Text style={styles.menuText}>개인정보 처리방침</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
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
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color_token.white,
    padding: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'white',
    padding: 15,
    marginVertical: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
})
