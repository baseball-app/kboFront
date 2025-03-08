import React, {useState} from 'react'
import {View, Text, StyleSheet, Modal, TouchableOpacity, Image} from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress'
import {modal} from '../write/LocationTypeSelector'

type Props = {
  title: string
  value: number
  win: number
  draw: number
  lose: number
}

const StatBox = ({title, value, win, draw, lose}: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setOpenModal(true)}>
        <AnimatedCircularProgress
          size={40} //
          width={4}
          fill={value}
          tintColor="#1E5EF4"
          backgroundColor="#E4E2DC"
          lineCap="round"
          rotation={180}
          children={() => <Text style={styles.graphText}>{value}%</Text>}
        />
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}승률</Text>
          <Text style={styles.value}>{value}%</Text>
        </View>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={openModal} onRequestClose={() => setOpenModal(false)}>
        <View style={modal.overlay}>
          <View style={modal.body}>
            <View style={modalStyles.header}>
              <View style={modalStyles.icon} />
              <Text style={modalStyles.title}>나의 {title} 승률</Text>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Image style={modalStyles.icon} source={require('@/assets/icons/close.png')} />
              </TouchableOpacity>
            </View>
            <View style={modalStyles.graphContainer}>
              <AnimatedCircularProgress
                size={115}
                width={10}
                fill={value}
                tintColor="#1E5EF4"
                backgroundColor="#E4E2DC"
                lineCap="round"
                rotation={180}
                children={() => <Text style={modalStyles.graphText}>{value}%</Text>}
              />
            </View>
            <View style={modalStyles.resultCardContainer}>
              <View style={modalStyles.resultCard}>
                <Image style={modalStyles.resultCardIcon} source={require('@/assets/icons/emo/win.png')} />
                <Text style={modalStyles.resultCardText}>승리</Text>
                <Text style={modalStyles.resultCardValue}>{win}회</Text>
              </View>
              <View style={modalStyles.resultCard}>
                <Image style={modalStyles.resultCardIcon} source={require('@/assets/icons/emo/draw.png')} />
                <Text style={modalStyles.resultCardText}>무승부</Text>
                <Text style={modalStyles.resultCardValue}>{draw}회</Text>
              </View>
              <View style={modalStyles.resultCard}>
                <Image style={modalStyles.resultCardIcon} source={require('@/assets/icons/emo/lose.png')} />
                <Text style={modalStyles.resultCardText}>패배</Text>
                <Text style={modalStyles.resultCardValue}>{lose}회</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default StatBox

const modalStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    color: '#171716',
  },
  graphText: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 42,
    textAlign: 'center',
    width: '100%',
  },
  graphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: '#F3F2EE',
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
    flex: 1,
  },
  resultCardText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20.8,
    color: '#171716',
    marginTop: 4,
  },
  resultCardValue: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 28,
    color: '#171716',
  },
  resultCardIcon: {
    width: 36,
    height: 36,
  },
  resultCardContainer: {
    flexDirection: 'row',
    gap: 18,
    width: '100%',
  },
})

const styles = StyleSheet.create({
  container: {
    borderColor: '#D0CEC7',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  titleBox: {
    alignItems: 'flex-start',
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
  value: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 28,
  },
  graphText: {
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 16.8,
  },
})
