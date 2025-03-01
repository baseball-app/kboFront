import React, {useRef} from 'react'
import {Pressable, PanResponder, PressableProps} from 'react-native'

interface SwipeablePressableProps extends PressableProps {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  swipeThreshold?: number
  onPress?: () => void
}

export default function SwipeablePressable({
  children,
  onPress,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 50,
  ...props
}: SwipeablePressableProps) {
  const touchStartTime = useRef(0)
  const isSwiping = useRef(false)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      touchStartTime.current = Date.now()
      isSwiping.current = false
    },
    onPanResponderMove: (_, gestureState) => {
      console.log('hi')

      if (Math.abs(gestureState.dx) > 10) {
        isSwiping.current = true
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const touchDuration = Date.now() - touchStartTime.current
      console.log('hi')
      if (!isSwiping.current && touchDuration < 200) {
        onPress?.()
        return
      }

      if (Math.abs(gestureState.dx) > swipeThreshold) {
        if (gestureState.dx > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      }
    },
  })

  return (
    <Pressable {...props} {...panResponder.panHandlers}>
      {children}
    </Pressable>
  )
}
