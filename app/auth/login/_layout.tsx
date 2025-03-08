import {View} from 'react-native'
import {Stack} from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="kakao-login" options={{headerShown: false}} />
      <Stack.Screen name="naver-login" options={{headerShown: false}} />
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  )
}
