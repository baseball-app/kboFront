import {color_token} from '@/constants/theme';
import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, View, ViewStyle} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const WheelPicker2 = ({
  itemHeight,
  containerStyle,
  initialItem,
  onItemChange,
  items,
}: {
  itemHeight: number;
  containerStyle: ViewStyle;
  initialItem: string;
  onItemChange: (item: string) => void;
  items: string[];
}) => {
  const _items = useMemo(() => ['', ...items, ''], [items]);
  const [innerValue, setInnerValue] = useState(initialItem);

  const flatListRef = useRef<FlatList>(null);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
  );

  const keyExtractor = useCallback((_: string, index: number) => index.toString(), []);

  const debounceRef = useRef<any | null>(null);
  // const isDraggingRef = useRef(false)
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const index = Math.round(offsetY / itemHeight);
      onItemChange(_items[index + 1]);
      setInnerValue(_items[index + 1]);
    }, 60);
  }, []);

  return (
    <View style={[{height: itemHeight * 3}, containerStyle]}>
      <Animated.FlatList
        data={_items}
        ref={flatListRef}
        renderItem={({item}) => <WheelItem isSelected={innerValue === item} item={item} itemHeight={itemHeight} />}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        scrollEventThrottle={16}
        decelerationRate="fast"
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        onLayout={() => {
          const initialIndex = _items.indexOf(initialItem) - 1;
          if (initialIndex >= 0 && flatListRef.current) {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                index: initialIndex,
                animated: false,
              });
            }, 100);
          }
        }}
        initialScrollIndex={Platform.select({ios: _items.indexOf(initialItem) - 1})}
      />
    </View>
  );
};

const WheelItem = ({item, itemHeight, isSelected}: {item: string; itemHeight: number; isSelected: boolean}) => {
  const scale = useSharedValue(isSelected ? 1 : 0.8);
  const colorAnim = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    if (isSelected) {
      scale.value = withSpring(1);
      colorAnim.value = withTiming(1, {duration: 60});
    } else {
      scale.value = withSpring(0.8);
      colorAnim.value = withTiming(0, {duration: 60});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{scale: scale.value}],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: 24,
    lineHeight: 24 * 1.4,
    fontWeight: '700',
    color: interpolateColor(colorAnim.value, [0, 1], [color_token.gray300, color_token.black]),
  }));

  if (!item) return <View style={{height: itemHeight}} />;

  return (
    <Animated.View style={[animatedStyle, {height: itemHeight}]}>
      <Animated.Text style={animatedTextStyle}>{item}</Animated.Text>
    </Animated.View>
  );
};

export default WheelPicker2;
