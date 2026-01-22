import {StyleSheet} from 'react-native';
import Header from '@/components/common/Header';
import React from 'react';
import {AlarmList} from '@/widgets/alarm/alarm-list';
import {SafeAreaView} from 'react-native-safe-area-context';

const AlarmScreen = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header title="알림" hasBackButton={false} />
      <AlarmList />
    </SafeAreaView>
  );
};
export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
