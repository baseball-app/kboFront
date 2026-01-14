import {ReactNode, useEffect} from 'react'
import {StyleSheet, View, ViewStyle, LayoutChangeEvent} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface LinearBorderBoxProps {
  children: ReactNode
  /** 그라데이션 색상 배열 (최소 2개) */
  colors?: [string, string, ...string[]]
  /** 색상 위치 배열 (0~1, 최소 2개) */
  locations?: [number, number, ...number[]]
  /** 회전 애니메이션 활성화 여부 */
  animated?: boolean
  /** 한 바퀴 회전 시간 (ms) */
  duration?: number
  /** 테두리 두께 */
  borderWidth?: number
  /** 테두리 radius */
  borderRadius?: number
  /** 내부 배경색 */
  backgroundColor?: string
  /** 내부 컨텐츠 스타일 */
  contentStyle?: ViewStyle
  /** 컨테이너 스타일 */
  style?: ViewStyle
}

export const LinearBorderBox = ({
  children,
  colors = ['#EF4B87', '#EF4B87', '#1E5EF4'],
  locations = [0, 0.45, 1],
  animated = true,
  duration = 3000,
  borderWidth = 2,
  borderRadius = 12,
  backgroundColor = 'transparent',
  contentStyle,
  style,
}: LinearBorderBoxProps) => {
  const rotation = useSharedValue(0)
  const containerWidth = useSharedValue(1000)
  const containerHeight = useSharedValue(1000)

  useEffect(() => {
    if (animated) {
      rotation.value = withRepeat(withTiming(360, {duration, easing: Easing.linear}), -1, false)
    }
  }, [animated, duration])

  const handleLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout
    if (width > 0 && height > 0) {
      containerWidth.value = width
      containerHeight.value = height
    }
  }

  // worklet 내부에서 대각선 길이 계산 및 그라데이션 크기 결정
  const gradientSize = useDerivedValue(() => {
    'worklet'
    const diagonal = Math.sqrt(containerWidth.value ** 2 + containerHeight.value ** 2)
    // 그라데이션 크기 = 대각선 * 2 (충분한 여유 공간)
    return diagonal * 2
  })

  const gradientRadius = useDerivedValue(() => {
    'worklet'
    return gradientSize.value / 2
  })

  const gradientOffset = useDerivedValue(() => {
    'worklet'
    return gradientSize.value / 2
  })

  const rotatingStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      position: 'absolute',
      width: gradientSize.value,
      height: gradientSize.value,
      top: '50%',
      left: '50%',
      marginTop: -gradientOffset.value,
      marginLeft: -gradientOffset.value,
      transform: animated ? [{rotate: `${rotation.value % 360}deg`}] : [],
    }
  })

  const gradientStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      width: gradientSize.value,
      height: gradientSize.value,
      borderRadius: gradientRadius.value,
    }
  })

  const innerBorderRadius = borderRadius - borderWidth

  return (
    <View style={[styles.container, {borderRadius, padding: borderWidth}, style]} onLayout={handleLayout}>
      <Animated.View style={rotatingStyle}>
        <Animated.View style={gradientStyle}>
          <LinearGradient
            colors={colors}
            locations={locations}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}
          />
        </Animated.View>
      </Animated.View>
      <View style={[styles.content, {backgroundColor, borderRadius: innerBorderRadius}, contentStyle]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  content: {
    // padding: 16,
  },
})
