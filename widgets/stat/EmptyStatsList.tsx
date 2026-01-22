import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const EmptyStatsList = memo(() => {
  return (
    <View style={styles.container}>
      <Txt size={14}>아직 작성한 티켓이 없어요.</Txt>
      <Txt size={14} weight="bold">
        티켓을 작성해야 통계를 볼 수 있어요!
      </Txt>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: color_token.gray200,
    display: 'flex',
    paddingVertical: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {EmptyStatsList};
