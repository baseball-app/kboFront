import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const AddDoubleHeaderTicketButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onPress} //
      style={styles.doubleHeaderButton}>
      <Text style={styles.doubleHeaderText}>더블헤더 작성하기</Text>
    </TouchableOpacity>
  )
}

export {AddDoubleHeaderTicketButton}

const styles = StyleSheet.create({
  doubleHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16 * 1.4,
  },
  doubleHeaderButton: {
    backgroundColor: '#353430',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 99,
    alignSelf: 'flex-start', // fit-content 효과
    marginInline: 'auto',
  },
})
