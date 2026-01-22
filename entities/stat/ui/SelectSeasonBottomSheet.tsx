import {SeasonPicker} from '@/shared/ui';
import React from 'react';

const SelectSeasonBottomSheet = ({
  isOpen,
  value,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  value: number;
  onConfirm: (year: number, season: string) => void;
  onCancel: () => void;
}) => {
  return (
    <SeasonPicker
      isOpen={isOpen}
      initialYear={value}
      initialSeason="시즌"
      yearRange={{start: 2025, end: 2026}}
      seasonList={['시즌']}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export {SelectSeasonBottomSheet};
