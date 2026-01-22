import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const EmptyMatchView = ({onClick}: {onClick: () => void}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>경기 일정이 없어요.</Text>
      <View style={styles.doubleHeaderBox}>
        <TouchableOpacity style={styles.doubleHeaderButton} onPress={onClick}>
          <Text style={styles.doubleHeaderText}>직접 추가하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {EmptyMatchView};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: '#D0CEC7',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 40,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 16 * 1.4,
    paddingBottom: 24,
  },
  doubleHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 16 * 1.4,
  },
  doubleHeaderButton: {
    backgroundColor: '#353430',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 99,
  },
  doubleHeaderBox: {
    alignItems: 'center',
  },
});
