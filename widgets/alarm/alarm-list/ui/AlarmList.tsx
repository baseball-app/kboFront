import {useAlarmList, Notification, EmptyNotificationView, NotificationCard} from '@/entities/alarm'
import {useReadAlarm} from '@/features/alarm/read-alarm'
import {ROUTES, useAppRouter} from '@/hooks/common'
import useProfile from '@/hooks/my/useProfile'
import dayjs from 'dayjs'
import {useSegments} from 'expo-router'
import React, {useEffect, useRef} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'

const AlarmList = () => {
  const {alarmList, fetchNextPage, refetch} = useAlarmList()
  const {readAlarm} = useReadAlarm()
  const {profile} = useProfile()

  const segments = useSegments()
  const router = useAppRouter()
  const ref = useRef<FlatList>(null)
  useEffect(() => {
    ref.current?.scrollToOffset({offset: 0})
  }, [segments])

  /**
   * 알림을 클릭했을 때 호출하는 함수
   * @param notification 클릭한 알림
   */
  const onClickNotification = (notification: Notification) => {
    if (!notification.is_read) {
      readAlarm(
        {id: notification.id, is_read: true},
        {
          onSuccess: () => refetch(),
        },
      )
    }

    const targetId = notification.type === 'FRIEND_FEEDBACK' ? profile.id : notification.user_info.id

    router.push(ROUTES.WRITE_TODAY_TICKET_CARD, {
      id: notification.ticket,
      target_id: targetId,
    })
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={ref}
        data={alarmList} //  || notificationList
        keyExtractor={_ => String(_.id)}
        ListEmptyComponent={<EmptyNotificationView />}
        ListHeaderComponent={<View style={{height: 24}} />}
        ListFooterComponent={<View style={{height: 24}} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.6}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        renderItem={({item}) => (
          <View style={{marginInline: 24}}>
            <NotificationCard
              type={item?.type}
              userName={item?.user_info?.nickname}
              isRead={item?.is_read}
              date={dayjs(item?.created_at).format('YY.MM.DD')}
              onClick={() => onClickNotification(item)}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F2EE',
  },
  headerTitleBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171716',
  },
})

export {AlarmList}
