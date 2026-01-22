import React from 'react';
import {StyleSheet} from 'react-native';
import {Pressable, Txt} from '@/shared/ui';
import {color_token} from '@/constants/theme';
import {size} from '@/shared';

const AddDoubleHeaderTicketButton = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable
      onPress={onPress} //
      style={styles.doubleHeaderButton}>
      <Txt size={14} weight="medium" color={color_token.white}>
        더블헤더 작성하기
      </Txt>
    </Pressable>
  );
};

export {AddDoubleHeaderTicketButton};

const styles = StyleSheet.create({
  doubleHeaderButton: {
    backgroundColor: color_token.gray800,
    paddingVertical: size(10),
    paddingHorizontal: size(24),
    borderRadius: 99,
    alignSelf: 'flex-start', // fit-content 효과
    marginInline: 'auto',
  },
});
