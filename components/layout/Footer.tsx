import {router_address} from '@/constants/router'
import {useRouter, useSegments} from 'expo-router'
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

const footerList = [
    {
        name: '캘린더',
        path: router_address.TAB.CALENDAR,
        icon: {
            active: require('@/assets/icons/tabMenu/calendarMenuActive.png'),
            inactive: require('@/assets/icons/tabMenu/calendarMenu.png'),
        },
    },
    {
        name: '경기 일정',
        path: router_address.TAB.MATCH,
        icon: {
            active: require('@/assets/icons/tabMenu/gameMatchMenuActive.png'),
            inactive: require('@/assets/icons/tabMenu/gameMatchMenu.png'),
        },
    },
    {
        name: '티켓박스',
        path: router_address.TAB.TICKET,
        icon: {
            active: require('@/assets/icons/tabMenu/ticketMenuActive.png'),
            inactive: require('@/assets/icons/tabMenu/ticketMenu.png'),
        },
    },
    {
        name: '알람',
        path: router_address.TAB.ALARM,
        icon: {
            active: require('@/assets/icons/tabMenu/alarmMenuActive.png'),
            inactive: require('@/assets/icons/tabMenu/alarmMenu.png'),
        },
    },
    {
        name: '마이',
        path: router_address.TAB.MY,
        icon: {
            active: require('@/assets/icons/tabMenu/myMenuActive.png'),
            inactive: require('@/assets/icons/tabMenu/myMenu.png'),
        },
    },
]

/** Footer Tab Menu 컴포넌트 */
const Footer = () => {
    const router = useRouter()
    const segments = useSegments()

    const currentPath = `/${segments.join('/')}`

    return (
        <SafeAreaView edges={['bottom']} style={styles.footerContainer}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {footerList.map(item => {
                        return (
                            <TouchableOpacity
                                key={item.name}
                                onPress={() => router.push(item.path)}
                                style={styles.tabButton}>
                                <Image
                                    source={currentPath === item.path ? item.icon.active : item.icon.inactive}
                                    style={styles.tabImg}
                                />
                                <Text style={styles.tabText}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}

/** Footer Tab Menu Style Css */
const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#fff',
    },
    container: {
        height: 68,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
    },
    tabButton: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 51,
        height: '100%',
        justifyContent: 'center',
    },
    tabImg: {
        height: 24,
        marginBottom: 5,
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#171716',
    },
})

export default Footer
