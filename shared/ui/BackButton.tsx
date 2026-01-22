import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Pressable} from './Pressable';

function BackButton({onPress}: {onPress?: () => void}) {
  return (
    <Pressable style={styles.icon} onPress={onPress}>
      <Image source={require('@/assets/icons/back.png')} style={{width: 16, height: 28}} />
    </Pressable>
  );
}

export {BackButton};

const styles = StyleSheet.create({
  icon: {
    minWidth: 16,
    minHeight: 28,
  },
});
