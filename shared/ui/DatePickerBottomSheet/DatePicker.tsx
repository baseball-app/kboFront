import React, {useMemo, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {DatePickerBottomSheet} from './DatePickerBottomSheet';
import type {DatePickerProps, WheelPickerColumn} from './types';

const DatePicker = ({
  isOpen,
  initialDate,
  yearRange,
  onConfirm,
  onCancel,
  title = '원하시는 날짜를 선택해주세요',
}: DatePickerProps) => {
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth() + 1);

  useEffect(() => {
    if (isOpen) {
      setSelectedYear(initialDate.getFullYear());
      setSelectedMonth(initialDate.getMonth() + 1);
    }
  }, [isOpen, initialDate]);

  const daysInMonth = useMemo(() => dayjs(`${selectedYear}-${selectedMonth}-01`).daysInMonth(), [selectedYear, selectedMonth]);

  const columns: WheelPickerColumn[] = useMemo(() => {
    const yearList = Array.from({length: yearRange.end - yearRange.start + 1}, (_, i) => `${yearRange.start + i}년`);
    const monthList = Array.from({length: 12}, (_, i) => `${i + 1}월`);
    const dayList = Array.from({length: daysInMonth}, (_, i) => `${i + 1}일`);

    return [
      {key: 'year', items: yearList, initialValue: `${initialDate.getFullYear()}년`, width: '30%'},
      {key: 'month', items: monthList, initialValue: `${initialDate.getMonth() + 1}월`, width: '30%'},
      {key: 'day', items: dayList, initialValue: `${initialDate.getDate()}일`, width: '30%'},
    ];
  }, [yearRange, initialDate, daysInMonth]);

  const handleConfirm = (values: Record<string, string>) => {
    const year = parseInt(values.year.replace(/\D/g, ''), 10);
    const month = parseInt(values.month.replace(/\D/g, ''), 10);
    const day = parseInt(values.day.replace(/\D/g, ''), 10);
    onConfirm(dayjs(`${year}-${month}-${day}`).toDate());
  };

  return (
    <DatePickerBottomSheet
      isOpen={isOpen}
      title={title}
      columns={columns}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      containerStyle={{justifyContent: 'space-between'}}
    />
  );
};

export {DatePicker};
