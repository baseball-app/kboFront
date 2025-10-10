import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {BottomSheet} from '@/shared/ui'

type Props = {
  value: string
  onChange: (value: string) => void
}

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
]

const LocationTypeSelector = ({value, onChange}: Props) => {
  const [tabMenuModalVisible, setTabMenuModalVisible] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  useEffect(() => {
    setTempValue(value)
  }, [value])

  return (
    <>
      <View style={styles.selectBox}>
        <TouchableOpacity
          style={styles.selectModalButton}
          activeOpacity={1}
          onPress={() => setTabMenuModalVisible(true)}>
          <Text style={styles.selectBoxText}>{value}</Text>
          <Image source={require('@/assets/icons/bottomArrow.png')} resizeMode="contain" style={styles.dropDownImg} />
        </TouchableOpacity>
      </View>
      <BottomSheet isOpen={tabMenuModalVisible} duration={250} height={285}>
        <View style={styles.writePlaceModalContent}>
          <Text style={styles.modalTitle}>기록하고 싶은 장소를 선택해주세요</Text>
          <View style={styles.writePlaceOptionsContainer}>
            {tabMenuConfig.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[styles.writePlaceOptionButton, tempValue === option.title && styles.selectedOption]}
                activeOpacity={1}
                onPress={() => setTempValue(option.title)}>
                <Text style={[styles.optionText, tempValue === option.title && styles.selectedWriteOptionText]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.writeButtonBox}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setTabMenuModalVisible(false)}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onChange(tempValue)
                setTabMenuModalVisible(false)
              }}>
              <Text style={styles.confirmText}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  )
}

export default LocationTypeSelector

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedWriteOptionText: {
    color: '#1E5EF4',
    fontWeight: '700',
  },
  selectedOption: {
    borderColor: '#1E5EF4',
    backgroundColor: '#1E5EF41A',
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  writePlaceOptionButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D0CEC7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 13,
    gap: 8,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#1E5EF4',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D0CEC7',
    paddingVertical: 12,
    borderRadius: 10,
  },
  cancelText: {
    color: '#171716',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
  },
  writeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 13,
    marginTop: 40,
  },
  writePlaceModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    height: 285,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  writePlaceOptionsContainer: {
    marginTop: 24,
    flexDirection: 'column',
    gap: 16,
  },
  selectBox: {
    height: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBoxText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.09,
    color: '#171716',
  },
  selectModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 54,
    height: '100%',
    gap: 8,
  },
  dropDownImg: {
    marginBottom: 2,
    width: 18,
    height: 18,
  },
})

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
})
