import {useLocalSearchParams} from 'expo-router'
import {useRef, useState} from 'react'
import {TouchableOpacity, View, Image, StyleSheet, ScrollView, TextInput, Platform} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import useWriteTicket from '@/hooks/match/useWriteTicket'
import React from 'react'
import dayjs from 'dayjs'
import {DAYS_OF_WEEK} from '@/constants/day'
import LocationTypeSelector from '@/components/write/LocationTypeSelector'
import Ellipse from '@/components/common/Ellipse'
import Input from '@/components/common/Input'
import useProfile from '@/hooks/my/useProfile'
import {useTeam, Team} from '@/entities/match'
import SelectBox from '@/components/common/SelectBox'
import LottieView from 'lottie-react-native'
import * as FileSystemLegacy from 'expo-file-system/legacy'
import {useLogin} from '@/hooks/auth/useLogin'
import Toast from 'react-native-toast-message'
import {logEvent} from '@/analytics/func'
import {EVENTS, useAnalyticsStore} from '@/analytics/event'
import {Config} from '@/config/Config'
import {resizeImage, size, useAppRouter} from '@/shared'
import {useKeyboard} from '@/shared'
import {BottomSheet, Txt} from '@/shared/ui'
import {CustKeyboardAvoidingView} from '@/shared/lib/useKeyboard'
import {PLACE_LIST} from '@/constants/ticket'
import {TicketFormDataMapper} from '@/features/ticket/create-ticket'
import {TicketImageUploader} from '@/entities/ticket'
import {color_token} from '@/constants/theme'
interface IWriteDataInterface {
  todayImg: ImagePicker.ImagePickerAsset | undefined
  matchTeam: Team | null
  matchPlace: string
  matchPlayer: string
  todayFood: string
  todayThoughts: string
  onlyMeCheck: boolean
  todayScore: {
    our: string
    opponent: string
  }
}

const Optional = ({label}: {label: string}) => {
  return (
    <View style={optionalStyles.container}>
      <Txt size={14} color={color_token.gray900} weight="medium" style={optionalStyles.label}>
        {label}
      </Txt>
      <Txt size={14} color={color_token.gray600} weight="medium" style={optionalStyles.label}>
        {' '}
        (선택)
      </Txt>
    </View>
  )
}

const TicketPage = () => {
  const {isKeyboardVisible} = useKeyboard()

  const {registerTicket, initializeTicket, ...writeStore} = useWriteTicket()
  const {profile} = useProfile()
  const {user} = useLogin()
  const [isPending, setIsPending] = useState(false)
  const {diary_create, screen_name} = useAnalyticsStore()

  const {findTeamById, teams} = useTeam()

  const {date: ticketDate} = useLocalSearchParams()

  const title = (() => {
    const date = dayjs(writeStore.selectedDate || (ticketDate as string))
    return `${date.format(`M월 D일 ${DAYS_OF_WEEK[date.day()]}요일`)}`
  })()

  const ballparkInfo = writeStore.selectedMatch?.ballpark_info
  const teamAwayInfo = writeStore.selectedMatch?.team_away_info
  const teamHomeInfo = writeStore.selectedMatch?.team_home_info

  const opponentTeam = teamAwayInfo?.id === profile.my_team?.id ? teamHomeInfo : teamAwayInfo

  // 마이팀이 포함되어 있는지 여부
  const isCheer = teamAwayInfo?.id === profile.my_team?.id || teamHomeInfo?.id === profile.my_team?.id

  // 직접입력 여부
  const isDirectWrite = !writeStore.selectedMatch

  const [writeData, setWriteData] = useState<IWriteDataInterface>({
    todayScore: {
      our: writeStore.selectedMatch?.score_home?.toString() || '',
      opponent: writeStore.selectedMatch?.score_away?.toString() || '',
    },
    todayImg: undefined,
    matchTeam: null,
    matchPlace: '',
    matchPlayer: '',
    todayFood: '',
    todayThoughts: '',
    onlyMeCheck: false,
  })

  const [teamModalVisible, setTeamModalVisible] = useState(false)
  const [placeModalVisible, setPlaceModalVisible] = useState(false)

  const router = useAppRouter()
  const handleInputChange = (key: keyof IWriteDataInterface, value: string) => {
    setWriteData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleScoreChange = (team: string, value: string) => {
    setWriteData(prevData => ({
      ...prevData,
      todayScore: {
        ...prevData.todayScore,
        [team]: value,
      },
    }))
  }

  const handleSelectTeam = (team: Team) => {
    setWriteData(prevData => ({
      ...prevData,
      matchTeam: team,
    }))
    setTeamModalVisible(false)
  }
  const handleSelectPlace = (place: string) => {
    setWriteData(prevData => ({
      ...prevData,
      matchPlace: place,
    }))
    setPlaceModalVisible(false)
  }

  const insets = useSafeAreaInsets()

  const onSubmit = async () => {
    if (isPending) return
    setIsPending(true)

    const ticketFormDataMapper = new TicketFormDataMapper(resizeImage)

    const formData = await ticketFormDataMapper.toFormData({
      writeStore,
      writeData,
      myTeamId: profile.my_team?.id || 0,
    })

    registerTicket(formData)
      .then(() => {
        logEvent(EVENTS.DIARY_CREATE, {
          method: diary_create, //
          screen_name,
          type: writeStore.selectedPlace,
        })
        console.log('티켓 발급 성공')
        setIsPending(false)
      })
      .catch(async () => {
        console.log('티켓 발급 실패')
        await onSaveDataWhenFailedSubmit()
      })
  }

  const onSaveDataWhenFailedSubmit = async () => {
    // TODO: 현재는 uri가 없으면 그냥 에러를 반환하고 있는 것으로 판단됨
    // 수정해야할듯
    if (writeData.todayImg?.uri) {
      const ticketFormDataMapper = new TicketFormDataMapper(resizeImage)
      const {image: resizedImage, ...bodyData} = await ticketFormDataMapper.toStringDto({
        writeStore,
        writeData,
        myTeamId: profile?.my_team?.id || 0,
      })

      await FileSystemLegacy.uploadAsync(`${Config.API_URL}/tickets/ticket_add/`, resizedImage, {
        fieldName: 'image',
        uploadType: FileSystemLegacy.FileSystemUploadType.MULTIPART,
        parameters: bodyData,
        headers: {
          'X-KBOAPP-TOKEN': user?.accessToken || '',
        },
      })
        .then((res: any) => {
          try {
            console.log('res', JSON.parse(res.body))
            initializeTicket(JSON.parse(res.body).id)
          } catch (error) {
            Toast.show({
              type: 'info',
              text1: '티켓 발급에 실패했어요',
              visibilityTime: 2000,
              autoHide: true,
              position: 'bottom',
              bottomOffset: insets.bottom + 92,
            })
          }
          // console.log('res')
        })
        .catch(err => {
          console.log('err', err)
        })
        .finally(() => {
          setIsPending(false)
        })
    } else {
      Toast.show({
        type: 'info',
        text1: '티켓 발급에 실패했어요',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
        bottomOffset: insets.bottom + 92,
      })
      setIsPending(false)
    }
  }

  const hasScore = Boolean(writeData.todayScore.our && writeData.todayScore.opponent)
  const hasOpponentTeam = Boolean(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id)

  const hasPlace = Boolean(
    (writeStore.selectedPlace === '직관' && writeData.matchPlace) || writeStore.selectedPlace === '집관',
  )

  const isEnabled = Boolean(hasScore && (!isDirectWrite || (hasPlace && hasOpponentTeam)))

  const inputListRef = useRef<Record<string, TextInput>>({})
  const scrollRef = useRef<ScrollView>(null)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stepHeaderBox}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Txt size={18} weight="semibold">
          {title}
        </Txt>
      </View>
      <CustKeyboardAvoidingView>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={styles.tabMenuContainer}>
            <View style={styles.tabMenu}>
              {/* 직관, 집관 선택 컴포넌트 */}
              <LocationTypeSelector value={writeStore.selectedPlace} onChange={writeStore.setSelectedPlace} />
            </View>
            <View style={styles.tabMenuBox}>
              <View>
                <View style={styles.scoreBox}>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    placeholder="0"
                    autoFocus
                    placeholderTextColor="#ddd"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                    value={writeData.todayScore.our}
                    onChangeText={value => handleScoreChange('our', value.replaceAll(/\D/g, ''))}
                    returnKeyType="next"
                    submitBehavior="newline"
                    onSubmitEditing={() => inputListRef.current['opponent'].focus()}
                    ref={ref => {
                      if (ref) inputListRef.current['our'] = ref
                    }}
                  />
                  <View style={styles.ellipseBox}>
                    <Ellipse />
                    <Ellipse />
                  </View>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    placeholder="0"
                    placeholderTextColor="#ddd"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                    value={writeData.todayScore.opponent}
                    onChangeText={value => handleScoreChange('opponent', value.replaceAll(/\D/g, ''))}
                    returnKeyType="done"
                    ref={ref => {
                      if (ref) inputListRef.current['opponent'] = ref
                    }}
                  />
                </View>
                <View style={styles.teamNmBox}>
                  <Txt size={14} style={styles.teamNmText}>
                    {findTeamById(teamHomeInfo?.id)?.short_name || findTeamById(profile.my_team?.id)?.short_name}
                  </Txt>
                  <Txt size={14} style={styles.teamNmText}>
                    {findTeamById(teamAwayInfo?.id)?.short_name || writeData.matchTeam?.short_name}
                  </Txt>
                </View>
              </View>
              <TicketImageUploader //
                uri={writeData.todayImg?.uri}
                onChange={image => setWriteData(prevData => ({...prevData, todayImg: image}))}
              />

              {(() => {
                if (isDirectWrite) {
                  return (
                    <SelectBox
                      label={'오늘의 상대구단'}
                      placeholder={'상대구단을 선택해주세요'}
                      value={writeData.matchTeam?.name}
                      onPress={() => setTeamModalVisible(true)}
                    />
                  )
                }

                if (!isCheer) return null
                return (
                  <Input
                    label="오늘의 상대구단"
                    value={opponentTeam?.name} //
                    editable={false}
                  />
                )
              })()}

              {writeStore.selectedPlace === '집관' ? (
                <Input
                  label={<Optional label="오늘의 집관장소" />}
                  value={writeData.matchPlace}
                  onChangeText={value => handleInputChange('matchPlace', value)}
                  placeholder="집관 장소를 기록해주세요"
                  maxLength={20}
                  ref={ref => {
                    if (ref) inputListRef.current['gip-place'] = ref
                  }}
                  returnKeyType="next"
                  submitBehavior="newline"
                  onSubmitEditing={() => inputListRef.current['player'].focus()}
                />
              ) : (
                <>
                  {!isDirectWrite ? (
                    <Input
                      label="오늘의 경기구장"
                      value={ballparkInfo?.name} //
                      editable={false}
                      returnKeyType="next"
                      submitBehavior="newline"
                      onSubmitEditing={() => inputListRef.current['player'].focus()}
                      ref={ref => {
                        if (ref) inputListRef.current['place'] = ref
                      }}
                    />
                  ) : (
                    <SelectBox
                      label={'오늘의 경기구장'}
                      placeholder={'경기구장을 선택해주세요'}
                      value={writeData.matchPlace}
                      onPress={() => setPlaceModalVisible(true)}
                    />
                  )}
                </>
              )}

              <Input
                label={<Optional label="오늘의 선발선수" />}
                value={writeData.matchPlayer} //
                onChangeText={value => handleInputChange('matchPlayer', value)}
                placeholder="선수 이름을 기록해주세요"
                maxLength={20}
                ref={ref => {
                  if (ref) inputListRef.current['player'] = ref
                }}
                returnKeyType="next"
                submitBehavior="newline"
                onSubmitEditing={() => inputListRef.current['food'].focus()}
              />

              <Input
                label={<Optional label="오늘의 직관푸드" />}
                value={writeData.todayFood} //
                onChangeText={value => handleInputChange('todayFood', value)}
                placeholder="오늘 먹은 직관푸드를 기록해주세요"
                maxLength={25}
                ref={ref => {
                  if (ref) inputListRef.current['food'] = ref
                }}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => {
                  inputListRef.current['thoughts'].focus()
                  scrollRef.current?.scrollToEnd()
                }}
              />

              <Input
                label={
                  <View style={styles.inputTitleBox}>
                    <Txt size={14} weight="medium" color={color_token.gray900}>
                      오늘의 소감
                    </Txt>
                    <TouchableOpacity
                      style={styles.onlyMeBox}
                      onPress={() =>
                        setWriteData(prev => ({
                          ...prev,
                          onlyMeCheck: !prev.onlyMeCheck,
                        }))
                      }
                      activeOpacity={1}>
                      <Image
                        source={
                          writeData.onlyMeCheck
                            ? require('@/assets/icons/onlyMeOnCheck.png')
                            : require('@/assets/icons/onlyMeOffCheck.png')
                        }
                        resizeMode="contain"
                        style={styles.checkboxIcon}
                      />
                      <Txt>나만보기</Txt>
                    </TouchableOpacity>
                  </View>
                }
                value={writeData.todayThoughts}
                onChangeText={value => handleInputChange('todayThoughts', value)}
                placeholder="오늘의 소감을 기록해주세요"
                multiline={true}
                numberOfLines={6}
                maxLength={500}
                style={styles.thoughtsInput}
                ref={ref => {
                  if (ref) inputListRef.current['thoughts'] = ref
                }}
              />
            </View>
          </View>
        </ScrollView>
      </CustKeyboardAvoidingView>
      {isKeyboardVisible && Platform.OS === 'android' ? null : (
        <FooterButton isEnabled={isEnabled} isPending={isPending} onSubmit={onSubmit} />
      )}
      {/* {Platform.OS === 'ios' && <FooterButton isEnabled={isEnabled} isPending={isPending} onSubmit={onSubmit} />} */}

      <BottomSheet
        isOpen={teamModalVisible}
        duration={250}
        height={394}
        onPressOverlay={() => setTeamModalVisible(false)}>
        <View style={styles.teamModalContent}>
          <Txt size={18} weight="bold">
            오늘의 상대구단
          </Txt>
          <View style={styles.optionsContainer}>
            {teams?.map(team => (
              <TouchableOpacity
                key={team.id}
                style={[styles.optionButton, writeData.matchTeam?.name === team.name && styles.selectedOption]}
                activeOpacity={1}
                onPress={() => handleSelectTeam(team as any)}>
                <Image source={team.logo} style={styles.logoImg} resizeMode="contain" />
                <Txt
                  size={14}
                  weight={writeData.matchTeam?.name === team.name ? 'bold' : 'medium'}
                  color={writeData.matchTeam?.name === team.name ? color_token.primary : color_token.gray900}>
                  {team.name}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        isOpen={placeModalVisible}
        duration={250}
        height={400}
        onPressOverlay={() => setPlaceModalVisible(false)}>
        <View style={styles.placeModalContent}>
          <Txt size={18} weight="bold">
            오늘의 경기구단
          </Txt>
          <View style={styles.optionsContainer}>
            {PLACE_LIST.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[styles.placeOptionButton, writeData.matchPlace === option.label && styles.selectedOption]}
                activeOpacity={1}
                onPress={() => handleSelectPlace(option.label)}>
                <Txt
                  size={14}
                  weight={writeData.matchPlace === option.label ? 'bold' : 'medium'}
                  color={writeData.matchPlace === option.label ? color_token.primary : color_token.gray900}>
                  {option.label}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

const FooterButton = ({
  isEnabled,
  isPending,
  onSubmit,
}: {
  isEnabled: boolean
  isPending: boolean
  onSubmit: () => void
}) => {
  return (
    <View style={styles.footerButtonBox}>
      <TouchableOpacity
        style={[styles.footerButton, isEnabled ? styles.activeButton : styles.disabledButton]}
        disabled={!isEnabled}
        onPress={onSubmit}>
        {isPending ? (
          <LottieView source={require('@/assets/lottie/loading.json')} autoPlay loop style={styles.lottieView} />
        ) : (
          <Txt size={16} weight="bold" color={isEnabled ? color_token.white : color_token.gray600}>
            오늘의 티켓 발급하기
          </Txt>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default TicketPage

const styles = StyleSheet.create({
  backImage: {
    width: size(16),
    height: size(28),
  },
  container: {
    flex: 1,
    backgroundColor: color_token.gray150,
    paddingHorizontal: size(20),
    position: 'relative',
  },
  stepHeaderBox: {
    paddingVertical: size(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  tabMenuContainer: {
    flex: 1,
    borderRadius: size(10),
    marginTop: size(24),
  },
  tabMenuBox: {
    alignItems: 'center',
    gap: size(24),
    paddingHorizontal: size(14),
    borderBottomLeftRadius: size(15),
    borderBottomRightRadius: size(15),
    marginBottom: size(20),
    backgroundColor: color_token.white,
    paddingBottom: size(32),
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(4),
    marginTop: size(28),
  },
  scoreInput: {
    width: size(55),
    height: size(55),
    fontSize: size(24),
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    borderColor: color_token.gray350,
    borderRadius: size(5),
  },
  ellipseBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: size(10),
    gap: size(6),
  },
  teamNmBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: size(25),
  },
  teamNmText: {
    width: size(55),
    textAlign: 'center',
  },
  thoughtsInput: {
    height: size(125),
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  footerButtonBox: {
    width: '100%',
    backgroundColor: color_token.gray150,
    paddingTop: size(16),
    position: 'sticky',
    bottom: size(16),
  },
  footerButton: {
    backgroundColor: color_token.gray300,
    height: size(50),
    borderRadius: size(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: color_token.gray300,
  },
  inputTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlyMeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(3),
    gap: size(4),
  },
  checkboxIcon: {
    width: size(18),
    height: size(18),
  },
  lottieView: {
    width: size(100),
    height: size(100),
  },
  teamModalContent: {
    width: '100%',
    backgroundColor: color_token.white,
    height: size(394),
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    padding: size(24),
  },
  placeModalContent: {
    width: '100%',
    backgroundColor: color_token.white,
    height: size(400),
    borderTopLeftRadius: size(20),
    borderTopRightRadius: size(20),
    padding: size(24),
  },
  optionsContainer: {
    marginTop: size(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: size(12),
  },
  optionButton: {
    height: size(48),
    borderWidth: 1,
    maxWidth: '48%',
    minWidth: '48%',
    borderColor: color_token.gray350,
    borderRadius: size(10),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: size(22),
    gap: size(8),
  },
  placeOptionButton: {
    maxWidth: '48%',
    minWidth: '48%',
    height: size(48),
    borderWidth: 1,
    borderColor: color_token.gray350,
    borderRadius: size(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: color_token.primary,
    backgroundColor: color_token.primary_10,
    flexDirection: 'row',
  },
  logoImg: {
    width: size(24),
    height: size(24),
  },
  tabMenu: {
    backgroundColor: color_token.white,
    width: '100%',
    height: size(59),
    borderTopLeftRadius: size(10),
    borderBottomWidth: 1,
    borderColor: color_token.gray300,
    borderTopRightRadius: size(10),
  },
  activeButton: {
    backgroundColor: color_token.primary,
  },
})

const optionalStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    lineHeight: size(19.6),
  },
})
