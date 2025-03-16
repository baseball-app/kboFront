import {useCommonSlice} from '@/slice/commonSlice'
import React from 'react'
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

const CommonModal = () => {
  const {currentModal, modal} = useCommonSlice()

  if (!currentModal) return null

  return (
    <Modal transparent visible={!!currentModal} animationType="fade" onRequestClose={modal.hide}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>{currentModal.header}</Text>
          <View>
            <Text style={styles.headerContentText}>{currentModal.content}</Text>
          </View>
          <View style={styles.buttonBox}>
            {currentModal.button.map((btn, index) => (
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
    maxWidth: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16.71,
  },
  headerContentText: {
    fontSize: 15,
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
