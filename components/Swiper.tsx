import React, {useRef, useState} from 'react'
import {StyleSheet, View, PanResponder, Animated, TouchableOpacity} from 'react-native'

const moodColors: any = {
  happy: 'green',
  sad: 'blue',
  neutral: 'orange',
  angry: 'red',
}

const Swiper = ({data}: {data: any[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const pan = useRef(new Animated.ValueXY()).current

  const MIN_LEFT = -32
  const MAX_LEFT = 0

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const currentX = (pan.x as any)?.__getValue() || 0 // 강제 위치 가져오기

        pan.x.setValue(currentX / 2 + gesture.dx)
      },
      onPanResponderRelease: () => {
        const currentX = (pan.x as any)?.__getValue() || 0 // 강제 위치 가져오기

        const isOverHalf = currentX < -16

        setCurrentIndex(isOverHalf ? 1 : 0)

        Animated.timing(pan, {
          toValue: isOverHalf ? -32 : 0, // 원하는 위치
          duration: 100, // 300ms 동안 이동
          delay: 0,
          useNativeDriver: false,
        }).start()
      },
    }),
  ).current

  return (
    <View
      style={{
        width: 28,
        overflow: 'hidden',
      }}>
      <View style={[styles.moodContainer]} />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: pan.x.interpolate({
            inputRange: [MIN_LEFT, MAX_LEFT],
            outputRange: [MIN_LEFT, MAX_LEFT],
            extrapolate: 'clamp', // 범위 밖으로 못 나가게
          }),
          flexDirection: 'row',
          gap: 4,
        }}
        {...panResponder.panHandlers}>
        <View style={[styles.moodContainer, data[0] && {backgroundColor: moodColors[data[0]]}]}>
          <TouchableOpacity onPress={() => console.log('hi')} />
        </View>
        <View style={[styles.moodContainer, data[1] && {backgroundColor: moodColors[data[1]]}]} />
      </Animated.View>
      <View style={{flexDirection: 'row', gap: 3, justifyContent: 'center'}}>
        <View style={[styles.swiperDot, currentIndex === 0 && styles.swiperDotActive]} />
        <View style={[styles.swiperDot, currentIndex === 1 && styles.swiperDotActive]} />
      </View>
    </View>
  )
}

export default Swiper

const styles = StyleSheet.create({
  moodContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 4,
  },
  swiperDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#D0CEC7',
  },
  swiperDotActive: {
    backgroundColor: '#1E5EF4',
  },
})
