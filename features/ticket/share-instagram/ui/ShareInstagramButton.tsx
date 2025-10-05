import {Modal} from '@/components/common/Modal'
import {TicketDetail} from '@/entities/ticket'
import {showToast, useCaptureView, useShare} from '@/shared'
import React, {useState} from 'react'
import {TouchableOpacity, Image, StyleSheet, View, Text, Pressable, Dimensions} from 'react-native'
import FastImage from '@d11/react-native-fast-image'
import {useTeam} from '@/entities/match'
import {Svg} from 'react-native-svg'
import {Line} from 'react-native-svg'

// 반응형 스케일링 유틸 함수
const {width: SCREEN_WIDTH} = Dimensions.get('window')
const BASE_WIDTH = 375

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size
const verticalScale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor

const ShareInstagramButton = ({ticketDetail}: {ticketDetail: TicketDetail | undefined}) => {
  const {shareInstagramStories, checkCanOpenInstagram} = useShare()
  const [isOpen, setIsOpen] = useState(false)
  const {ViewShot, onCaptureView} = useCaptureView()

  const onShareInstagramStories = async () => {
    try {
      const viewShot = await onCaptureView()
      if (!viewShot) throw new Error('이미지 캡처에 실패했어요')

      const isSupportedInstagram = await checkCanOpenInstagram()

      if (!isSupportedInstagram) {
        showToast('지금은 인스타그램 공유만 지원해요')
        return
      }

      shareInstagramStories(viewShot.uri)
    } catch (error) {
      showToast('잠시 후 다시 시도해 주세요')
    }
  }

  const color = (() => {
    if (ticketDetail?.result === '승리') return '#00A67D'
    if (ticketDetail?.result === '패배') return '#F96A63'
    if (ticketDetail?.result === '무승부') return '#FF9151'
    if (ticketDetail?.result === '취소') return '#7D8494'
    return ''
  })()

  const {findTeamById} = useTeam()
  console.log(ticketDetail)

  const ticketCaption = (() => {
    const hometeam = findTeamById(ticketDetail?.hometeam_id)
    const awayteam = findTeamById(ticketDetail?.awayteam_id)

    if (ticketDetail?.result === '승리') {
      const winTeam = ticketDetail.score_our > ticketDetail.score_opponent ? hometeam : awayteam
      return `${winTeam?.short_name} 승리 WIN!`
    }
    if (ticketDetail?.result === '패배') {
      const loseTeam = ticketDetail.score_our < ticketDetail.score_opponent ? hometeam : awayteam
      return `내일은 이기자 ${loseTeam?.short_name}`
    }
    if (ticketDetail?.result === '무승부') return '오늘은 무승부, 내일은 승리로!'
    if (ticketDetail?.result === '취소') return '아쉽게도 경기 취소'
    return ''
  })()

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true)
        }}>
        <Image
          resizeMode="contain"
          style={styles.editIcon} //
          source={require('@/assets/icons/share.png')}
        />
      </TouchableOpacity>
      <Modal visible={isOpen} onRequestClose={() => setIsOpen(false)} animationType="fade" transparent={true}>
        <Pressable style={[StyleSheet.absoluteFillObject, styles.modalOverlay]} onPress={() => setIsOpen(false)} />
        <View style={styles.modalContainer}>
          <ViewShot>
            <FastImage source={{uri: ticketDetail?.image}} style={styles.image} resizeMode="cover" />
            <View style={[styles.ticketCard, {backgroundColor: color}]}>
              <View style={styles.ticketRow}>
                <_LabelWithValue
                  label={ticketDetail?.is_ballpark ? '직관장소' : '집관장소'}
                  value={ticketDetail?.gip_place || ''}
                />
                <_LabelWithValue label="관람방식" value={ticketDetail?.is_ballpark ? '직관' : '집관'} />
              </View>
              <View style={styles.ticketRow}>
                <_LabelWithValue
                  label="경기결과"
                  value={`${ticketDetail?.score_our}(${findTeamById(ticketDetail?.hometeam_id)?.short_name}) : ${
                    ticketDetail?.score_opponent
                  }(${findTeamById(ticketDetail?.awayteam_id)?.short_name})`}
                />
                <_LabelWithValue label="선발선수" value={ticketDetail?.starting_pitchers || ''} />
              </View>
              <View style={styles.divider} />
              <View style={styles.ticketRow}>
                <_LabelWithValue label="경기일정" value={`2025.09.03\n18:30`} />
              </View>
              <View>
                <Svg height="2" width="100%" style={styles.svgContainer}>
                  <Line x1="0" y1="1" x2="100%" y2="1" stroke="#fff" strokeWidth="1" strokeDasharray={[2, 2]} />
                </Svg>
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>{ticketCaption}</Text>
                </View>
              </View>
            </View>
          </ViewShot>
          <Pressable style={styles.shareButton}>
            <Text style={styles.shareButtonText}>인스타 스토리 공유하기</Text>
            <Image source={require('@/assets/icons/instagram.png')} resizeMode="contain" style={styles.instagramIcon} />
          </Pressable>
        </View>
      </Modal>
    </>
  )
}

const _LabelWithValue = ({label, value}: {label: string; value: string}) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  )
}

export {ShareInstagramButton}

const styles = StyleSheet.create({
  image: {
    width: scale(306),
    height: scale(306),
    borderRadius: scale(24),
  },
  editIcon: {
    width: scale(24),
    height: scale(24),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ticketCard: {
    paddingTop: scale(20),
    paddingBottom: scale(16),
    borderRadius: scale(24),
    display: 'flex',
    flexDirection: 'column',
    gap: scale(22),
  },
  ticketRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(28),
  },
  divider: {
    height: scale(0.5),
    marginHorizontal: scale(28),
    backgroundColor: '#fff',
    opacity: 0.6,
  },
  svgContainer: {
    width: '100%',
  },
  captionContainer: {
    display: 'flex',
    paddingTop: scale(10),
    flexDirection: 'row',
    gap: scale(6),
    justifyContent: 'center',
  },
  captionText: {
    color: '#fff',
    fontSize: scale(19),
    fontWeight: '700',
    lineHeight: scale(19 * 1.4),
  },
  shareButton: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    backgroundColor: '#2F3033',
    borderRadius: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginTop: scale(16),
  },
  shareButtonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: '700',
    lineHeight: scale(19.6),
  },
  instagramIcon: {
    width: scale(20),
    height: scale(20),
  },
  labelContainer: {
    display: 'flex',
    gap: scale(2),
    minWidth: scale(80),
  },
  labelText: {
    color: '#fff',
    fontSize: scale(13),
    fontWeight: '500',
    lineHeight: scale(13 * 1.4),
  },
  valueText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '700',
    lineHeight: scale(16 * 1.4),
  },
})
