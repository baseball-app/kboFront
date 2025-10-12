import {Pressable} from '@/shared'
import React, {memo} from 'react'
import {StyleSheet, Text} from 'react-native'

type Props = {
  name: string
  isActive?: boolean
  onClick?: () => void
  paddingHorizontal: number
}

function TeamTag({name, isActive, onClick, paddingHorizontal}: Props) {
  return (
    <Pressable
      onPress={onClick}
      style={[styles.tag, isActive && styles.tagActive, {paddingHorizontal: paddingHorizontal}]}>
      <Text style={[styles.text, isActive && styles.textActive]}>{name}</Text>
    </Pressable>
  )
}

const MemoizedTeamTag = memo(TeamTag, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive
})

export {MemoizedTeamTag as TeamTag}

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
