import {Tabs} from 'expo-router'
import React from 'react'
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'

import Footer from '@/components/layout/Footer'
import {TextStyle} from 'react-native'
import Header from '@/components/common/Header'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const headerStyle: TextStyle = {
  fontWeight: '700',
  fontSize: 18,
  lineHeight: 18 * 1.4,
}

const headerOptions: BottomTabNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: headerStyle,
}

export default function TabLayout() {
  const tabScreenOptions: BottomTabNavigationOptions = {
    tabBarHideOnKeyboard: true,
    headerShadowVisible: false,
    tabBarStyle: {display: 'none'},
  }

  const {top} = useSafeAreaInsets()

  return (
    <Tabs screenOptions={tabScreenOptions} tabBar={() => <Footer />}>
      {/* 캘린더 탭 화면 */}
      <Tabs.Screen name="index" options={{headerShown: false}} />
      {/* 경기 일정 탭 화면 */}
      <Tabs.Screen
        name="match"
        options={{header: () => <Header title="경기일정" hasBackButton={false} topInset={top} />}}
      />
      {/* 티켓 박스 탭 화면 */}
      <Tabs.Screen
        name="ticket"
        options={{header: () => <Header title="나의 티켓박스" hasBackButton={false} topInset={top} />}}
      />
      {/* 알림 탭 화면 */}
      <Tabs.Screen
        name="rank"
        options={{header: () => <Header title="야구 정보" hasBackButton={false} topInset={top} />}}
      />
      {/* 마이 페이지 탭 화면 */}
      <Tabs.Screen name="my" options={{headerShown: false}} />
    </Tabs>
  )
}
