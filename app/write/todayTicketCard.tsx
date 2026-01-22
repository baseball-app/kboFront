import {useLocalSearchParams, usePathname} from 'expo-router';
import React from 'react';
import {View, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useProfile from '@/hooks/my/useProfile';
import Header from '@/components/common/Header';
import {useAnalyticsStore} from '@/analytics/event';
import * as MediaLibrary from 'expo-media-library';
import {ROUTES, size, useAppRouter} from '@/shared';
import {TicketFrame} from '@/widgets/ticket/frame';
import {NoPermissionError, useCaptureView, useShare, useMediaPermission, showToast} from '@/shared';
import {TicketDeleteButton} from '@/features/ticket/delete-ticket';
import useTicketDetail from '@/hooks/match/useTicketDetail';
import {ShareInstagramButton} from '@/features/ticket/share-instagram';
import Skeleton from '@/components/skeleton/Skeleton';
import {color_token} from '@/constants/theme';
import {BackButton, Button, Pressable, Txt} from '@/shared/ui';

export default function GameCard() {
  const router = useAppRouter();
  const {id, date, target_id, from_ticket_box} = useLocalSearchParams();

  const {openSettingModal, checkMediaPermission} = useMediaPermission();
  const {ViewShot, onCaptureView} = useCaptureView();

  const {shareInstagramStories, checkCanOpenInstagram} = useShare();

  const onSaveTicketImage = async () => {
    try {
      const viewShot = await onCaptureView();
      if (!viewShot) throw new Error('이미지 캡처에 실패했어요');
      const {isGranted} = await checkMediaPermission();
      if (!isGranted) throw new Error('저장 권한이 없어요');
      const asset = await MediaLibrary.createAssetAsync(viewShot.uri);
      showToast('이미지가 저장되었습니다');
    } catch (error) {
      if (error instanceof NoPermissionError) {
        openSettingModal();
      } else {
        showToast('잠시 후 다시 시도해 주세요');
      }
    }
  };

  const onShareInstagramStories = async () => {
    try {
      const viewShot = await onCaptureView();
      if (!viewShot) throw new Error('이미지 캡처에 실패했어요');

      const isSupportedInstagram = await checkCanOpenInstagram();

      if (!isSupportedInstagram) {
        showToast('지금은 인스타그램 공유만 지원해요');
        return;
      }

      shareInstagramStories(viewShot.uri);
    } catch (error) {
      showToast('잠시 후 다시 시도해 주세요');
    }
  };

  const {
    ticketDetail,
    onChangeTicket,
    ticketIndex,
    data,
    toggleFavorite, //
    reactionList,
    toggleReaction,
  } = useTicketDetail(Number(id) || (date as string), Number(target_id));
  const hasDoubleTicket = (data?.length || 0) > 1;

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

  const {setScreenName, setDiaryCreate} = useAnalyticsStore();
  const pathname = usePathname();

  const {profile} = useProfile();

  const isMyTicket = profile?.id === ticketDetail?.writer;

  const heartIcon = ticketDetail?.favorite
    ? require('@/assets/icons/heart_fill.png')
    : require('@/assets/icons/heart.png');

  const onBackButtonClick = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={
          <Txt size={20} weight="semibold" color={color_token.black}>
            오늘의 티켓
          </Txt>
        }
        variants="transparent"
        leftButton={{
          content: <BackButton onPress={onBackButtonClick} />,
        }}
        rightButton={{
          content: isMyTicket ? <TicketDeleteButton ticketId={ticketDetail?.id || 0} /> : undefined,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        {isMyTicket && (
          <View style={styles.iconBox}>
            <ShareInstagramButton ticketDetail={ticketDetail} />
            <Pressable onPress={onSaveTicketImage}>
              <Image source={require('@/assets/icons/download.png')} resizeMode="contain" style={styles.editIcon} />
            </Pressable>
            <Pressable onPress={toggleFavorite}>
              <Image source={heartIcon} resizeMode="contain" style={styles.editIcon} />
            </Pressable>
            <Pressable
              onPress={() => {
                router.push(ROUTES.WRITE_EDIT, {id: ticketDetail?.id});
              }}>
              <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
            </Pressable>
          </View>
        )}
        {hasDoubleTicket ? (
          <View style={styles.matchButtonBox}>
            {data?.map((_, index) => (
              <Pressable
                key={index}
                style={[styles.matchButton, ticketIndex === index && styles.matchButtonActive]}
                onPress={() => onChangeTicket(index)}>
                <Txt
                  size={14}
                  weight="bold"
                  color={ticketIndex === index ? color_token.white : color_token.gray900}
                  style={styles.matchText}>
                  {index + 1}차 경기
                </Txt>
              </Pressable>
            ))}
          </View>
        ) : null}

        <ViewShot style={styles.ticketBox}>
          {ticketDetail ? (
            <TicketFrame ticketDetail={ticketDetail} />
          ) : (
            <Skeleton style={{borderRadius: 0}} width={'100%'} height={500} />
          )}
        </ViewShot>
        <View style={styles.emojiBox}>
          {reactionList.map(reaction => (
            <Pressable
              key={reaction.key}
              style={[styles.emojiButton, reaction.isPressed && styles.emojiButtonActive]}
              onPress={() => toggleReaction(reaction.key)}>
              <Txt size={14}>{reaction.title}</Txt>
              <Txt size={14} weight="medium">
                {reaction.count}
              </Txt>
            </Pressable>
          ))}
        </View>

        {from_ticket_box ? null : (
          <>
            {!hasDoubleTicket && isMyTicket && (
              <Button
                onPress={() => {
                  setScreenName(pathname);
                  setDiaryCreate('메인 버튼');
                  router.push(ROUTES.WRITE, {date: ticketDetail?.date});
                }}
                style={styles.doubleHeaderButton}>
                더블헤더 티켓 추가하기
              </Button>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_token.gray150,
  },
  scrollBox: {
    marginTop: size(14),
    paddingHorizontal: size(24),
    backgroundColor: color_token.gray150,
  },
  iconBox: {
    flexDirection: 'row',
    gap: size(24),
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: size(20),
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  matchButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: size(12),
    marginBottom: size(24),
  },
  matchButton: {
    borderWidth: 1,
    borderColor: color_token.gray350,
    borderRadius: size(28.5),
    paddingVertical: size(10),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  matchButtonActive: {
    backgroundColor: color_token.primary,
    borderColor: color_token.primary,
  },
  matchText: {},
  ticketBox: {
    width: '100%',
    marginHorizontal: 'auto',
    position: 'relative',
    marginBottom: size(32),
    marginTop: size(12),
  },
  emojiBox: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: size(8),
    rowGap: size(12),
    marginBottom: size(30),
  },
  emojiButton: {
    flexDirection: 'row',
    gap: size(4),
    borderWidth: 1,
    backgroundColor: color_token.white,
    borderColor: color_token.gray350,
    borderRadius: size(40),
    paddingHorizontal: size(11),
    paddingVertical: size(4),
  },
  emojiButtonActive: {
    borderColor: color_token.primary,
  },
  backImage: {
    width: 16,
    height: 28,
  },
  doubleHeaderButton: {
    marginTop: size(10),
    marginBottom: size(32),
  },
});
