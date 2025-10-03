import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import React from 'react'
import {AlarmList} from '@/widgets/alarm/alarm-list'
import {SafeAreaView} from 'react-native-safe-area-context'

const AlarmScreen = () => {
  const {top} = useSafeAreaInsets()

  return (
    <>
      <Header title="알림" topInset={top} hasBackButton={false} />
      <SafeAreaView style={styles.container}>
        <AlarmList />
      </SafeAreaView>
    </>
  )
}
export default AlarmScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
