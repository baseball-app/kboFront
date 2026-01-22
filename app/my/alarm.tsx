import {StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '@/components/common/Header';
import React from 'react';
import {AlarmList} from '@/widgets/alarm/alarm-list';
import {color_token} from '@/constants/theme';

const AlarmScreen = () => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}>
      <Header title="알림" />
      <AlarmList />
    </SafeAreaView>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.white,
  },
});
