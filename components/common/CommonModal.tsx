import {IModalConfig, useCommonSlice} from '@/slice/commonSlice'
import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Modal} from '@/components/common/Modal'
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
          <Text style={styles.headerTitle}>{modalState?.header}</Text>
          <View>
            <Text style={styles.headerContentText}>{modalState?.content}</Text>
          </View>
          <View style={styles.buttonBox}>
            {modalState?.button.map((btn, index) => (
              <TouchableOpacity key={index} onPress={btn.onPress} style={[btn.buttonStyle, styles.modalButton]}>
                <Text style={[styles.modalButtonText, btn.buttonTextStyle]}>{btn.text}</Text>
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
    maxWidth: 330,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 16.71,
  },
  headerContentText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
    color: '#353430',
  },
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 13,
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
