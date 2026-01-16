import React, {useEffect, useRef} from 'react'
import {View, StyleSheet, DimensionValue, Animated} from 'react-native'
import {size} from '@/shared'

type SkeletonProps = {
  width: DimensionValue
  height: DimensionValue
  type?: 'circle' | 'rect'
}

const Skeleton = ({width, height, type = 'rect'}: SkeletonProps) => {
  const opacityAnim = useRef(new Animated.Value(1)).current

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
        setTimeout(startAnimation, 1000)
      })
    }

    startAnimation()

    return () => {
      opacityAnim.stopAnimation()
    }
  }, [])

  return (
    <Animated.View
      style={[
        styles.container,
        {width: width, height: height, borderRadius: type === 'circle' ? size(9999) : size(10)},
        {opacity: opacityAnim},
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: size(100),
    backgroundColor: '#E4E2DC',
    borderRadius: size(10),
  },
})

export default Skeleton
