import {useSegments} from 'expo-router'
import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Pressable, ROUTES, useAppRouter} from '@/shared'
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
  //   path: ROUTES.ALARM_TAB,
  //   icon: {
  //     active: require('@/assets/icons/tabMenu/alarmMenuActive.png'),
  //     inactive: require('@/assets/icons/tabMenu/alarmMenu.png'),
  //   },
  // },
  {
    name: '경기통계',
    path: ROUTES.STATS_TAB,
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

  const [activePath, setActivePath] = useState<string>(ROUTES.CALENDAR_TAB)

  useEffect(() => {
    const currentPath = `/${segments.join('/')}`
    const tab = footerList.find(item => item.path === currentPath)
    if (tab && tab.path !== activePath) setActivePath(currentPath)
  }, [segments])

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.footerContainer}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {footerList.map(item => {
            return (
              <Pressable
                key={item.name}
                onPress={() => {
                  if (activePath === item.path) {
                    // 현재 경로와 탭 경로가 같으면 스크롤을 맨 위로 이동
                  } else {
                    // 다른 탭으로 이동
                    router.navigate(item.path)
                    setActivePath(item.path)
                  }
                }}
                style={[styles.tabButton]}>
                <Image
                  source={activePath === item.path ? item.icon.active : item.icon.inactive}
                  style={styles.tabImg}
                />
                <Text style={activePath === item.path ? styles.tabTextActive : styles.tabText}>{item.name}</Text>
              </Pressable>
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
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    // Android는 elevation이 위쪽 그림자를 지원하지 않아 borderTop으로 대체
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
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
