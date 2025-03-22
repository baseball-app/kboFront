import React, {useEffect, useRef, useState} from 'react'
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface Props {
  items: string[]
  onItemChange?: (item: string) => void
  itemHeight: number
  initValue?: string
  containerStyle?: ViewStyle
}

const WheelPicker: React.FC<Props> = ({items, onItemChange, itemHeight, initValue, containerStyle}) => {
  const initValueIndex = initValue ? items.indexOf(initValue) : -1
  const scrollY = useRef(new Animated.Value(initValueIndex >= 0 ? initValueIndex * itemHeight : 0)).current
  const [selectedIndex, setSelectedIndex] = useState(initValueIndex >= 0 ? initValueIndex : 0)
  const [isTrigger, setIsTrigger] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsTrigger(true)
    }, 200)
  }, [isTrigger])

  const [modifiedItems, setModifiedItems] = useState(items)

  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    const list = ['', ...items, '']
    setModifiedItems(list)
    flatListRef.current?.scrollToIndex({index: initValueIndex >= 0 ? initValueIndex : 1})
  }, [items])

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    const inputRange = [(index - 2) * itemHeight, (index - 1) * itemHeight, index * itemHeight]
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, Platform.OS === 'ios' || isTrigger ? 1 : 0.8, 0.8],
      extrapolate: 'clamp',
    })

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, Platform.OS === 'ios' || isTrigger ? 1 : 0.8, 0.8],
      extrapolate: 'clamp',
    })

    const color = scrollY.interpolate({
      inputRange,
      outputRange: ['#95938B', Platform.OS === 'ios' || isTrigger ? '#171716' : '#95938B', '#95938B'],
      extrapolate: 'clamp',
    })

    return (
      <TouchableOpacity activeOpacity={0.95}>
        <Animated.View
          style={{
            height: itemHeight,
            transform: [{scale}],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.Text style={{fontSize: 24, lineHeight: 24 * 1.4, color, fontWeight: '700', opacity}}>
            {item}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / itemHeight)
    console.log('here', index)

    if (index !== selectedIndex) {
      setSelectedIndex(index)
    }
  }

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      onItemChange?.(items[selectedIndex])
    }
  }, [selectedIndex])

  return (
    <View style={[{height: itemHeight * 3}, containerStyle]}>
      <Animated.FlatList
        data={modifiedItems}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
        })}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        initialScrollIndex={initValueIndex >= 0 ? initValueIndex : 1}
      />
    </View>
  )
}

export default React.memo(WheelPicker)
