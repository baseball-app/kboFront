import React, {useMemo} from 'react';
import {DatePickerBottomSheet} from './DatePickerBottomSheet';
import type {SeasonPickerProps, WheelPickerColumn} from './types';

const SeasonPicker = ({
  isOpen,
  initialYear,
  initialSeason,
  yearRange,
  seasonList,
  onConfirm,
  onCancel,
  title = '원하시는 시즌을 선택해주세요',
}: SeasonPickerProps) => {
  const columns: WheelPickerColumn[] = useMemo(() => {
    const yearList = Array.from({length: yearRange.end - yearRange.start + 1}, (_, i) => `${yearRange.start + i}년`);

    return [
      {key: 'year', items: yearList, initialValue: `${initialYear}년`, width: '49%'},
      {key: 'season', items: seasonList, initialValue: initialSeason, width: '49%'},
    ];
  }, [yearRange, initialYear, initialSeason, seasonList]);

  const handleConfirm = (values: Record<string, string>) => {
    const year = parseInt(values.year.replace(/\D/g, ''), 10);
    onConfirm(year, values.season);
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

export {SeasonPicker};
