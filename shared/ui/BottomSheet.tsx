import React, {PropsWithChildren, useEffect, useState} from 'react'
import {StyleSheet, Pressable} from 'react-native'
import {Modal} from '@/components/common/Modal'
import Animated, {useSharedValue, withTiming, useAnimatedStyle, Easing, runOnJS} from 'react-native-reanimated'

type BottomSheetProps = {
  isOpen: boolean
  duration?: number
  height: number
  onPressOverlay?: () => void
}

const BottomSheet = ({
  isOpen,
  children,
  duration = 350,
  height,
  onPressOverlay,
}: PropsWithChildren<BottomSheetProps>) => {
  const [isRealOpen, setIsRealOpen] = useState(false)

  const overlayOpacity = useSharedValue(0)
  const sheetTranslateY = useSharedValue(height)

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
        () => {
          // 애니메이션이 끝난 뒤 모달 제거
          runOnJS(setIsRealOpen)(false)
        },
      )
    }
  }, [isOpen])

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }))

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: sheetTranslateY.value}],
  }))

  return (
    <Modal visible={isOpen || isRealOpen} transparent animationType="none">
      <AnimatedPressable style={[styles.overlay, overlayStyle]} onPress={onPressOverlay} />
      <Animated.View style={[styles.sheet, sheetStyle]}>{children}</Animated.View>
    </Modal>
  )
}

export {BottomSheet}

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
