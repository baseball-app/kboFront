import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const CalendarTitle = ({selectedUserName}: {selectedUserName: string}) => {
  return (
    <View style={styles.tabMenu}>
      <Text style={styles.todayText}>{selectedUserName ? `${selectedUserName}님의 야구 캘린더` : '오늘의 야구'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    lineHeight: 22.4,
  },
})

export default CalendarTitle
