import dayjs from 'dayjs'
import {router} from 'expo-router'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const EmptyMatchView = () => {
  const selectedDate = dayjs().format('YYYY-MM-DD')
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>경기 일정이 없어요.</Text>
      <View style={styles.doubleHeaderBox}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/write',
              params: {
                date: dayjs(selectedDate).format('YYYY-MM-DD'),
                step: 2,
              },
            })
          }
          style={styles.doubleHeaderButton}>
          <Text style={styles.doubleHeaderText}>직접 추가하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EmptyMatchView

const styles = StyleSheet.create({
  wrapper: {
    borderColor: '#D0CEC7',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 40,
  },
  image: {
    width: 22,
    height: 22,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 16 * 1.4,
    paddingBottom: 24,
  },
  doubleHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 16 * 1.4,
  },
  doubleHeaderButton: {
    backgroundColor: '#353430',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 99,
  },
  doubleHeaderBox: {
    alignItems: 'center',
  },
})
