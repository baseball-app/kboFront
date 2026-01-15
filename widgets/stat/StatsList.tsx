import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {EmptyStatsList} from './EmptyStatsList'
import {LoadingStatsList} from './LoadingStatsList'

function StatsList<T>({
  data,
  isLoading,
  isError,
  renderItem,
}: {
  data: T[]
  isLoading: boolean
  isError: boolean
  renderItem: ({item}: {item: T}) => React.ReactElement
}) {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => renderItem({item})}
      ListEmptyComponent={isLoading || isError ? <LoadingStatsList /> : <EmptyStatsList />}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

export {StatsList}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 12,
  },
})
