import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const EmptyMatchView = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>경기 일정이 없어요.</Text>
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
  },
  image: {
    width: 22,
    height: 22,
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 19.6,
    paddingVertical: 56,
  },
})
