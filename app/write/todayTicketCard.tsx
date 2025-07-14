import {findMatchResultImage, findWeatherImage} from '@/constants/match'
import useTeam from '@/hooks/match/useTeam'
import useTicketDetail from '@/hooks/match/useTicketDetail'
import {format} from 'date-fns'
import {useLocalSearchParams, usePathname, useRootNavigationState, useRouter} from 'expo-router'
import React, {useRef, useState} from 'react'
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, Linking} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import MaskedView from '@react-native-masked-view/masked-view'
import Svg, {Path} from 'react-native-svg'
import useProfile from '@/hooks/my/useProfile'
import Header from '@/components/common/Header'
import Ellipse from '@/components/common/Ellipse'
import {useAnalyticsStore} from '@/analytics/event'
import ViewShot from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import Toast from 'react-native-toast-message'
import {PermissionsAndroid} from 'react-native'
import {useCommonSlice} from '@/slice/commonSlice'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ApiClient from '@/api'

class NoPermissionError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'NO_PERMISSION_ERROR'
  }
}

export default function GameCard() {
  const router = useRouter()
  const {id, date, target_id, from_ticket_box} = useLocalSearchParams()
  const {findTeamById} = useTeam()

  const {
    ticketDetail, //
    onChangeTicket,
    ticketIndex,
    data,
    toggleFavorite,
    reactionList,
    toggleReaction,
  } = useTicketDetail(Number(id) || (date as string), Number(target_id))
  const {setScreenName, setDiaryCreate} = useAnalyticsStore()
  const pathname = usePathname()

  const {profile} = useProfile()

  const isMyTicket = profile?.id === ticketDetail?.writer

  const hometeam = findTeamById(Number(ticketDetail?.hometeam_id))
  const awayteam = findTeamById(Number(ticketDetail?.awayteam_id))

  const heartIcon = ticketDetail?.favorite
    ? require('@/assets/icons/heart_fill.png')
    : require('@/assets/icons/heart.png')

  const onBackButtonClick = () => {
    router.back()
  }

  const dotRef = useRef<View>(null)

  const [halfWidth, setHalfWidth] = useState(0)

  const getRefWidth = () => {
    if (dotRef.current) {
      dotRef.current.measure((x, y, width, height, pageX, pageY) => {
        if (width) {
          halfWidth !== width / 2 && setHalfWidth(width / 2)
        }
      })
    }
  }

  getRefWidth()

  const ref = useRef<any>(null)

  const insets = useSafeAreaInsets()

  const showToast = (text: string) => {
    Toast.show({
      type: 'info',
      text1: text,
      visibilityTime: 2000,
      autoHide: true,
      position: 'bottom',
      bottomOffset: insets.bottom + 92,
    })
  }

  const [premissionResponse, requestPermission] = MediaLibrary.usePermissions()

  const onSaveTicketImage = () => {
    if (ref.current) {
      ref.current
        ?.capture()
        .then(async (uri: any) => {
          // 저장 권한 요청
          // TODO: 권한 요청 분리 및 첫 진입 시 요청 필요
          if (Platform.OS === 'ios' && premissionResponse?.status !== 'granted') {
            const result = await requestPermission()
            if (result.status !== 'granted') throw new NoPermissionError()
          }

          if (Platform.OS === 'android' && premissionResponse?.status !== 'granted') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
            const isNotGranted = granted !== PermissionsAndroid.RESULTS.GRANTED
            if (isNotGranted) throw new NoPermissionError()
          }

          console.log('status', premissionResponse?.status)
          console.log('accessPrivileges', premissionResponse?.accessPrivileges)

          // 저장
          const asset = await MediaLibrary.createAssetAsync(uri)
          if (Platform.OS === 'ios' && premissionResponse?.accessPrivileges === 'limited') {
            console.log('앨범 생성은 안 함')
            return
          }
          // accessPrivileges === 'all'이거나, Platform.OS === 'android'일 때만 앨범 생성
          await MediaLibrary.createAlbumAsync('오늘의야구', asset, false)
        })
        .then(() => showToast('이미지가 저장되었습니다'))
        .catch((err: any) => {
          if (err instanceof NoPermissionError) {
            Alert.alert('권한이 없어요', '앱 설정으로 가서 액세스 권한을 수정할 수 있어요. 이동하시겠어요?', [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '설정하기',
                onPress: () => Linking.openSettings(),
              },
            ])
          } else {
            showToast('잠시 후 다시 시도해 주세요')
          }
        })
    }
  }

  const {modal} = useCommonSlice()
  const queryClient = useQueryClient()

  const {mutate: deleteTicket} = useMutation({
    mutationFn: (id: number) => ApiClient.post(`/tickets/ticket_del/`, {id}),
    onSuccess: (_, variables) => {
      setTimeout(() => {
        router.back()
      }, 500)
      showToast('삭제되었습니다.')

      queryClient.refetchQueries({queryKey: ['tickets']})
      queryClient.refetchQueries({queryKey: ['ticket']})
      queryClient.refetchQueries({queryKey: ['ticketListByTeam']})
    },
    onError: () => {
      showToast('잠시 후 다시 시도해 주세요')
    },
    onSettled: modal.hide,
  })

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="오늘의 티켓"
        variants="transparent"
        leftButton={{
          onPress: onBackButtonClick,
          content: <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />,
        }}
        rightButton={
          isMyTicket
            ? {
                onPress: () => {
                  modal.open({
                    header: '안내',
                    content: '해당 티켓을 삭제할까요?',
                    button: [
                      {
                        text: '취소',
                        onPress: modal.hide,
                        buttonStyle: {
                          backgroundColor: '#D0CEC7',
                        },
                      },
                      {
                        text: '삭제',
                        onPress: () => ticketDetail?.id && deleteTicket(ticketDetail?.id),
                        buttonStyle: {
                          backgroundColor: '#1E5EF4',
                        },
                        buttonTextStyle: {
                          color: '#fff',
                        },
                      },
                    ],
                  })
                  // router.push({pathname: '/write/edit', params: {id: ticketDetail?.id}})
                },
                content: (
                  <Text style={{color: '#1E5EF4', fontSize: 16, fontWeight: '500', lineHeight: 18 * 1.4}}>삭제</Text>
                ),
              }
            : undefined
        }
      />
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        {isMyTicket && (
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={onSaveTicketImage}>
              <Image source={require('@/assets/icons/download.png')} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image source={heartIcon} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({pathname: '/write/edit', params: {id: ticketDetail?.id}})
              }}>
              <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        )}
        {Number(data?.length) > 1 ? (
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

        <ViewShot style={styles.ticketBox} ref={ref} options={{fileName: 'todaybaseball', format: 'jpg', quality: 0.9}}>
          {Array.from({length: 10}).map((_, index) => (
            <View
              ref={dotRef}
              key={index}
              style={[styles.ticketBoxDot, {top: halfWidth * -1, left: `${4.76 + index * 4.76 * 2}%`}]}
            />
          ))}
          {Array.from({length: 10}).map((_, index) => (
            <View
              key={index}
              style={[styles.ticketBoxDot, {bottom: halfWidth * -1, left: `${4.76 + index * 4.76 * 2}%`}]}
            />
          ))}
          <View style={styles.ticketBackground}>
            <View style={[styles.ticketContent]}>
              <View style={{position: 'relative', width: '100%'}}>
                <MaskedView
                  style={{
                    aspectRatio: 307 / 270,
                  }}
                  maskElement={
                    <Svg height="100%" width="100%" viewBox="0 0 307 270">
                      <Path
                        fill="white"
                        d={`
                          M0 0 
                          H307 
                          V270 
                          H0 
                          Z
                          
                          M0 0 
                          V0 20
                          C0 20, 20 20, 20 0 
                          Z
                          
                          M287 0
                          C287 20, 307 20, 307 20
                          V307 0
                          Z
                          `}
                      />
                    </Svg>
                  }>
                  {/* 마스킹된 부분에 이미지 표시 */}
                  <Image
                    source={{
                      uri: ticketDetail?.image,
                    }}
                    style={{width: '100%', aspectRatio: 307 / 270}}
                    resizeMode="cover"
                  />
                  <Svg height="100%" width="100%" viewBox="0 0 307 270" style={{position: 'absolute', top: 0, left: 0}}>
                    <Path
                      d={`
                          M0 0 
                          H307 
                          V270 
                          H0 
                          Z
                          
                          M0 0 
                          V0 20
                          C0 20, 20 20, 20 0 
                          Z
                          
                          M287 0
                          C287 20, 307 20, 307 20
                          V307 0
                          Z
                          `}
                      fill="none"
                      stroke="white"
                      strokeWidth="6"
                    />
                  </Svg>
                </MaskedView>
              </View>

              {/* <View style={styles.imgViewBox}>
                <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
              </View> */}
              <View style={[styles.resultBox]}>
                <View style={styles.resultImgBox}>
                  <Image
                    source={findMatchResultImage(ticketDetail?.result)}
                    resizeMode="contain"
                    style={styles.editIcon}
                  />
                  <Text style={styles.resultText}>
                    {ticketDetail?.result === '취소' ? '경기 취소' : ticketDetail?.result}
                  </Text>
                </View>
                <View style={styles.resultImgBox}>
                  <Image
                    source={findWeatherImage(ticketDetail?.weather)}
                    resizeMode="contain"
                    style={styles.resultIcon}
                  />
                  <Text style={styles.resultText}>{ticketDetail?.weather}</Text>
                </View>
              </View>

              <View style={styles.matchInfoBox}>
                <View style={styles.scoreBox}>
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>{ticketDetail?.score_our}</Text>
                    <Text style={[styles.teamText, {backgroundColor: `${hometeam?.color}4D`}]}>
                      {hometeam?.short_name}
                    </Text>
                  </View>
                  <View style={{gap: 6}}>
                    <Ellipse size={5} />
                    <Ellipse size={5} />
                  </View>
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>{ticketDetail?.score_opponent}</Text>
                    <Text style={[styles.teamText, {backgroundColor: `${awayteam?.color}4D`}]}>
                      {awayteam?.short_name}
                    </Text>
                  </View>
                </View>
                <View style={styles.matchBox}>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 경기일정</Text>
                    <Text style={styles.infoValue}>
                      {ticketDetail?.date ? format(ticketDetail?.date, 'yyyy-MM-dd') : ''}
                    </Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>
                      {ticketDetail?.is_ballpark ? '오늘의 경기구장' : '오늘의 집관장소'}
                    </Text>
                    <View style={{flex: 1}}>
                      <Text style={[styles.infoValue, {lineHeight: 17}]} numberOfLines={2}>
                        {ticketDetail?.gip_place}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 선발선수</Text>
                    <View style={{flex: 1}}>
                      <Text style={[styles.infoValue, {lineHeight: 17}]} numberOfLines={2}>
                        {ticketDetail?.starting_pitchers}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 직관푸드</Text>
                    <View style={{flex: 1}}>
                      <Text style={[styles.infoValue, {lineHeight: 17}]} numberOfLines={2}>
                        {ticketDetail?.food}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{position: 'relative', width: '100%'}}>
                <MaskedView
                  style={{aspectRatio: 307 / 220}}
                  maskElement={
                    <Svg height="100%" width="100%" viewBox="0 0 307 220">
                      <Path
                        fill="red"
                        d={`
                          M0 0 
                          H307 
                          V220 
                          H0 
                          Z
                          
                          M307 220 
                          V307 200
                          C307 200, 287 200, 287 220 
                          Z

                          M20 220
                          C20 220, 20 200, 0 200
                          V0 220
                          Z
                          `}
                      />
                    </Svg>
                  }>
                  {/* 마스크로 보여질 영역 */}
                  <View style={{width: '100%', height: '100%', backgroundColor: 'white', padding: 10}}>
                    <View style={styles.thoughtsBox}>
                      {(() => {
                        if (!ticketDetail?.only_me) {
                          return (
                            <View style={styles.thoughtsTextBox}>
                              <ScrollView>
                                <Text style={styles.thoughtsText}>{ticketDetail?.memo}</Text>
                              </ScrollView>
                            </View>
                          )
                        }

                        if (ticketDetail?.only_me && profile.id === ticketDetail.writer) {
                          return (
                            <>
                              <View style={styles.onlyMeButtonBox}>
                                <Image
                                  source={require('@/assets/icons/lock.png')}
                                  style={styles.lockButton}
                                  resizeMode="contain"
                                />
                                <Text style={styles.onlyMeText}>나만보기</Text>
                              </View>
                              <View style={styles.thoughtsTextBox}>
                                <ScrollView>
                                  <Text style={styles.thoughtsText}>{ticketDetail?.memo}</Text>
                                </ScrollView>
                              </View>
                            </>
                          )
                        }

                        return null
                      })()}
                    </View>
                  </View>
                </MaskedView>
              </View>
            </View>
          </View>
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
            {Number(data?.length) <= 1 && isMyTicket && (
              <TouchableOpacity
                onPress={() => {
                  // ga 데이터 수집용도
                  setScreenName(pathname)
                  setDiaryCreate('메인 버튼')
                  // ga 데이터 수집용도
                  router.push({pathname: '/write', params: {date: ticketDetail?.date}})
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
  maskContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fffcf3',
  },
  headerBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25.2,
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    left: 24,
  },
  scrollBox: {
    marginTop: 14,
    paddingHorizontal: 24,
    backgroundColor: '#fffcf3',
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
    backgroundColor: '#202020',
    position: 'relative',
    marginBottom: 32,
  },
  ticketBoxDot: {
    backgroundColor: '#FFFCF3',
    width: '5%',
    aspectRatio: 1,
    borderRadius: 100,
    position: 'absolute',
  },
  imgViewBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#fff',
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#202020',
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
  resultIcon: {
    width: 27,
    height: 28,
  },
  resultText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22.4,
  },
  matchInfoBox: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginVertical: 2,
  },
  scoreBox: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  teamScoreBox: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchDot: {
    width: 6,
    height: 16,
  },
  scoreText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33.4,
  },
  teamText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#FDD484',
    borderRadius: 4,
  },
  matchBox: {
    width: '100%',
    height: 150,
    flexDirection: 'column',
    paddingBottom: 10,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    // paddingVertical: 8,
    paddingHorizontal: 22,
    alignItems: 'center',
    gap: 30,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    width: 95,
  },
  infoValue: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    color: '#353430',
  },
  onlyMeText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21,
    color: '#171716',
  },
  emojiBox: {
    backgroundColor: '#fffcf3',
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
    borderColor: '#95938B',
    borderRadius: 40,
    paddingHorizontal: 12.5,
    paddingVertical: 4,
  },
  thoughtsBox: {
    width: '100%',
  },
  onlyMeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  lockButton: {
    width: 24,
    height: 24,
  },
  thoughtsTextBox: {
    marginTop: 2,
  },
  thoughtsText: {
    color: '#353430',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 21,
  },
  ticketBackground: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingVertical: 32,
  },
  backgroundImage: {
    resizeMode: 'stretch',
  },
  ticketContent: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  backImage: {
    width: 16,
    height: 28,
  },
})
