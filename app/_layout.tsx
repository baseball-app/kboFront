import 'react-native-gesture-handler'
import 'react-native-reanimated'
import {useEffect} from 'react'
import {Stack} from 'expo-router'
import {useFonts} from 'expo-font'

import * as SplashScreen from 'expo-splash-screen'

import {enableFreeze, enableScreens} from 'react-native-screens'
import QueryProvider from '@/components/provider/QueryProvider'
import CommonModal from '@/components/common/CommonModal'

enableScreens(false)
// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <QueryProvider>
            <Stack>
                <Stack.Screen name="auth" options={{headerShown: false}} />
                <Stack.Screen name="(tabs)" options={{headerShown: false}} />
                <Stack.Screen name="my" options={{headerShown: false}} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="index" options={{headerShown: false}} />
            </Stack>
            <CommonModal />
        </QueryProvider>
    )
}
