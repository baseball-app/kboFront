import {useSegments} from 'expo-router'
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ROUTES, useAppRouter} from '@/hooks/common'
const footerList = [
  {
    name: '캘린더',
    path: ROUTES.CALENDAR_TAB,
    icon: {
      active: require('@/assets/icons/tabMenu/calendarMenuActive.png'),
      inactive: require('@/assets/icons/tabMenu/calendarMenu.png'),
    },
  },
  {
    name: '경기 일정',
    path: ROUTES.MATCH_TAB,
    icon: {
      active: require('@/assets/icons/tabMenu/gameMatchMenuActive.png'),
      inactive: require('@/assets/icons/tabMenu/gameMatchMenu.png'),
    },
  },
  {
    name: '티켓박스',
    path: ROUTES.TICKET_TAB,
    icon: {
      active: require('@/assets/icons/tabMenu/ticketMenuActive.png'),
      inactive: require('@/assets/icons/tabMenu/ticketMenu.png'),
    },
  },
  // {
  //   name: '알림',
  //   path: router_address.TAB.ALARM,
  //   icon: {
  //     active: require('@/assets/icons/tabMenu/alarmMenuActive.png'),
  //     inactive: require('@/assets/icons/tabMenu/alarmMenu.png'),
  //   },
  // },
  {
    name: '아구정보',
    path: ROUTES.RANK_TAB,
    icon: {
      active: require('@/assets/icons/tabMenu/rankMenuActive.png'),
      inactive: require('@/assets/icons/tabMenu/rankMenu.png'),
    },
  },
  {
    name: '마이',
    path: ROUTES.MY_TAB,
    icon: {
      active: require('@/assets/icons/tabMenu/myMenuActive.png'),
      inactive: require('@/assets/icons/tabMenu/myMenu.png'),
    },
  },
]

/** Footer Tab Menu 컴포넌트 */
const Footer = () => {
  const router = useAppRouter()
  const segments = useSegments()

  const currentPath = `/${segments.join('/')}`

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.footerContainer}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {footerList.map(item => {
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  if (currentPath === item.path) {
                    // 현재 경로와 탭 경로가 같으면 스크롤을 맨 위로 이동
                  } else {
                    // 다른 탭으로 이동
                    router.navigate(item.path)
                  }
                }}
                style={styles.tabButton}>
                <Image
                  source={currentPath === item.path ? item.icon.active : item.icon.inactive}
                  style={styles.tabImg}
                />
                <Text style={currentPath === item.path ? styles.tabTextActive : styles.tabText}>{item.name}</Text>
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
    paddingHorizontal: 12,
    width: '100%',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: 24,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#171716',
  },
  tabTextActive: {
    color: '#171716',
    fontSize: 12,
    fontWeight: 700,
  },
})

export {Footer}
