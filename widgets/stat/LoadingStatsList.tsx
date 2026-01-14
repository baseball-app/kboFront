import React, {memo} from 'react'
import {View, StyleSheet} from 'react-native'
import Skeleton from '@/components/skeleton/Skeleton'

const LoadingStatsList = memo(() => {
  return (
    <View style={styles.container}>
      <Skeleton type="rect" width="100%" height={80} />
      <Skeleton type="rect" width="100%" height={80} />
      <Skeleton type="rect" width="100%" height={80} />
    </View>
  )
})

export {LoadingStatsList}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
})
