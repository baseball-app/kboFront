import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

type Props = {
  name: string
  isActive?: boolean
  onClick?: () => void
  paddingHorizontal: number
}

const Tag = ({name, isActive, onClick, paddingHorizontal}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1} //
      onPress={onClick}
      style={[styles.tag, isActive && styles.tagActive, {paddingHorizontal: paddingHorizontal}]}>
      <Text style={[styles.text, isActive && styles.textActive]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Tag

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    backgroundColor: '#F3F2EE',
    borderColor: '#E4E2DC',
    borderRadius: 999,
    paddingVertical: 4,
    // paddingHorizontal: 12,
  },
  tagActive: {
    backgroundColor: '#1E5EF41A',
    borderColor: '#1E5EF4',
  },
  text: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    color: '#171716',
  },
  textActive: {
    color: '#1E5EF4',
  },
})
