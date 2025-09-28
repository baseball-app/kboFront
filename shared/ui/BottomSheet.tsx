import React, {PropsWithChildren, useEffect, useRef, useState} from 'react'
import {StyleSheet, Animated, Pressable} from 'react-native'
import {Modal} from '@/components/common/Modal'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type BottomSheetProps = {
  isOpen: boolean
  duration?: number
  height: number
  onPressOverlay?: () => void
}

const BottomSheet = ({
  isOpen,
  children,
  duration = 250,
  height,
  onPressOverlay,
}: PropsWithChildren<BottomSheetProps>) => {
  const [isRealOpen, setIsRealOpen] = useState(isOpen)

  const animation = useRef(new Animated.Value(0)).current

  const sheetAnimation = useRef(new Animated.Value(-1 * height)).current

  useEffect(() => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      Animated.timing(sheetAnimation, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(sheetAnimation, {
        toValue: height,
        duration: duration,
        useNativeDriver: true,
      }).start()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsRealOpen(true)
    } else {
      setTimeout(() => {
        setIsRealOpen(false)
      }, duration)
    }
  }, [isOpen])

  return (
    <Modal visible={isRealOpen} transparent={true} animationType="none">
      <AnimatedPressable
        style={{flex: 1, position: 'absolute', inset: 0, opacity: animation, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onPress={() => {
          onPressOverlay?.()
        }}
      />
      <Animated.View style={[styles.modalContainer, {transform: [{translateY: sheetAnimation}]}]}>
        {children}
      </Animated.View>
    </Modal>
  )
}

export {BottomSheet}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
})
