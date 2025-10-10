import React from 'react'
import {Image, View} from 'react-native'
import {useCheckUnReadAlarm} from '../model'

const AlarmIcon = () => {
  const {data} = useCheckUnReadAlarm()

  return (
    <View style={{position: 'relative'}}>
      <Image source={require('@/assets/icons/tabMenu/alarmMenuActive.png')} style={{width: 24, height: 24}} />
      {data?.is_unread ? (
        <View
          style={{
            width: 5,
            height: 5,
            backgroundColor: '#E42217',
            borderRadius: 9999,
            position: 'absolute',
            top: 0,
            right: -3.5,
          }}
        />
      ) : null}
    </View>
  )
}

export {AlarmIcon}
