import React, {PropsWithChildren, useEffect, useState, useCallback, useMemo, memo} from 'react'
import {StyleSheet, Pressable} from 'react-native'
import {Modal} from '@/components/common/Modal'
import Animated, {useSharedValue, withTiming, useAnimatedStyle, Easing, runOnJS} from 'react-native-reanimated'

type BottomSheetProps = {
  isOpen: boolean
  duration?: number
  height: number
  onPressOverlay?: () => void
}

const BottomSheetComponent = ({
  isOpen,
  children,
  duration = 350,
  height,
  onPressOverlay,
}: PropsWithChildren<BottomSheetProps>) => {
  const [isRealOpen, setIsRealOpen] = useState(false)

  const overlayOpacity = useSharedValue(0)
  const sheetTranslateY = useSharedValue(height)

  // setIsRealOpen을 useCallback으로 감싸서 runOnJS에서 안정적으로 사용
  const handleAnimationEnd = useCallback(() => {
    setIsRealOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsRealOpen(true)

      overlayOpacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.quad),
      })

      sheetTranslateY.value = withTiming(0, {
        duration,
        easing: Easing.out(Easing.quad),
      })
    } else {
      overlayOpacity.value = withTiming(0, {
        duration,
        easing: Easing.in(Easing.quad),
      })

      sheetTranslateY.value = withTiming(
        height,
        {
          duration,
          easing: Easing.in(Easing.quad),
        },
        finished => {
          // 애니메이션이 정상적으로 완료된 경우에만 모달 제거
          if (finished) {
            runOnJS(handleAnimationEnd)()
          }
        },
      )
    }
  }, [isOpen, duration, height, overlayOpacity, sheetTranslateY, handleAnimationEnd])

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }))

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: sheetTranslateY.value}],
    height,
  }))

  // onPressOverlay가 undefined인 경우 불필요한 함수 생성 방지
  const handleOverlayPress = useCallback(() => {
    onPressOverlay?.()
  }, [onPressOverlay])

  return (
    <Modal visible={isOpen || isRealOpen} transparent animationType="none">
      <AnimatedPressable
        style={[styles.overlay, overlayStyle]}
        onPress={onPressOverlay ? handleOverlayPress : undefined}
      />
      <Animated.View style={[styles.sheet, sheetStyle]}>{children}</Animated.View>
    </Modal>
  )
}

// React.memo로 불필요한 리렌더링 방지
export const BottomSheet = memo(BottomSheetComponent)

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
})
