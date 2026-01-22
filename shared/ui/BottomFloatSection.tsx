import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {size} from '@/shared';

function BottomFloatSection({children, style}: {children: React.ReactNode; style?: StyleProp<ViewStyle>}) {
  return <View style={[styles.buttonContainer, style]}>{children}</View>;
}

export {BottomFloatSection};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    // bottom: size(40),
    // left: size(16),
    // right: size(16),
    bottom: 0,
    left: 0,
    right: 0,
    padding: size(16),
    paddingBottom: size(24),
  },
});
