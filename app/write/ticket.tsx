import {useLocalSearchParams, useRouter} from 'expo-router'
import {PropsWithChildren, useRef, useState} from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import {Modal} from '@/components/common/Modal'
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
import useTeam, {Team} from '@/hooks/match/useTeam'
import SelectBox from '@/components/common/SelectBox'
import ImageResizer from '@bam.tech/react-native-image-resizer'
import LottieView from 'lottie-react-native'

import * as FileSystem from 'expo-file-system'
import {useLogin} from '@/hooks/auth/useLogin'
import Toast from 'react-native-toast-message'
import {logEvent} from '@/analytics/func'
import {EVENTS, useAnalyticsStore} from '@/analytics/event'
import {Config} from '@/config/Config'

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

const placeOption = [
  {label: '대구 삼성 라이온즈 파크', value: '대구 삼성 라이온즈 파크'},
  {label: '부산 사직 야구장', value: '부산 사직 야구장'},
  {label: '잠실 종합운동장 야구장', value: '잠실 종합운동장 야구장'},
  {label: '고척 스카이돔', value: '고척 스카이돔'},
  {label: '인천 SSG 랜더스필드', value: '인천 SSG 랜더스필드'},
  {label: '수원 KT위즈파크', value: '수원 KT위즈파크'},
  {label: '대전 한화생명 볼파크', value: '대전 한화생명 볼파크'},
  {label: '창원 NC파크', value: '창원 NC파크'},
  {label: '광주 기아 챔피언스 필드', value: '광주 기아 챔피언스 필드'},
]

const Optional = ({label}: {label: string}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{fontSize: 14, color: '#171716', fontWeight: '500', lineHeight: 19.6}}>{label}</Text>
      <Text style={{fontSize: 14, color: '#95938B', fontWeight: '500', lineHeight: 19.6}}> (선택)</Text>
    </View>
  )
}

const TicketPage = () => {
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

  const opponentTeam =
    writeStore.selectedMatch?.team_away_info.id === profile.my_team?.id
      ? writeStore.selectedMatch?.team_home_info
      : writeStore.selectedMatch?.team_away_info

  // 마이팀이 포함되어 있는지 여부
  const isCheer =
    writeStore.selectedMatch?.team_away_info.id === profile.my_team?.id ||
    writeStore.selectedMatch?.team_home_info.id === profile.my_team?.id

  // 직접입력 여부
  const isDirectWrite = !writeStore.selectedMatch

  const [writeData, setWriteData] = useState<IWriteDataInterface>({
    todayScore: {
      our: '',
      opponent: '',
    },
    todayImg: undefined,
    matchTeam: null,
    matchPlace: '',
    matchPlayer: '',
    todayFood: '',
    todayThoughts: '',
    onlyMeCheck: false,
  })

  const [tabMenu, setTabMenu] = useState(writeStore.selectedPlace)
  const [teamModalVisible, setTeamModalVisible] = useState(false)
  const [placeModalVisible, setPlaceModalVisible] = useState(false)

  const router = useRouter()
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

    const formData = new FormData()

    if (writeData.todayImg?.uri) {
      const resizedImage = await ImageResizer.createResizedImage(
        writeData.todayImg?.uri || '', // 원본 이미지
        800, // 리사이즈할 가로 크기 (필요한 크기로 변경)
        800, // 리사이즈할 세로 크기
        'PNG', // 출력 포맷 ('JPEG' 또는 'PNG')
        100, // 품질 (0 ~ 100)
        0, // 회전 (0 = 그대로)
        undefined, // outputPath (설정하지 않으면 기본 캐시에 저장됨)
        false, // 메타데이터 유지 여부
      )
      formData.append('image', {
        uri: resizedImage?.uri, // 리사이징된 이미지 URI 사용
        type: writeData.todayImg?.type, // 원본 이미지의 MIME 타입 유지
        name: 'image.png',
      } as any)
    }

    // const formDataObj = {
    //   date: dayjs(writeStore.selectedDate).format('YYYY-MM-DD'),
    //   game: String(writeStore.selectedMatch?.id || ''),
    //   result: writeStore.selectedMatchResult === '경기 취소' ? '취소' : writeStore.selectedMatchResult,
    //   weather: writeStore.selectedWeather,
    //   is_ballpark: JSON.stringify(tabMenu === '직관'),
    //   score_our: writeData.todayScore.our,
    //   score_opponent: writeData.todayScore.opponent,
    //   starting_pitchers: writeData.matchPlayer || '',
    //   gip_place: tabMenu === '직관' ? ballparkInfo?.name || writeData.matchPlace : writeData.matchPlace || '',
    //   food: writeData.todayFood || '',
    //   memo: writeData.todayThoughts || '',
    //   is_homeballpark: JSON.stringify(tabMenu === '집관'),
    //   only_me: JSON.stringify(writeData.onlyMeCheck),
    //   is_double: JSON.stringify(isDirectWrite),
    //   hometeam_id: String(writeStore.selectedMatch?.team_home_info.id || profile.my_team?.id),
    //   awayteam_id: String(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id),
    //   direct_yn: JSON.stringify(isDirectWrite),
    //   is_cheer: JSON.stringify(isCheer),
    // }

    // console.log('Form Data:', JSON.stringify(formDataObj, null, 2))

    formData.append('date', dayjs(writeStore.selectedDate).format('YYYY-MM-DD'))
    formData.append('game', String(writeStore.selectedMatch?.id || ''))
    formData.append('result', writeStore.selectedMatchResult === '경기 취소' ? '취소' : writeStore.selectedMatchResult)
    formData.append('weather', writeStore.selectedWeather)
    formData.append('is_ballpark', JSON.stringify(tabMenu === '직관'))

    formData.append('score_our', writeData.todayScore.our)
    formData.append('score_opponent', writeData.todayScore.opponent)

    // 선발선수
    formData.append('starting_pitchers', writeData.matchPlayer || '')

    // 경기구단
    formData.append(
      'gip_place',
      tabMenu === '직관' ? ballparkInfo?.name || writeData.matchPlace : writeData.matchPlace || '',
    )

    // 직관푸드
    formData.append('food', writeData.todayFood || '')

    // 오늘의 소감
    formData.append('memo', writeData.todayThoughts || '')
    formData.append('is_homeballpark', JSON.stringify(tabMenu === '집관'))

    //나만보기
    formData.append('only_me', JSON.stringify(writeData.onlyMeCheck))
    formData.append('is_double', JSON.stringify(isDirectWrite))

    // hometeam_id
    formData.append('hometeam_id', String(writeStore.selectedMatch?.team_home_info.id || profile.my_team?.id))
    formData.append('awayteam_id', String(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id))
    formData.append('direct_yn', JSON.stringify(isDirectWrite))
    formData.append('is_cheer', JSON.stringify(isCheer))

    registerTicket(formData)
      .then(() => {
        logEvent(EVENTS.DIARY_CREATE, {
          method: diary_create, //
          screen_name,
          type: tabMenu,
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
    if (writeData.todayImg?.uri) {
      const resizedImage = await ImageResizer.createResizedImage(
        writeData.todayImg?.uri || '', // 원본 이미지
        800, // 리사이즈할 가로 크기 (필요한 크기로 변경)
        800, // 리사이즈할 세로 크기
        'PNG', // 출력 포맷 ('JPEG' 또는 'PNG')
        100, // 품질 (0 ~ 100)
        0, // 회전 (0 = 그대로)
        undefined, // outputPath (설정하지 않으면 기본 캐시에 저장됨)
        false, // 메타데이터 유지 여부
      )

      await FileSystem.uploadAsync(`${Config.API_URL}/tickets/ticket_add/`, resizedImage.uri, {
        fieldName: 'image',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        parameters: {
          date: dayjs(writeStore.selectedDate).format('YYYY-MM-DD'),
          game: String(writeStore.selectedMatch?.id || ''),
          result: writeStore.selectedMatchResult === '경기 취소' ? '취소' : writeStore.selectedMatchResult,
          weather: writeStore.selectedWeather,
          is_ballpark: JSON.stringify(tabMenu === '직관'),
          score_our: writeData.todayScore.our,
          score_opponent: writeData.todayScore.opponent,
          starting_pitchers: writeData.matchPlayer,
          gip_place: tabMenu === '직관' ? ballparkInfo?.name || writeData.matchPlace : writeData.matchPlace,
          food: writeData.todayFood,
          memo: writeData.todayThoughts,
          is_homeballpark: JSON.stringify(tabMenu === '집관'),
          only_me: JSON.stringify(writeData.onlyMeCheck),
          is_double: JSON.stringify(isDirectWrite),
          hometeam_id: String(writeStore.selectedMatch?.team_home_info.id || profile.my_team?.id),
          awayteam_id: String(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id),
          direct_yn: JSON.stringify(isDirectWrite),
          is_cheer: JSON.stringify(isCheer),
        },
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

  const uploadPhoto = async () => {
    /** 갤러리 접근 권한 요청 */
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    /** 갤러리에서 이미지 선택 */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      aspect: [307, 270],
      selectionLimit: 1,
    } as ImagePicker.ImagePickerOptions)

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setWriteData(prevData => ({
        ...prevData,
        todayImg: result.assets[0],
      }))
    } else if (result.canceled) {
      // setWriteData(prevData => ({
      //   ...prevData,
      //   todayImg: undefined,
      // }))
    }
  }

  const isEnabled = writeData.todayScore.our && writeData.todayScore.opponent

  const inputListRef = useRef<Record<string, TextInput>>({})
  const scrollRef = useRef<ScrollView>(null)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stepHeaderBox}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.dateText}>{title}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={30}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={styles.tabMenuContainer}>
            <View style={styles.tabMenu}>
              {/* 직관, 집관 선택 컴포넌트 */}
              <LocationTypeSelector value={tabMenu} onChange={setTabMenu} />
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
                    onChangeText={value => handleScoreChange('opponent', value.replaceAll(/\D/g, ''))}
                    returnKeyType="done"
                    // submitBehavior="newline"
                    onSubmitEditing={() => {
                      // console.log('제출?')
                      // inputListRef.current['player'].focus()
                      // uploadPhoto()
                    }}
                    // returnKeyType="done"
                    // submitBehavior="newline"
                    ref={ref => {
                      if (ref) inputListRef.current['opponent'] = ref
                    }}
                  />
                </View>
                <View style={styles.teamNmBox}>
                  <Text style={styles.teamNmText}>
                    {findTeamById(teamHomeInfo?.id)?.short_name || findTeamById(profile.my_team?.id)?.short_name}
                  </Text>
                  <Text style={styles.teamNmText}>
                    {findTeamById(teamAwayInfo?.id)?.short_name || writeData.matchTeam?.short_name}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.imageUploadBox} onPress={uploadPhoto} activeOpacity={1}>
                {writeData.todayImg ? (
                  <Image source={{uri: writeData.todayImg.uri}} style={styles.todayImg} />
                ) : (
                  <>
                    <Image source={require('@/assets/icons/add_image.png')} style={styles.addImage} />
                    <Text style={styles.uploadText}>오늘의 사진을 넣어주세요</Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 12,
                        color: '#8A8A8A',
                        lineHeight: 16.8,
                      }}>
                      * 사진 미등록 시, 기본 사진으로 자동 설정됩니다
                    </Text>
                  </>
                )}
              </TouchableOpacity>

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

              {tabMenu === '집관' ? (
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
                    <Text style={styles.label}>오늘의 소감</Text>
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
                        style={{width: 18, height: 18}}
                      />
                      <Text>나만보기</Text>
                    </TouchableOpacity>
                  </View>
                }
                value={writeData.todayThoughts} //
                onChangeText={value => handleInputChange('todayThoughts', value)}
                placeholder="오늘의 소감을 기록해주세요"
                multiline={true}
                numberOfLines={6}
                maxLength={500}
                style={{height: 125, textAlign: 'left', textAlignVertical: 'top'}}
                ref={ref => {
                  if (ref) inputListRef.current['thoughts'] = ref
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footerButtonBox, {marginBottom: 16}]}>
        <TouchableOpacity
          style={[styles.footerButton, isEnabled ? styles.activeButton : styles.disabledButton]}
          disabled={!isEnabled}
          onPress={onSubmit}>
          {isPending ? (
            <LottieView
              source={require('@/assets/lottie/loading.json')}
              autoPlay
              loop
              style={{width: 100, height: 100}}
            />
          ) : (
            <Text style={[styles.footerButtonText, styles.activeButtonText]}>오늘의 티켓 발급하기</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={teamModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.teamModalContent}>
            <Text style={styles.modalTitle}>오늘의 상대구단</Text>
            <View style={styles.optionsContainer}>
              {teams?.map(team => (
                <TouchableOpacity
                  key={team.id}
                  style={[styles.optionButton, writeData.matchTeam?.name === team.name && styles.selectedOption]}
                  activeOpacity={1}
                  onPress={() => handleSelectTeam(team as any)}>
                  <Image source={team.logo} style={styles.logoImg} resizeMode="contain" />
                  <Text
                    style={[styles.optionText, writeData.matchTeam?.name === team.name && styles.selectedOptionText]}>
                    {team.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={placeModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.placeModalContent}>
            <Text style={styles.modalTitle}>오늘의 경기구단</Text>
            <View style={styles.optionsContainer}>
              {placeOption.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.placeOptionButton, writeData.matchPlace === option.label && styles.selectedOption]}
                  activeOpacity={1}
                  onPress={() => handleSelectPlace(option.label)}>
                  <Text style={[styles.optionText, writeData.matchPlace === option.label && styles.selectedOptionText]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default TicketPage

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    position: 'relative',
  },
  backImage: {
    width: 16,
    height: 28,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F2EE',
    paddingHorizontal: 20,
    position: 'relative',
  },
  stepHeaderBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25.2,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  tabMenuContainer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 24,
  },
  tabMenuBox: {
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingBottom: 32,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 28,
  },
  scoreInput: {
    width: 55,
    height: 55,
    fontSize: 24,
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#D0CEC7',
    borderRadius: 5,
  },
  ellipseBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 10,
    gap: 6,
  },
  teamNmBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  teamNmText: {
    width: 55,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
  imageUploadBox: {
    width: '100%',
    aspectRatio: 307 / 270,
    backgroundColor: '#F3F2EE',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0CEC7',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#95938B',
    lineHeight: 19.6,
    fontWeight: '500',
    marginTop: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
    lineHeight: 19.6,
    color: '#171716',
  },
  textInput: {
    height: 45,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderColor: '#D0CEC7',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
  },
  textThoughtsInput: {
    height: 125,
    padding: 12,
    borderColor: '#D0CEC7',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
  },
  footerButtonBox: {
    width: '100%',
    marginTop: 16,
  },
  footerButton: {
    backgroundColor: '#E4E2DC',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    color: '#77756C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlyMeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    gap: 4,
  },
  todayImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  teamModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    height: 394,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },

  placeModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  optionButton: {
    height: 48,
    borderWidth: 1,
    maxWidth: '48%',
    minWidth: '48%',
    borderColor: '#D0CEC7',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 22,
    gap: 8,
  },
  placeOptionButton: {
    maxWidth: '48%',
    minWidth: '48%',
    height: 48,
    borderWidth: 1,
    borderColor: '#D0CEC7',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: '#1E5EF4',
    backgroundColor: '#1E5EF41A',
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 14,
    color: '#171716',
    fontWeight: 500,
    lineHeight: 19.6,
  },
  logoImg: {
    width: 24,
    height: 24,
  },
  tabMenu: {
    backgroundColor: '#fff',
    width: '100%',
    height: 59,
    borderTopLeftRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#E4E2DC',
    borderTopRightRadius: 10,
  },
  selectBox: {
    height: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBoxText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.09,
    color: '#171716',
  },
  selectModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 54,
    height: '100%',
    gap: 8,
  },
  dropDownImg: {
    marginBottom: 2,
  },
  writeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 13,
    marginTop: 40,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#1E5EF4',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D0CEC7',
    paddingVertical: 12,
    borderRadius: 10,
  },
  cancelText: {
    color: '#171716',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4,
  },
  selectedOptionText: {
    color: '#1E5EF4',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19.6,
  },
  selectedWriteOptionText: {
    color: '#1E5EF4',
    fontWeight: '700',
  },
  addImage: {
    width: 34,
    height: 34,
  },
  activeButton: {
    backgroundColor: '#1E5EF4',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  disabledButton: {
    backgroundColor: '#D0CEC7',
  },
  disabledButtonText: {
    color: '#171716',
  },
})
