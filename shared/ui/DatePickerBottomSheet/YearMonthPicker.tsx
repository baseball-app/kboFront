import React, {useMemo} from 'react';
import {DatePickerBottomSheet} from './DatePickerBottomSheet';
import type {YearMonthPickerProps, WheelPickerColumn} from './types';

const YearMonthPicker = ({
  isOpen,
  initialYear,
  initialMonth,
  yearRange,
  onConfirm,
  onCancel,
  title = '원하시는 날짜를 선택해주세요',
}: YearMonthPickerProps) => {
  const columns: WheelPickerColumn[] = useMemo(() => {
    const yearList = Array.from({length: yearRange.end - yearRange.start + 1}, (_, i) => `${yearRange.start + i}년`);
    const monthList = Array.from({length: 12}, (_, i) => `${i + 1}월`);

    return [
      {key: 'year', items: yearList, initialValue: `${initialYear}년`, width: '49%'},
      {key: 'month', items: monthList, initialValue: `${initialMonth}월`, width: '49%'},
    ];
  }, [yearRange, initialYear, initialMonth]);

  const handleConfirm = (values: Record<string, string>) => {
    const year = parseInt(values.year.replace(/\D/g, ''), 10);
    const month = parseInt(values.month.replace(/\D/g, ''), 10);
    onConfirm(year, month);
  };

  return (
    <DatePickerBottomSheet
      isOpen={isOpen}
      title={title}
      columns={columns}
      onConfirm={handleConfirm}
      onCancel={onCancel}
    />
  );
};

export {YearMonthPicker};
