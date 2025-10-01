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
  duration = 350,
  height,
  onPressOverlay,
}: PropsWithChildren<BottomSheetProps>) => {
  const [isRealOpen, setIsRealOpen] = useState(false)

  const animation = useRef(new Animated.Value(0)).current
  const sheetAnimation = useRef(new Animated.Value(height)).current

  useEffect(() => {
    if (isOpen) {
      setIsRealOpen(true)

      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(sheetAnimation, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(sheetAnimation, {
          toValue: height,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsRealOpen(false)
      })
    }
  }, [isOpen])

  return (
    <Modal visible={isOpen ? isOpen : isRealOpen} transparent={true} animationType="none">
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
