import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, DimensionValue, Animated, StyleProp, ViewStyle} from 'react-native';
import {size} from '@/shared';
import {color_token} from '@/constants/theme';

type SkeletonProps = {
  width: DimensionValue;
  height: DimensionValue;
  type?: 'circle' | 'rect';
  style?: StyleProp<ViewStyle>;
};

const Skeleton = ({width, height, type = 'rect', style}: SkeletonProps) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 1초 후에 애니메이션 다시 시작
        setTimeout(startAnimation, 1000);
      });
    };

    startAnimation();

    return () => {
      opacityAnim.stopAnimation();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {width: width, height: height, borderRadius: type === 'circle' ? size(9999) : size(10)},
        {opacity: opacityAnim},
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: size(100),
    backgroundColor: color_token.gray300,
    borderRadius: size(10),
  },
});

export default Skeleton;
