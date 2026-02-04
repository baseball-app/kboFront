import React, {useEffect, useRef, useState} from 'react';
import {Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Pressable} from './Pressable';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {Txt} from './Txt';
import {color_token} from '@/constants/theme';

type Props = {
  list?: {label: string; value: string}[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};
const SelectBox = ({
  list = [
    {
      label: '선택해주세요',
      value: '선택해주세요',
    },
  ],
  value,
  onChange,
  placeholder = '선택해주세요',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [layout, setLayout] = useState({x: 0, y: 0, width: 0, height: 0});
  const ref = useRef<View>(null);

  const rotation = useSharedValue(0);
  const listTranslateY = useSharedValue(-20);
  const listOpacity = useSharedValue(0);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handlePress = () => {
    if (!isOpen) {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        setLayout({x: pageX, y: pageY, width, height});
        setIsOpen(true);
        setIsVisible(true);
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  const isActive = (selectedValue: string) => selectedValue === value;

  const selectedLabel = list.find(item => item.value === value)?.label || placeholder;

  useEffect(() => {
    rotation.value = withTiming(isOpen ? 180 : 360, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
  }, [isOpen, rotation]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    if (isOpen && isVisible) {
      // 열릴 때 애니메이션
      listTranslateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      listOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    } else if (!isOpen && isVisible) {
      // 닫힐 때 애니메이션
      listTranslateY.value = withTiming(-20, {
        duration: 200,
        easing: Easing.in(Easing.quad),
      });
      listOpacity.value = withTiming(
        0,
        {
          duration: 200,
          easing: Easing.in(Easing.quad),
        },
        finished => {
          if (finished) {
            scheduleOnRN(handleClose);
          }
        },
      );
    }
  }, [isOpen, isVisible, listTranslateY, listOpacity]);

  const listStyle = useAnimatedStyle(() => ({
    transform: [{translateY: listTranslateY.value}],
    opacity: listOpacity.value,
  }));

  return (
    <>
      <Pressable ref={ref} style={styles.container} onPress={handlePress}>
        <Txt size={15} weight="medium" color={color_token.gray800}>
          {selectedLabel}
        </Txt>
        <Animated.Image source={require('@/assets/icons/arrow_down.png')} style={[styles.arrow, animatedStyles]} />
      </Pressable>

      <Modal transparent visible={isVisible} animationType="none" onRequestClose={() => setIsOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.list,
                {
                  top: layout.y + layout.height + (Platform.OS === 'ios' ? +4 : -20),
                  left: layout.x,
                  minWidth: Math.max(layout.width, 140),
                },
                listStyle,
              ]}>
              {list.map((item, index) => {
                const isLast = index === list.length - 1;
                const isFirst = index === 0;

                return (
                  <Pressable
                    style={({pressed}) => [
                      styles.listItemLabel,
                      isFirst && {borderTopLeftRadius: 16, borderTopRightRadius: 16},
                      isLast && {borderBottomLeftRadius: 16, borderBottomRightRadius: 16},
                      pressed && styles.listItemLabelPressed,
                      isActive(item.value) && styles.listItemLabelActive,
                    ]}
                    key={item.value}
                    onPress={() => handleSelect(item.value)}>
                    <Text style={styles.listItemLabelText}>{item.label}</Text>
                  </Pressable>
                );
              })}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    borderColor: '#353430',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    position: 'relative',
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 15 * 1.4,
    color: '#353430',
  },
  arrow: {
    width: 18,
    height: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  list: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 16,
    zIndex: 1000,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  listItemLabel: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    // borderRadius: 16,
  },
  listItemLabelActive: {
    backgroundColor: '#1E5EF41A',
  },
  listItemLabelPressed: {
    backgroundColor: '#1E5EF40A',
  },
  listItemLabelText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16 * 1.4,
  },
});

export {SelectBox};
