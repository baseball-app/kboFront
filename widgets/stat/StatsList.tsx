import React from 'react';
import {View, StyleSheet} from 'react-native';
import {EmptyStatsList} from './EmptyStatsList';
import {LoadingStatsList} from './LoadingStatsList';

function StatsList<T>({
  data,
  isLoading,
  isError,
  renderItem,
}: {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  renderItem: ({item}: {item: T}) => React.ReactElement;
}) {
  if (isLoading || isError) {
    return <LoadingStatsList />;
  }

  if (data.length === 0) {
    return <EmptyStatsList />;
  }

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          {renderItem({item})}
        </View>
      ))}
    </View>
  );
}

export {StatsList};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  item: {
    // 각 아이템에 대한 스타일이 필요하면 추가
  },
});
