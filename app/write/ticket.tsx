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
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
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
import useTicketDetail from '@/hooks/match/useTicketDetail'
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
  {label: '사직 야구장', value: '사직 야구장'},
  {label: '잠실 종합운동장 야구장', value: '잠실 종합운동장 야구장'},
  {label: '고척 스카이돔', value: '고척 스카이돔'},
  {label: '인천 SSG랜더스필드', value: '인천 SSG랜더스필드'},
  {label: '수원 KT위즈 파크', value: '수원 KT위즈 파크'},
  {label: '대전 한화생명 이글스파크', value: '대전 한화생명 이글스파크'},
  {label: '창원 NC파크', value: '창원 NC파크'},
  {label: '광주 기아챔피언스 필드', value: '광주 기아챔피언스 필드'},
]

const TicketPage = () => {
  const {moveToWriteTicket, registerTicket, ...writeStore} = useWriteTicket()
  const {profile} = useProfile()
  const {findTeamById, teams} = useTeam()

  const {id, date: ticketDate} = useLocalSearchParams()

  const {
    ticketDetail, //
  } = useTicketDetail(Number(id) || (ticketDate as string))

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

  useEffect(() => {
    if (ticketDetail) {
      const opponentTeamId =
        Number(ticketDetail.hometeam_id) === profile.my_team?.id ? ticketDetail.awayteam_id : ticketDetail.hometeam_id

      const opponentTeam = findTeamById(Number(opponentTeamId))

      setWriteData({
        todayScore: {
          our: String(ticketDetail.score_our),
          opponent: String(ticketDetail.score_opponent),
        },
        todayImg: undefined,
        matchTeam: {
          id: Number(opponentTeamId),
          name: opponentTeam?.name || '',
          logo_url: opponentTeam?.logo || '',
        },
        matchPlace: ticketDetail.gip_place,
        matchPlayer: ticketDetail.starting_pitchers,
        todayFood: ticketDetail.food,
        todayThoughts: ticketDetail.memo,
        onlyMeCheck: false,
      })
    }
  }, [ticketDetail])

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

  const onSubmit = async () => {
    const formData = new FormData()

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

    console.log('📏 리사이징된 이미지:', resizedImage.uri)

    formData.append('image', {
      uri: resizedImage.uri, // 리사이징된 이미지 URI 사용
      type: writeData.todayImg?.type, // 원본 이미지의 MIME 타입 유지
      name: Platform.OS === 'android' ? writeData.todayImg?.uri : writeData.todayImg?.uri.replace('file://', ''),
    } as any)

    console.log(writeData.todayImg?.uri.replace('file://', ''))

    formData.append('date', dayjs(writeStore.selectedDate).format('YYYY-MM-DD'))
    console.log('date', dayjs(writeStore.selectedDate).format('YYYY-MM-DD'))
    formData.append('game', String(writeStore.selectedMatch?.id || ''))
    console.log('game', String(writeStore.selectedMatch?.id || '676'))
    formData.append('result', writeStore.selectedMatchResult === '경기 취소' ? '취소' : writeStore.selectedMatchResult)
    console.log('result', writeStore.selectedMatchResult)
    formData.append('weather', writeStore.selectedWeather)
    console.log('weather', writeStore.selectedWeather)
    formData.append('is_ballpark', JSON.stringify(tabMenu === '직관'))
    console.log('is_ballpark', JSON.stringify(tabMenu === '직관'))

    formData.append('score_our', writeData.todayScore.our)
    console.log('score_our', writeData.todayScore.our)
    formData.append('score_opponent', writeData.todayScore.opponent)
    console.log('score_opponent', writeData.todayScore.opponent)

    // 선발선수
    formData.append('starting_pitchers', writeData.matchPlayer)
    console.log('starting_pitchers', writeData.matchPlayer)

    // 경기구단
    formData.append('gip_place', ballparkInfo?.name || writeData.matchPlace)
    console.log('gip_place', ballparkInfo?.name || writeData.matchPlace)

    // 직관푸드
    formData.append('food', writeData.todayFood)
    console.log('food', writeData.todayFood)

    // 오늘의 소감
    formData.append('memo', writeData.todayThoughts)
    console.log('memo', writeData.todayThoughts)
    formData.append('is_homeballpark', JSON.stringify(tabMenu === '집관'))
    console.log('is_homeballpark', JSON.stringify(tabMenu === '집관'))

    //나만보기
    formData.append('only_me', JSON.stringify(writeData.onlyMeCheck))
    console.log('only_me', JSON.stringify(writeData.onlyMeCheck))
    formData.append('is_double', JSON.stringify(isDirectWrite))
    console.log('is_double', JSON.stringify(isDirectWrite))

    // hometeam_id
    formData.append('hometeam_id', String(writeStore.selectedMatch?.team_home_info.id || profile.my_team?.id))
    console.log('hometeam_id', String(writeStore.selectedMatch?.team_home_info.id || profile.my_team?.id))
    formData.append('awayteam_id', String(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id))
    console.log('awayteam_id', String(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id))
    formData.append('direct_yn', JSON.stringify(isDirectWrite))
    console.log('direct_yn', JSON.stringify(isDirectWrite))
    formData.append('is_cheer', 'false')

    registerTicket(formData)
  }

  const uploadPhoto = async () => {
    /** 갤러리 접근 권한 요청 */
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    /** 갤러리에서 이미지 선택 */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setWriteData(prevData => ({
        ...prevData,
        todayImg: result.assets[0],
      }))
    } else if (result.canceled) {
      setWriteData(prevData => ({
        ...prevData,
        todayImg: undefined,
      }))
    }
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
              <LocationTypeSelector value={tabMenu} onChange={setTabMenu} />
            </View>
            <View style={styles.tabMenuBox}>
              <View>
                <View style={styles.scoreBox}>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    placeholder="0"
                    placeholderTextColor="#ddd"
                    keyboardType="number-pad"
                    onChangeText={value => handleScoreChange('our', value)}
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
                    keyboardType="number-pad"
                    onChangeText={value => handleScoreChange('opponent', value)}
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
                  </>
                )}
              </TouchableOpacity>

              {!isDirectWrite ? (
                <Input
                  label="오늘의 상대구단"
                  value={opponentTeam?.name} //
                  editable={false}
                />
              ) : (
                <SelectBox
                  label={'오늘의 상대구단'}
                  placeholder={'상대구단을 선택해주세요'}
                  value={writeData.matchTeam?.name}
                  onPress={() => setTeamModalVisible(true)}
                />
              )}

              {!isDirectWrite ? (
                <Input
                  label="오늘의 경기구장"
                  value={ballparkInfo?.name} //
                  editable={false}
                />
              ) : (
                <SelectBox
                  label={'오늘의 경기구장'}
                  placeholder={'경기구장을 선택해주세요'}
                  value={writeData.matchPlace}
                  onPress={() => setPlaceModalVisible(true)}
                />
              )}

              <Input
                label="오늘의 선발선수"
                value={writeData.matchPlayer} //
                onChangeText={value => handleInputChange('matchPlayer', value)}
                placeholder="선수 이름을 기록해주세요"
              />

              <Input
                label="오늘의 직관푸드"
                value={writeData.todayFood} //
                onChangeText={value => handleInputChange('todayFood', value)}
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
                style={{height: 125, textAlign: 'left'}}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footerButtonBox}>
        <TouchableOpacity style={[styles.footerButton, styles.activeButton]} onPress={onSubmit}>
          <Text style={[styles.footerButtonText, styles.activeButtonText]}>오늘의 티켓 발급하기</Text>
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
    height: 220,
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
    // paddingHorizontal: 24,
    paddingBottom: 32,
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
