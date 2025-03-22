import {useLocalSearchParams, useRouter} from 'expo-router'
import {useEffect, useState} from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
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
import useTicketDetail from '@/hooks/match/useTicketDetail'
import LottieView from 'lottie-react-native'

interface IWriteDataInterface {
  todayImg: ImagePicker.ImagePickerAsset | undefined | string
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

interface ITicketEditData {
  homeTeam: {
    score: number
    id: number
  }
  awayTeam: {
    score: number
    id: number
  }
  todayImg: ImagePicker.ImagePickerAsset | undefined | string
  place: string
  placeType: string
  player: string
  food: string
  memo: string
  onlyMe: boolean
  game: number
  date: string
  weather: string
  result: string
  direct_yn: boolean
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

const EditTicketPage = () => {
  const {id} = useLocalSearchParams()

  const {profile} = useProfile()
  const {ticketDetail, updateTicket, isUpdating} = useTicketDetail(Number(id), Number(profile?.id))

  const [writeData, setWriteData] = useState<ITicketEditData>({
    homeTeam: {
      score: 0,
      id: 0,
    },
    awayTeam: {
      score: 0,
      id: 0,
    },
    todayImg: '',
    place: '',
    placeType: '집관',
    player: '',
    food: '',
    memo: '',
    onlyMe: false,
    direct_yn: false,
    game: 0,
    date: '',
    weather: '',
    result: '',
  })

  useEffect(() => {
    if (ticketDetail) {
      setWriteData({
        homeTeam: {
          score: Number(ticketDetail.score_our),
          id: Number(ticketDetail.hometeam_id),
        },
        awayTeam: {
          score: Number(ticketDetail.score_opponent),
          id: Number(ticketDetail.awayteam_id),
        },
        todayImg: ticketDetail?.image || '',
        place: ticketDetail.gip_place,
        placeType: ticketDetail?.is_ballpark ? '직관' : '집관',
        player: ticketDetail.starting_pitchers,
        food: ticketDetail.food,
        memo: ticketDetail.memo,
        onlyMe: ticketDetail.only_me,
        game: ticketDetail.game,
        date: ticketDetail.date,
        weather: ticketDetail.weather,
        result: ticketDetail.result,
      } as ITicketEditData)
    }
  }, [ticketDetail])

  const {findTeamById, teams} = useTeam()

  const title = (() => {
    const date = dayjs(ticketDetail?.date)
    return `${date.format(`M월 D일 ${DAYS_OF_WEEK[date.day()]}요일`)}`
  })()

  const teamAwayInfo = findTeamById(writeData?.awayTeam.id)
  const teamHomeInfo = findTeamById(writeData?.homeTeam.id)

  const opponentTeam = findTeamById(
    writeData?.awayTeam.id === profile.my_team?.id ? writeData?.homeTeam.id : writeData?.awayTeam.id,
  )?.name

  // 직접입력 여부
  const isDirectWrite = !ticketDetail?.game

  // 마이팀이 포함되어 있는지 여부
  const isCheer = writeData.awayTeam.id === profile.my_team?.id || writeData.homeTeam.id === profile.my_team?.id

  const [teamModalVisible, setTeamModalVisible] = useState(false)
  const [placeModalVisible, setPlaceModalVisible] = useState(false)

  const router = useRouter()

  const onSubmit = async () => {
    if (isUpdating) return

    const formData = new FormData()

    if (typeof writeData?.todayImg === 'string') {
      formData.append('image', writeData?.todayImg)
    } else {
      const image = writeData?.todayImg

      const resizedImage = await ImageResizer.createResizedImage(
        image?.uri || '', // 원본 이미지
        800, // 리사이즈할 가로 크기 (필요한 크기로 변경)
        800, // 리사이즈할 세로 크기
        'PNG', // 출력 포맷 ('JPEG' 또는 'PNG')
        100, // 품질 (0 ~ 100)
        0, // 회전 (0 = 그대로)
        undefined, // outputPath (설정하지 않으면 기본 캐시에 저장됨)
        false, // 메타데이터 유지 여부
      )
      console.log('📏 리사이징된 이미지:', resizedImage.uri)

      formData.append('image', {
        uri: resizedImage.uri, // 리사이징된 이미지 URI 사용
        type: image?.type, // 원본 이미지의 MIME 타입 유지
        name: Platform.OS === 'android' ? image?.uri : image?.uri.replace('file://', ''),
      } as any)
    }

    formData.append('id', String(ticketDetail?.id))
    console.log('id', String(ticketDetail?.id))
    formData.append('result', writeData?.result === '경기 취소' ? '취소' : writeData?.result || '')
    console.log('result', writeData?.result === '경기 취소' ? '취소' : writeData?.result || '')
    formData.append('weather', writeData?.weather || '')
    console.log('weather', writeData?.weather || '')
    formData.append('is_ballpark', JSON.stringify(writeData?.placeType === '직관'))
    console.log('is_ballpark', JSON.stringify(writeData?.placeType === '직관'))
    formData.append('score_our', String(writeData?.homeTeam.score))
    console.log('score_our', String(writeData?.homeTeam.score))
    formData.append('score_opponent', String(writeData?.awayTeam.score))
    console.log('score_opponent', String(writeData?.awayTeam.score))
    // 선발선수
    formData.append('starting_pitchers', writeData?.player || '')
    console.log('starting_pitchers', writeData?.player || '')
    // 관람장소
    formData.append('gip_place', String(writeData?.place || ''))
    console.log('gip_place', String(writeData?.place || ''))

    // 직관푸드
    formData.append('food', writeData?.food || '')
    console.log('food', writeData?.food || '')

    // 오늘의 소감
    formData.append('memo', writeData?.memo || '')
    console.log('memo', writeData?.memo || '')

    formData.append('is_homeballpark', JSON.stringify(writeData?.placeType === '직관'))
    console.log('is_homeballpark', JSON.stringify(writeData?.placeType === '직관'))

    //나만보기
    formData.append('only_me', JSON.stringify(writeData?.onlyMe))
    console.log('only_me', JSON.stringify(writeData?.onlyMe))

    formData.append('direct_yn', JSON.stringify(isDirectWrite))
    console.log('direct_yn', JSON.stringify(isDirectWrite))

    // hometeam_id
    formData.append('hometeam_id', String(writeData?.homeTeam.id))
    console.log('hometeam_id', String(writeData?.homeTeam.id))
    formData.append('awayteam_id', String(writeData?.awayTeam.id))
    console.log('awayteam_id', String(writeData?.awayTeam.id))

    formData.append('is_cheer', JSON.stringify(isCheer))
    console.log('is_cheer', JSON.stringify(isCheer))

    formData.append('is_double', JSON.stringify(isDirectWrite))
    console.log('is_double', JSON.stringify(isDirectWrite))

    updateTicket(formData).finally(() => {
      router.back()
    })
  }

  const uploadPhoto = async () => {
    /** 갤러리 접근 권한 요청 */
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    /** 갤러리에서 이미지 선택 */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [307, 220],
      selectionLimit: 1,
    } as ImagePicker.ImagePickerOptions)

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onChangeValue('todayImg', result.assets[0])
    }
  }

  const onChangeValue = (key: keyof ITicketEditData, value: ITicketEditData[keyof ITicketEditData]) => {
    setWriteData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stepHeaderBox}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.dateText}>{title}</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tabMenuContainer}>
            <View style={styles.tabMenu}>
              {/* 직관, 집관 선택 컴포넌트 */}
              <LocationTypeSelector
                value={writeData.placeType} //
                onChange={value => onChangeValue('placeType', value)}
              />
            </View>
            <View style={styles.tabMenuBox}>
              <View>
                <View style={styles.scoreBox}>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    placeholder="0"
                    value={writeData.homeTeam.score.toString()}
                    placeholderTextColor="#ddd"
                    keyboardType="number-pad"
                    onChangeText={value =>
                      onChangeValue('homeTeam', {
                        ...writeData.homeTeam,
                        score: Number(value.replaceAll(/\D/g, '')),
                      })
                    }
                  />
                  <View style={styles.ellipseBox}>
                    <Ellipse />
                    <Ellipse />
                  </View>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    value={writeData.awayTeam.score.toString()}
                    placeholder="0"
                    placeholderTextColor="#ddd"
                    keyboardType="number-pad"
                    onChangeText={value =>
                      onChangeValue('awayTeam', {
                        ...writeData.awayTeam,
                        score: Number(value.replaceAll(/\D/g, '')),
                      })
                    }
                  />
                </View>
                <View style={styles.teamNmBox}>
                  <Text style={styles.teamNmText}>{teamHomeInfo?.short_name}</Text>
                  <Text style={styles.teamNmText}>{teamAwayInfo?.short_name}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.imageUploadBox} onPress={uploadPhoto} activeOpacity={1}>
                {writeData.todayImg ? (
                  <Image
                    source={{uri: typeof writeData.todayImg === 'string' ? writeData.todayImg : writeData.todayImg.uri}}
                    style={styles.todayImg}
                  />
                ) : (
                  <>
                    <Image source={require('@/assets/icons/add_image.png')} style={styles.addImage} />
                    <Text style={styles.uploadText}>오늘의 사진을 넣어주세요</Text>
                  </>
                )}
              </TouchableOpacity>

              {(() => {
                if (isDirectWrite) {
                  return (
                    <SelectBox
                      label={'오늘의 상대구단'}
                      placeholder={'상대구단을 선택해주세요'}
                      value={opponentTeam}
                      onPress={() => setTeamModalVisible(true)}
                    />
                  )
                }

                if (!isCheer) return null
                return (
                  <Input
                    label="오늘의 상대구단"
                    value={opponentTeam} //
                    editable={false}
                  />
                )
              })()}

              {writeData.placeType === '집관' ? (
                <Input
                  label="오늘의 집관장소"
                  value={writeData?.place}
                  onChangeText={value => onChangeValue('place', value)}
                  placeholder="집관 장소를 기록해주세요"
                />
              ) : (
                <>
                  {!isDirectWrite ? (
                    <Input
                      label="오늘의 경기구장"
                      value={ticketDetail.gip_place} //
                      editable={false}
                    />
                  ) : (
                    <SelectBox
                      label={'오늘의 경기구장'}
                      placeholder={'경기구장을 선택해주세요'}
                      value={writeData?.place}
                      onPress={() => setPlaceModalVisible(true)}
                    />
                  )}
                </>
              )}

              <Input
                label="오늘의 선발선수"
                value={writeData?.player} //
                onChangeText={value => onChangeValue('player', value)}
                placeholder="선수 이름을 기록해주세요"
              />

              <Input
                label="오늘의 직관푸드"
                value={writeData?.food} //
                onChangeText={value => onChangeValue('food', value)}
                placeholder="오늘 먹은 직관푸드를 기록해주세요"
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
                          onlyMe: !prev?.onlyMe,
                        }))
                      }
                      activeOpacity={1}>
                      <Image
                        source={
                          writeData?.onlyMe
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
                value={writeData?.memo} //
                onChangeText={value => onChangeValue('memo', value)}
                placeholder="오늘의 소감을 기록해주세요"
                multiline={true}
                numberOfLines={6}
                style={{height: 125, textAlign: 'left'}}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footerButtonBox, {paddingBottom: 16}]}>
        <TouchableOpacity style={[styles.footerButton, styles.activeButton]} onPress={onSubmit}>
          {isUpdating ? (
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
                  style={[styles.optionButton, opponentTeam === team.name && styles.selectedOption]}
                  activeOpacity={1}
                  onPress={() =>
                    onChangeValue('awayTeam', {
                      ...writeData.awayTeam,
                      id: team.id,
                    })
                  }>
                  <Image source={team.logo} style={styles.logoImg} resizeMode="contain" />
                  <Text style={[styles.optionText, opponentTeam === team.name && styles.selectedOptionText]}>
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
                  style={[styles.placeOptionButton, writeData?.place === option.label && styles.selectedOption]}
                  activeOpacity={1}
                  onPress={() => onChangeValue('place', option.value)}>
                  <Text style={[styles.optionText, writeData?.place === option.label && styles.selectedOptionText]}>
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

export default EditTicketPage

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
    aspectRatio: 307 / 220,
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
    color: '#999',
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
    marginTop: 32,
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
    minWidth: '48%',
    borderColor: '#D0CEC7',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 22,
    gap: 8,
  },
  placeOptionButton: {
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
})

/**
//  (NOBRIDGE) LOG  starting_pitchers 종현
(NOBRIDGE) LOG  is_double false
(NOBRIDGE) LOG  score_opponent 2
(NOBRIDGE) LOG  only_me true
(NOBRIDGE) LOG  awayteam_id 2
(NOBRIDGE) LOG  weather 흐림
(NOBRIDGE) LOG  gip_place 잠실야구장
(NOBRIDGE) LOG  is_cheer false
(NOBRIDGE) LOG  memo 히히
*  (NOBRIDGE) LOG  id 49
*  (NOBRIDGE) LOG  image
(NOBRIDGE) LOG  result 승리
(NOBRIDGE) LOG  is_homeballpark true
(NOBRIDGE) LOG  food 자몽
(NOBRIDGE) LOG  hometeam_id 4
(NOBRIDGE) LOG  is_ballpark true
(NOBRIDGE) LOG  score_our 1

* 
 (NOBRIDGE) LOG  direct_yn false
 (NOBRIDGE) LOG  direct_yn false



* 		starting_pitchers: 오타니
* 		is_double: true
* 		score_opponent: 2
* 		only_me: true
* 		awayteam_id: 9
* 		weather: 맑음
* 		gip_place: 광주-기아 챔피언스 필드
* 		is_cheer: true
* 		memo: 앳호
* 		id: 57
* 		image: (binary)
* 		result: 취소
* 		is_homeballpark: true
* 		food: 치킨 콜라 샌드위치
* 		hometeam_id: 1
* 		is_ballpark: true
* 		score_our: 2

 * 
 */
