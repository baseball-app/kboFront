import {IModalConfig, useCommonSlice} from '@/slice/commonSlice'
import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Modal} from '@/components/common/Modal'
import {Txt} from '@/shared/ui'
import {color_token} from '@/constants/theme'
import {size} from '@/shared'
const CommonModal = () => {
  const {currentModal, modal} = useCommonSlice()
  const [modalState, setModalState] = useState<IModalConfig | null>(null)
  useEffect(() => {
    if (currentModal) {
      setModalState(currentModal)
    } else {
      setTimeout(() => {
        setModalState(null)
      }, 1000)
    }
  }, [currentModal])

  return (
    <Modal //
      transparent
      visible={Boolean(currentModal)}
      animationType="fade"
      onRequestClose={modal.hide}
      onDismiss={modal.hide}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Txt size={15} weight="semibold" color={color_token.gray900}>
            {modalState?.header}
          </Txt>
          <View>
            <Txt size={14} color={color_token.gray800}>
              {modalState?.content}
            </Txt>
          </View>
          <View style={styles.buttonBox}>
            {modalState?.button.map((btn, index) => (
              <TouchableOpacity key={index} onPress={btn.onPress} style={[btn.buttonStyle, styles.modalButton]}>
                <Txt size={14} weight="semibold" color={color_token.white} style={btn.buttonTextStyle}>
                  {btn.text}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    maxWidth: size(330),
    backgroundColor: 'white',
    borderRadius: size(20),
    padding: size(20),
    flexDirection: 'column',
    alignItems: 'center',
    gap: size(24),
  },
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: size(12),
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 11,
    paddingBottom: 13,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.6,
  },
})

export default CommonModal
