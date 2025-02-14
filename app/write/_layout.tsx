import {Stack, Tabs} from 'expo-router'
import React from 'react'
import {useColorScheme} from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="ticket" options={{headerShown: false}} />
      <Stack.Screen name="todayTicketCard" options={{headerShown: false}} />
    </Stack>
  )
}
