import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {BottomSheet} from '../BottomSheet';
import {Button} from '../Button';
import {Txt} from '../Txt';
import WheelPicker2 from '@/components/WheelPicker2';
import {color_token} from '@/constants/theme';
import type {DatePickerBottomSheetProps, SelectedValues} from './types';
import {styles} from './styles';

const DEFAULT_HEIGHT = 320;
const DEFAULT_DURATION = 350;

const DatePickerBottomSheet = ({
  isOpen,
  title,
  columns,
  onConfirm,
  onCancel,
  height = DEFAULT_HEIGHT,
  duration = DEFAULT_DURATION,
  confirmText = '완료',
  cancelText = '취소',
  containerStyle,
}: DatePickerBottomSheetProps) => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>(() =>
    columns.reduce((acc, col) => ({...acc, [col.key]: col.initialValue}), {}),
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedValues(columns.reduce((acc, col) => ({...acc, [col.key]: col.initialValue}), {}));
    }
  }, [isOpen, columns]);

  const handleValueChange = useCallback((key: string, value: string) => {
    setSelectedValues(prev => ({...prev, [key]: value}));
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(selectedValues);
  }, [onConfirm, selectedValues]);

  return (
    <BottomSheet isOpen={isOpen} duration={duration} height={height}>
      <View style={styles.modalContent}>
        <Txt size={16} weight="bold" color={color_token.gray900} style={styles.modalTitle}>
          {title}
        </Txt>
        <View style={[styles.datePickerContainer, containerStyle]}>
          {columns.map(column => (
            <WheelPicker2
              key={column.key}
              items={column.items}
              itemHeight={50}
              initialItem={column.initialValue}
              onItemChange={value => handleValueChange(column.key, value)}
              containerStyle={{width: column.width}}
            />
          ))}
        </View>
        <View style={styles.buttonBox}>
          <Button type="cancel" style={styles.button} onPress={onCancel}>
            {cancelText}
          </Button>
          <Button type="primary" style={styles.button} onPress={handleConfirm}>
            {confirmText}
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};

export {DatePickerBottomSheet};
