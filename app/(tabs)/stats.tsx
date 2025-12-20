import {Image, Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import React, {useMemo, useState} from 'react'
import {logEvent} from '@/analytics/func'
import {EVENTS} from '@/analytics/event'
import {ROUTES, useAppRouter} from '@/shared'
import {SafeAreaView} from 'react-native-safe-area-context'
import Header from '@/components/common/Header'
import WheelPicker2 from '@/components/WheelPicker2'
import {BottomSheet} from '@/shared/ui/BottomSheet'
import {LinearBorderBox} from '@/shared/ui'

const MatchScreen = () => {
  const router = useAppRouter()

  const [open, setOpen] = useState(false)

  const [selectedYear, setSelectedYear] = useState(2025)
  const [selectedMonth, setSelectedMonth] = useState(1)
  const yearList = useMemo(() => Array.from({length: 10}, (_, i) => `${2020 + i}년`), [])

  return (
    <>
      <SafeAreaView style={[styles.container, {flex: 1}]}>
        <Header
          leftButton={{
            content: (
              <Pressable onPress={() => setOpen(true)} style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Text style={{fontSize: 20, fontWeight: 700, color: '#161617'}}>2025 시즌</Text>
                <Image source={require('@/assets/icons/arrow_down.png')} style={{width: 18, height: 18}} />
              </Pressable>
            ),
          }}
        />
        <View style={{paddingHorizontal: 24, paddingTop: 12, gap: 12}}>
          {/* <LinearBorderBox borderWidth={1.5} borderRadius={10} backgroundColor="#FFFFFF">
            <View style={{flexDirection: 'row', overflow: 'hidden'}}>
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  alignItems: 'center',
                  borderWidth: 0.7,
                  borderColor: '#C7C9D0',
                  borderStyle: 'dashed',
                  marginLeft: -1,
                  marginTop: -1,
                  marginBottom: -2,
                }}>
                <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>나의 승요력</Text>
                <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>100%</Text>
              </View>
              <View style={{paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <View style={{paddingVertical: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>경기</Text>
                  <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>21</Text>
                </View>
                <View style={{paddingVertical: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>승</Text>
                  <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>2</Text>
                </View>
                <View style={{paddingVertical: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>패</Text>
                  <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>19</Text>
                </View>
                <View style={{paddingVertical: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: 400, color: '#161617', lineHeight: 16 * 1.4}}>무</Text>
                  <Text style={{fontSize: 24, fontWeight: 700, color: '#161617'}}>0</Text>
                </View>
              </View>
            </View>
          </LinearBorderBox> */}
          <Pressable
            style={styles.button}
            onPress={() => {
              logEvent(EVENTS.WIN_PREDICTION_CLICK, {screen_name: ROUTES.TICKET_MY_STAT})
              router.push(ROUTES.TICKET_MY_STAT)
            }}>
            <Text style={styles.buttonText}>나의 승요력 보러가기</Text>
          </Pressable>
        </View>
        <BottomSheet isOpen={open} duration={350} height={240} onPressOverlay={() => setOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>원하시는 날짜를 선택해주세요</Text>
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
                items={Array.from({length: 12}, (_, i) => `${i + 1}월`)}
                itemHeight={50}
                initialItem={`${selectedMonth}월`}
                onItemChange={item => {
                  setSelectedMonth(Number(item.replaceAll(/\D/g, '')))
                }}
                containerStyle={{width: '49%'}}
              />
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#081B46',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
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
