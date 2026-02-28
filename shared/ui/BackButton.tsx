import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Pressable} from './Pressable';
import {size} from '../lib';

function BackButton({onPress}: {onPress?: () => void}) {
  return (
    <Pressable style={styles.icon} onPress={onPress}>
      <Image source={require('@/assets/icons/back.png')} style={{width: size(28), height: size(28)}} />
    </Pressable>
  );
}

export {BackButton};

const styles = StyleSheet.create({
  icon: {
    minWidth: size(28),
    minHeight: size(28),
  },
});
