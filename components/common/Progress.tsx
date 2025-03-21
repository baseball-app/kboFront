import React, {useEffect, useRef} from 'react'
import {View, StyleSheet, Animated, ViewStyle} from 'react-native'

interface ProgressProps {
  current: number
  max: number
  duration?: number
  containerStyle?: ViewStyle
  progressStyle?: ViewStyle
}

const Progress = ({current, max, duration = 300, containerStyle, progressStyle}: ProgressProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: current / max,
      duration: duration,
      useNativeDriver: false,
    }).start()
  }, [current, max, duration])

  return (
    <View style={[styles.progressBarContainer, containerStyle]}>
      <Animated.View
        style={[
          styles.progressBar,
          progressStyle,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  )
}

export default Progress

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E4E2DC',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1E5EF4',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
})
