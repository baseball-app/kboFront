import 'react-native-gesture-handler'
import 'react-native-reanimated'
import {useEffect, useState} from 'react'
import {Stack, usePathname} from 'expo-router'
import {useFonts} from 'expo-font'

import * as SplashScreen from 'expo-splash-screen'

import {enableScreens} from 'react-native-screens'
import QueryProvider from '@/components/provider/QueryProvider'
import CommonModal from '@/components/common/CommonModal'
import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Text} from 'react-native'

enableScreens(false)
// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const pathname = usePathname()
  const dailyWriteStore = useDailyWriteStore()

  useEffect(() => {
    // pathname이 write가 아닌 다른 페이지의 경우 전역상태 값을 초기화 시킴
    // TODO: 전역상태kbo로 굳이 관리할 필요 없을 것 같음 -> 직관일기 작성 페이지 리팩터링 후 수정 예정
    if (!pathname.includes('/write')) dailyWriteStore.clearState()
  }, [pathname])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="auth" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="my" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="write" options={{headerShown: false}} />
        <Stack.Screen name="ticket" options={{headerShown: false}} />
      </Stack>
      <CommonModal />
    </QueryProvider>
  )
}
