import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Txt} from '@/shared/ui/Txt'
import {color_token} from '@/constants/theme'

const MatchCalendarTitle = ({selectedUserName}: {selectedUserName: string}) => {
  return (
    <View style={styles.tabMenu}>
      <Txt weight="semibold" color={color_token.black}>
        {selectedUserName ? `${selectedUserName}님의 야구 캘린더` : '오늘의 야구'}
      </Txt>
    </View>
  )
}

const styles = StyleSheet.create({
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export {MatchCalendarTitle}
