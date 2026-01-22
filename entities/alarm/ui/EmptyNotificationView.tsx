import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const EmptyNotificationView = () => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={require('@/assets/notification/emptyNotification.png')} />
      <Text style={styles.text}>아직 받은 알림이 없습니다</Text>
    </View>
  );
};

export {EmptyNotificationView};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  image: {
    width: 22,
    height: 22,
  },
  text: {
    marginTop: 12,
    color: '#353430',
    fontSize: 16,
    fontWeight: 400,
  },
});
