import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomSheet} from '@/shared/ui';
import {size} from '@/shared';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const tabMenuConfig = [
  {
    id: 0,
    value: 'live',
    title: '직관',
  },
  {
    id: 1,
    value: 'home',
    title: '집관',
  },
];

const LocationTypeSelector = ({value, onChange}: Props) => {
  const [tabMenuModalVisible, setTabMenuModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <>
      <View style={styles.selectBox}>
        <TouchableOpacity
          style={styles.selectModalButton}
          activeOpacity={1}
          onPress={() => setTabMenuModalVisible(true)}>
          <Txt size={16} weight="bold" color={color_token.gray900}>
            {value}
          </Txt>
          <Image source={require('@/assets/icons/bottomArrow.png')} resizeMode="contain" style={styles.dropDownImg} />
        </TouchableOpacity>
      </View>
      <BottomSheet isOpen={tabMenuModalVisible} duration={250} height={285}>
        <View style={styles.writePlaceModalContent}>
          <Txt size={18} weight="bold">
            기록하고 싶은 장소를 선택해주세요
          </Txt>
          <View style={styles.writePlaceOptionsContainer}>
            {tabMenuConfig.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[styles.writePlaceOptionButton, tempValue === option.title && styles.selectedOption]}
                activeOpacity={1}
                onPress={() => setTempValue(option.title)}>
                <Txt
                  size={16}
                  weight={tempValue === option.title ? 'bold' : 'regular'}
                  color={tempValue === option.title ? color_token.primary : color_token.gray800}>
                  {option.title}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.writeButtonBox}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setTabMenuModalVisible(false)}>
              <Txt size={16} weight="semibold" color={color_token.gray900}>
                취소
              </Txt>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onChange(tempValue);
                setTabMenuModalVisible(false);
              }}>
              <Txt size={16} weight="semibold" color={color_token.white}>
                완료
              </Txt>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default LocationTypeSelector;

const styles = StyleSheet.create({
  selectedOption: {
    borderColor: color_token.primary,
    backgroundColor: color_token.primary_10,
    flexDirection: 'row',
  },
  writePlaceOptionButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: color_token.gray350,
    borderRadius: size(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: size(13),
    gap: size(8),
  },
  confirmButton: {
    flex: 1,
    backgroundColor: color_token.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: size(12),
    borderRadius: size(10),
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: color_token.gray350,
    paddingVertical: size(12),
    borderRadius: size(10),
  },
  writeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: size(13),
    marginTop: size(40),
  },
  writePlaceModalContent: {
    width: '100%',
    backgroundColor: color_token.white,
    height: 285,
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    padding: size(24),
  },
  writePlaceOptionsContainer: {
    marginTop: size(24),
    flexDirection: 'column',
    gap: size(16),
  },
  selectBox: {
    height: '100%',
    paddingHorizontal: size(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 54,
    height: '100%',
    gap: size(8),
  },
  dropDownImg: {
    marginBottom: 2,
    width: 18,
    height: 18,
  },
});

export const modal = StyleSheet.create({
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  body: {
    width: '100%',
    maxWidth: 324,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
});
