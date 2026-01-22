import WheelPicker2 from '@/components/WheelPicker2';
import { BottomSheet, Txt } from '@/shared/ui';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/shared/ui';
import { size } from '@/shared';

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
  const [selectedYear, setSelectedYear] = useState(value);
  const yearList = useMemo(() => Array.from({length: 2}, (_, i) => `${2025 + i}년`), []);

  const [selectedSeason, setSelectedSeason] = useState('시즌');
  const seasonList = useMemo(() => ['시즌'], []);

  const initValue = useCallback(() => {
    setTimeout(() => {
      setSelectedYear(value);
      setSelectedSeason('시즌');
    }, 300);
  }, [value]);

  return (
    <BottomSheet isOpen={isOpen} duration={350} height={(320)}>
      <View style={styles.modalContent}>
        <Txt weight="bold">원하시는 시즌을 선택해주세요</Txt>
        <View style={styles.datePickerContainer}>
          <WheelPicker2
            itemHeight={50}
            initialItem={`${selectedYear}년`}
            onItemChange={item => {
              setSelectedYear(Number(item.replaceAll(/\D/g, '')));
            }}
            items={yearList}
            containerStyle={{width: '49%'}}
          />
          <WheelPicker2
            items={seasonList}
            itemHeight={50}
            initialItem={selectedSeason}
            onItemChange={item => {
              setSelectedSeason(item);
            }}
            containerStyle={{width: '49%'}}
          />
        </View>
        <View style={styles.buttonBox}>
          <Button
            style={{flex: 1, paddingVertical: size(12), height: size(46)}}
            type="cancel"
            onPress={() => onCancel()}>
            취소
          </Button>
          <Button
            style={{flex: 1, paddingVertical: size(12), height: size(46)}}
            type="primary"
            onPress={() => onConfirm(selectedYear, selectedSeason)}>
            완료
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    padding: size(24),
    backgroundColor: 'white',
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    borderBottomLeftRadius: size(0),
    borderBottomRightRadius: size(0),
  },
  datePickerContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    paddingTop: size(20),
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: size(13),
    marginTop: size(30),
    marginBottom: size(16),
  },
});

export {SelectSeasonBottomSheet};
