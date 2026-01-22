import Header from '@/components/common/Header';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';
import {MyStatWidget} from '@/widgets';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function MyStatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={
          <Txt size={18} weight="semibold" color={color_token.black}>
            나의 승요력
          </Txt>
        }
        variants="transparent"
      />
      <MyStatWidget />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
});
