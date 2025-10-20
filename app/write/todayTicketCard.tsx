import {useLocalSearchParams, usePathname} from 'expo-router'
import React from 'react'

import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useProfile from '@/hooks/my/useProfile'
import Header from '@/components/common/Header'
import {useAnalyticsStore} from '@/analytics/event'
import * as MediaLibrary from 'expo-media-library'
import {ROUTES, useAppRouter} from '@/shared'
import {TicketFrame} from '@/widgets/ticket/frame'
import {NoPermissionError, useCaptureView, useShare, useMediaPermission, showToast} from '@/shared'
import {TicketDeleteButton} from '@/features/ticket/delete-ticket'
import useTicketDetail from '@/hooks/match/useTicketDetail'
import {ShareInstagramButton} from '@/features/ticket/share-instagram'

export default function GameCard() {
  const router = useAppRouter()
  const {id, date, target_id, from_ticket_box} = useLocalSearchParams()

  const {openSettingModal, checkMediaPermission} = useMediaPermission()
  const {ViewShot, onCaptureView} = useCaptureView()

  const {shareInstagramStories, checkCanOpenInstagram} = useShare()

  const onSaveTicketImage = async () => {
    try {
      const viewShot = await onCaptureView()
      if (!viewShot) throw new Error('이미지 캡처에 실패했어요')
      const {isGranted} = await checkMediaPermission()
      if (!isGranted) throw new Error('저장 권한이 없어요')
      const asset = await MediaLibrary.createAssetAsync(viewShot.uri)
      showToast('이미지가 저장되었습니다')
    } catch (error) {
      if (error instanceof NoPermissionError) {
        openSettingModal()
      } else {
        showToast('잠시 후 다시 시도해 주세요')
      }
    }
  }

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

  const {
    ticketDetail,
    onChangeTicket,
    ticketIndex,
    data,
    toggleFavorite, //
    reactionList,
    toggleReaction,
  } = useTicketDetail(Number(id) || (date as string), Number(target_id))
  const hasDoubleTicket = (data?.length || 0) > 1

  // const {
  //   ticketDetail,
  //   ticketIndex,
  //   onChangeTicket,
  //   hasDoubleTicket,
  //   data: ticketDetailListPerDate,
  // } = useTicketDetail({
  //   id: Number(id), //
  //   date: date as string,
  //   target_id: Number(target_id),
  // })

  // const {reactionList} = useTicketReaction({id: Number(id)})

  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const pathname = usePathname()

  const {profile} = useProfile()

  const isMyTicket = profile?.id === ticketDetail?.writer

  const heartIcon = ticketDetail?.favorite
    ? require('@/assets/icons/heart_fill.png')
    : require('@/assets/icons/heart.png')

  const onBackButtonClick = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="오늘의 티켓"
        variants="#F3F2EE"
        leftButton={{
          onPress: onBackButtonClick,
          content: (
            <View style={{minWidth: 28}}>
              <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
            </View>
          ),
        }}
        rightButton={{
          content: isMyTicket ? <TicketDeleteButton ticketId={ticketDetail?.id || 0} /> : undefined,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        {isMyTicket && (
          <View style={styles.iconBox}>
            <ShareInstagramButton ticketDetail={ticketDetail} />
            <TouchableOpacity onPress={onSaveTicketImage}>
              <Image source={require('@/assets/icons/download.png')} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image source={heartIcon} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push(ROUTES.WRITE_EDIT, {id: ticketDetail?.id})
              }}>
              <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        )}
        {hasDoubleTicket ? (
          <View style={styles.matchButtonBox}>
            {data?.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.matchButton, ticketIndex === index && styles.matchButtonActive]}
                onPress={() => onChangeTicket(index)}>
                <Text style={[styles.matchText, ticketIndex === index && styles.matchTextActive]}>
                  {index + 1}차 경기
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        <ViewShot
          //
          style={styles.ticketBox}>
          {ticketDetail && <TicketFrame ticketDetail={ticketDetail} />}
        </ViewShot>
        <View style={styles.emojiBox}>
          {reactionList.map(reaction => (
            <TouchableOpacity
              key={reaction.key}
              style={[styles.emojiButton, reaction.isPressed && {borderColor: '#1E5EF4', borderWidth: 2}]}
              onPress={() => toggleReaction(reaction.key)}>
              <Text>{reaction.title}</Text>
              <Text>{reaction.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {from_ticket_box ? null : (
          <>
            {!hasDoubleTicket && isMyTicket && (
              <TouchableOpacity
                onPress={() => {
                  // ga 데이터 수집용도
                  setScreenName(pathname)
                  setDiaryCreate('메인 버튼')
                  // ga 데이터 수집용도
                  router.push(ROUTES.WRITE, {date: ticketDetail?.date})
                }}
                style={{
                  backgroundColor: '#1E5EF4',
                  borderRadius: 10,
                  paddingVertical: 10,
                  marginTop: 10,
                  marginBottom: 32,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#fff',
                    lineHeight: 22.4,
                    margin: 'auto',
                  }}>
                  더블헤더 티켓 추가하기
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EE',
  },
  scrollBox: {
    marginTop: 14,
    paddingHorizontal: 24,
    backgroundColor: '#F3F2EE',
  },
  iconBox: {
    flexDirection: 'row',
    gap: 24,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  matchButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  matchButton: {
    borderWidth: 1,
    borderColor: '#D0CEC7',
    borderRadius: 28.5,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  matchButtonActive: {
    backgroundColor: '#1E5EF4',
    borderColor: '#1E5EF4',
  },
  matchText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16.71,
    color: '#171716',
  },
  matchTextActive: {
    color: '#fff',
  },
  ticketBox: {
    width: '100%',
    marginHorizontal: 'auto',
    position: 'relative',
    marginBottom: 32,
    marginTop: 12,
  },
  ticketBoxDot: {
    backgroundColor: '#FFFCF3',
    width: '5%',
    aspectRatio: 1,
    borderRadius: 100,
    position: 'absolute',
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 2,
    gap: 2.5,
  },
  resultImgBox: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    gap: 8,
  },
  emojiBox: {
    // backgroundColor: '#fffcf3',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 30,
  },
  emojiButton: {
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#95938B',
    borderRadius: 40,
    paddingHorizontal: 12.5,
    paddingVertical: 4,
  },
  backImage: {
    width: 16,
    height: 28,
  },
})
