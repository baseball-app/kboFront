import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useAppRouter, ROUTES} from '@/shared'
import {useLogout} from '@/features/auth/logout'
import {useWithdraw} from '@/features/auth/withdraw'
import {Config} from '@/config/Config'
import Clipboard from '@react-native-clipboard/clipboard'
import {usePushMessage} from '@/shared'
import {usePopup} from '@/slice/commonSlice'

const AccountMenuWidget = () => {
  const router = useAppRouter()
  const {logout} = useLogout()
  const {withdraw} = useWithdraw()

  // 개발에만 필요한 내용들
  const {openCommonPopup} = usePopup()
  const {deviceToken} = usePushMessage()

  const copyDeviceToken = () => {
    Clipboard.setString(deviceToken)
    openCommonPopup(`토큰이 복사되었습니다.`)
  }
  // 개발에만 필요한 내용들

  const menuList = [
    {title: '이용약관', onClick: () => router.push(ROUTES.MY_TERMS)},
    {title: '문의하기', onClick: () => router.push(ROUTES.MY_INQUIRY)},
    {title: '로그아웃', onClick: logout},
    {title: '회원탈퇴', onClick: withdraw},
    Config.MODE === 'dev' && {title: '디바이스 토큰 복사', onClick: copyDeviceToken},
  ].filter(Boolean) as {title: string; onClick: () => void}[]

  return (
    <View style={styles.menuContainer}>
      {menuList.map(menu => (
        <TouchableOpacity key={menu.title} style={styles.menuItem} onPress={menu.onClick}>
          <Text style={styles.menuText}>{menu.title}</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 70,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
})

export {AccountMenuWidget}
