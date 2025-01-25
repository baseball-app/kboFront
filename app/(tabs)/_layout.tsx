import {Tabs} from 'expo-router'
import React from 'react'
import {useColorScheme} from '@/hooks/useColorScheme'
import Footer from '@/components/layout/Footer'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: {display: 'none'},
            }}
            tabBar={() => <Footer />}>
            {/* 캘린더 탭 화면 */}
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            {/* 경기 일정 탭 화면 */}
            <Tabs.Screen
                name="match"
                options={{
                    headerShown: false,
                }}
            />
            {/* 티켓 박스 탭 화면 */}
            <Tabs.Screen
                name="ticket"
                options={{
                    headerShown: false,
                }}
            />
            {/* 알림 탭 화면 */}
            <Tabs.Screen
                name="alarm"
                options={{
                    title: '알림',
                }}
            />
            {/* 마이 페이지 탭 화면 */}
            <Tabs.Screen
                name="my"
                options={{
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}
