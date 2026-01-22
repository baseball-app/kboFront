import React from 'react';
import {Image, View} from 'react-native';
import {useCheckUnReadAlarm} from '../model';
import {Pressable} from '@/shared';

type AlarmIconProps = {
  onPress?: () => void;
};

const AlarmIcon = ({onPress}: AlarmIconProps) => {
  const {data} = useCheckUnReadAlarm();

  return (
    <Pressable style={{position: 'relative'}} onPress={onPress}>
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
            right: -2.5,
          }}
        />
      ) : null}
    </Pressable>
  );
};

export {AlarmIcon};
