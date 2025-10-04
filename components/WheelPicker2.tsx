import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
} from 'react-native'

const WheelPicker2 = ({
  itemHeight,
  containerStyle,
  initialItem,
  onItemChange,
  items,
}: {
  itemHeight: number
  containerStyle: ViewStyle
  initialItem: string
  onItemChange: (item: string) => void
  items: string[]
}) => {
  const _items = useMemo(() => ['', ...items, ''], [items])
  const [innerValue, setInnerValue] = useState(initialItem)

  const flatListRef = useRef<FlatList>(null)

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
  )

  const keyExtractor = useCallback((_: string, index: number) => index.toString(), [])

  const debounceRef = useRef<any | null>(null)
  // const isDraggingRef = useRef(false)
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const index = Math.round(offsetY / itemHeight)
      onItemChange(_items[index + 1])
      setInnerValue(_items[index + 1])
    }, 60)
  }, [])

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<string>) => {
      if (!item) return <View style={{height: itemHeight}} />
      return <WheelItem innerValue={innerValue} item={item} itemHeight={itemHeight} />
    },
    [itemHeight, innerValue],
  )

  return (
    <View style={[{height: itemHeight * 3}, containerStyle]}>
      <Animated.FlatList
        data={_items}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        scrollEventThrottle={16}
        decelerationRate="fast"
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        initialScrollIndex={_items.indexOf(initialItem) - 1}
      />
    </View>
  )
}

const WheelItem = ({innerValue, item, itemHeight}: {innerValue: string; item: string; itemHeight: number}) => {
  const scale = useRef(new Animated.Value(innerValue === item ? 1 : 0.8)).current
  const colorAnim = useRef(new Animated.Value(innerValue === item ? 1 : 0)).current

  useEffect(() => {
    if (innerValue === item) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 60,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 60,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }, [innerValue, item])

  // colorAnim 값을 이용해 색상을 부드럽게 보간합니다.
  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#95938B', '#171716'],
  })

  return (
    <TouchableOpacity activeOpacity={0.95} style={{height: itemHeight}}>
      <Animated.View
        style={{
          height: itemHeight,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{scale}],
        }}>
        <Animated.Text
          style={{
            fontSize: 24,
            lineHeight: 24 * 1.4,
            fontWeight: '700',
            color: animatedColor,
          }}>
          {item}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default WheelPicker2
