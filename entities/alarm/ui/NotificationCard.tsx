import {Notification} from '../types'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

type Props = {
  type: Notification['type']
  userName: string
  onClick: VoidFunction
  isRead: boolean
  date: string
}

const NotificationCard = ({type, userName, isRead, date, onClick}: Props) => {
  const notificationCard = (() => {
    switch (type) {
      case 'FRIEND_FEEDBACK':
        return {
          style: reaction,
          info: {title: '친구의 반응', body: `님이 반응을 남겼습니다.`},
        }
      case 'FRIEND_UPDATE':
        return {
          style: news,
          info: {title: '친구의 새소식', body: `님이 새로운 티켓 발권을 했습니다.`},
        }
    }
  })()

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.card, !isRead && styles.active]} onPress={onClick}>
      <View style={styles.titleSection}>
        <View style={styles.title}>
          <View style={[styles.status, notificationCard.style.bg]} />
          <Text style={[styles.title, notificationCard.style.color]}>{notificationCard?.info?.title}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.nickname}>{userName}</Text>
        <Text>{notificationCard.info.body}</Text>
      </View>
    </TouchableOpacity>
  )
}

export {NotificationCard}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#E4E3DF',
  },
  active: {
    backgroundColor: 'white',
  },
  status: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '400',
    fontSize: 14,
  },
  nickname: {
    fontWeight: '600',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  date: {
    fontWeight: '400',
    fontSize: 12,
    color: '#B9B8B3',
  },
})

const reaction = StyleSheet.create({
  bg: {
    backgroundColor: '#EF4B87',
  },
  color: {
    color: '#EF4B87',
  },
})

const news = StyleSheet.create({
  bg: {
    backgroundColor: '#1E5EF4',
  },
  color: {
    color: '#1E5EF4',
  },
})
