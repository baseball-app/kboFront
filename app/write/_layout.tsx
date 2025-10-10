import {Stack, Tabs} from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="ticket" options={{headerShown: false}} />
      <Stack.Screen name="edit" options={{headerShown: false}} />
      <Stack.Screen name="todayTicketCard" options={{headerShown: false}} />
    </Stack>
  )
}
