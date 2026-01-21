import type * as React from 'react'
import {StyleSheet, Text, View, ViewProps} from 'react-native'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'
import {Txt} from '@/shared/ui'

const MatchNotification = () => {
  return (
    <View style={styles.container}>
      <Txt size={14} weight="medium">
        <Txt size={14} color={color_token.primary}>
          경기 일정
        </Txt>
        을 누르고 직관 일기를 작성해보세요!
      </Txt>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size(10),
    backgroundColor: '#6C98FF33',
  },
})

export {MatchNotification}
