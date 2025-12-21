import WheelPicker2 from '@/components/WheelPicker2'
import {BottomSheet} from '@/shared/ui'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Pressable} from '@/shared/ui/Pressable'

const SelectSeasonBottomSheet = ({
  isOpen,
  value,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean
  value: number
  onConfirm: (year: number, season: string) => void
  onCancel: () => void
}) => {
  const [selectedYear, setSelectedYear] = useState(value)
  const yearList = useMemo(() => Array.from({length: 2}, (_, i) => `${2025 + i}년`), [])

  const [selectedSeason, setSelectedSeason] = useState('시즌')
  const seasonList = useMemo(() => ['시즌'], [])

  const initValue = useCallback(() => {
    setTimeout(() => {
      setSelectedYear(value)
      setSelectedSeason('시즌')
    }, 300)
  }, [value])

  return (
    <BottomSheet isOpen={isOpen} duration={350} height={320}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>원하시는 시즌을 선택해주세요</Text>
        <View style={styles.datePickerContainer}>
          <WheelPicker2
            itemHeight={50}
            initialItem={`${selectedYear}년`}
            onItemChange={item => {
              setSelectedYear(Number(item.replaceAll(/\D/g, '')))
            }}
            items={yearList}
            containerStyle={{width: '49%'}}
          />
          <WheelPicker2
            items={seasonList}
            itemHeight={50}
            initialItem={selectedSeason}
            onItemChange={item => {
              setSelectedSeason(item)
            }}
            containerStyle={{width: '49%'}}
          />
        </View>
        <View style={styles.buttonBox}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              onCancel()
              initValue()
            }}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable style={styles.confirmButton} onPress={() => onConfirm(selectedYear, selectedSeason)}>
            <Text style={styles.confirmText}>완료</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    padding: 24,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 13,
    marginTop: 30,
    marginBottom: 16,
  },
  confirmButton: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1E5EF4',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
    color: '#fff',
  },
  cancelButton: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#D0CEC7',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
    color: '#000',
  },
})

export {SelectSeasonBottomSheet}
