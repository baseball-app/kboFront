import type * as React from 'react'
import {StyleSheet, Text, View, ViewProps} from 'react-native'

const MatchNotification = () => {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.main}>직관 일기</Text>를 쓰고 싶은 경기를 눌러보세요!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#6C98FF33',
  },
  main: {
    color: '#1E5EF4',
  },
})

export {MatchNotification}
