import {useRouter} from 'expo-router'
import {useState} from 'react'
import {Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, TextInput, Modal, Keyboard} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import useTicket from '@/hooks/match/useTicket'

interface IWriteDataInterface {
  todayImg: string
  matchTeam: string
  matchPlace: string
  matchPlayer: string
  todayFood: string
  todayThoughts: string
  onlyMeCheck: boolean
  todayScore: {[key: string]: string}
}

const tabMenuConfig = [
  {
    id: 0,
    value: 'live',
    title: '직관',
  },
  {
    id: 1,
    value: 'home',
    title: '집관',
  },
]

const inputConfig = [
  {
    id: 0,
    value: 'matchTeam',
    title: '오늘의 상대구단',
    placeholder: '상대구단을 기록해주세요',
  },
  {
    id: 1,
    value: 'matchPlace',
    title: '오늘의 직관장소',
    placeholder: '집관장소를 기록해주세요',
  },
  {
    id: 2,
    value: 'matchPlayer',
    title: '오늘의 선발선수',
    placeholder: '선수 이름을 기록해주세요',
  },
  {
    id: 3,
    value: 'todayFood',
    title: '오늘의 직관푸드',
    placeholder: '오늘 먹은 직관푸드를 기록해주세요',
  },
  {
    id: 4,
    value: 'todayThoughts',
    title: '오늘의 소감',
    placeholder: '오늘의 소감을 기록해주세요',
  },
]

const teamOptions = [
  {
    label: 'LG 트윈스',
    value: 'LG',
    teamLogo: require('@/assets/team_logo/LG.png'),
  },
  {
    label: 'KT 위즈',
    value: 'KT',
    teamLogo: require('@/assets/team_logo/KT.png'),
  },
  {
    label: 'SSG 랜더스',
    value: 'SSG',
    teamLogo: require('@/assets/team_logo/SSG.png'),
  },
  {
    label: 'NC 다이노스',
    value: 'NC',
    teamLogo: require('@/assets/team_logo/NC.png'),
  },
  {
    label: '두산 베어스',
    value: '두산',
    teamLogo: require('@/assets/team_logo/DOOSAN.png'),
  },
  {
    label: 'KIA 타이거즈',
    value: 'KIA',
    teamLogo: require('@/assets/team_logo/KIA.png'),
  },
  {
    label: '롯데 자이언츠',
    value: '롯데',
    teamLogo: require('@/assets/team_logo/LOTTE.png'),
  },
  {
    label: '삼성 라이온즈',
    value: '삼성',
    teamLogo: require('@/assets/team_logo/SAMSUNG.png'),
  },
  {
    label: '한화 이글스',
    value: '한화',
    teamLogo: require('@/assets/team_logo/HANWHA.png'),
  },
  {
    label: '키움 히어로즈',
    value: '키움',
    teamLogo: require('@/assets/team_logo/KIWOOM.png'),
  },
]

const placeOption = [
  {label: '대구 삼성 라이온즈 파크', value: '대구 삼성 라이온즈 파크'},
  {label: '사직 야구장', value: '사직 야구장'},
  {label: '서울 종합운동장 야구장', value: '서울 종합운동장 야구장'},
  {label: '고척 스카이돔', value: '고척 스카이돔'},
  {label: '인천 SSG랜더스필드', value: '인천 SSG랜더스필드'},
  {label: '수원 KT위즈 파크', value: '수원 KT위즈 파크'},
  {label: '대전 한화생명 이글스파크', value: '대전 한화생명 이글스파크'},
  {label: '창원 NC파크', value: '창원 NC파크'},
]

const TicketPage = () => {
  const ticket = useTicket()
  console.log(ticket)

  const [writeData, setWriteData] = useState<IWriteDataInterface>({
    todayScore: {SSG: '', 한화: ''},
    todayImg: '',
    matchTeam: '',
    matchPlace: '',
    matchPlayer: '',
    todayFood: '',
    todayThoughts: '',
    onlyMeCheck: false,
  })
  const [tabMenu, setTabMenu] = useState('직관')
  const [selectedTabMenu, setSelectedTabMenu] = useState('직관')
  const [teamModalVisible, setTeamModalVisible] = useState(false)
  const [placeModalVisible, setPlaceModalVisible] = useState(false)
  const [tabMenuModalVisible, setTabMenuModalVisible] = useState(false)

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

  const handleSelectTeam = (team: string) => {
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
  const handleSelectTabMenuTemp = (tabMenu: string) => {
    setSelectedTabMenu(tabMenu)
  }

  const handleConfirmTabMenu = () => {
    setTabMenu(selectedTabMenu)
    setTabMenuModalVisible(false)
  }

  const uploadPhoto = async () => {
    /** 갤러리 접근 권한 요청 */
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.status !== 'granted') {
      return
    }

    /** 갤러리에서 이미지 선택 */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setWriteData(prevData => ({
        ...prevData,
        todayImg: result.assets[0].uri,
      }))
    } else if (result.canceled) {
      setWriteData(prevData => ({
        ...prevData,
        todayImg: '',
      }))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stepHeaderBox}>
        <TouchableOpacity style={styles.backButton}>
          <Image source={require('@/assets/icons/back.png')} />
        </TouchableOpacity>
        <Text style={styles.dateText}>7월 13일 토요일</Text>
      </View>
      <ScrollView style={styles.tabMenuContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.tabMenu}>
          <View style={styles.selectBox}>
            <TouchableOpacity
              style={styles.selectModalButton}
              activeOpacity={1}
              onPress={() => setTabMenuModalVisible(true)}>
              <Text style={styles.selectBoxText}>{tabMenu}</Text>
              <Image
                source={require('@/assets/icons/bottomArrow.png')}
                resizeMode="contain"
                style={styles.dropDownImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabMenuBox}>
          <View style={styles.scoreBox}>
            <TextInput
              style={styles.scoreInput}
              placeholder="0"
              placeholderTextColor="#ddd"
              keyboardType="number-pad"
              onChangeText={value => handleScoreChange('SSG', value)}
            />
            <View style={styles.ellipseBox}>
              <Image
                source={require('@/assets/icons/ellipse.png')}
                resizeMode="contain"
                style={{width: 5, height: 5}}
              />
              <Image
                source={require('@/assets/icons/ellipse.png')}
                resizeMode="contain"
                style={{width: 5, height: 5}}
              />
            </View>
            <TextInput
              style={styles.scoreInput}
              placeholder="0"
              placeholderTextColor="#ddd"
              keyboardType="number-pad"
              onChangeText={value => handleScoreChange('한화', value)}
            />
          </View>
          <View style={styles.teamNmBox}>
            <Text style={styles.teamNmText}>SSG</Text>
            <Text style={styles.teamNmText}>한화</Text>
          </View>
          <TouchableOpacity style={styles.imageUploadBox} onPress={uploadPhoto} activeOpacity={1}>
            {writeData.todayImg ? (
              <Image source={{uri: writeData.todayImg}} style={styles.todayImg} />
            ) : (
              <>
                <Image source={require('@/assets/icons/add_image.png')} />
                <Text style={styles.uploadText}>오늘의 사진을 넣어주세요</Text>
              </>
            )}
          </TouchableOpacity>
          {inputConfig.map(item => (
            <View key={item.id} style={styles.inputContainer}>
              <View style={styles.inputTitleBox}>
                <Text style={styles.label}>{item.title}</Text>
                {item.title === '오늘의 소감' && (
                  <View style={styles.onlyMeBox}>
                    <TouchableOpacity
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
                      />
                    </TouchableOpacity>
                    <Text>나만보기</Text>
                  </View>
                )}
              </View>
              <TextInput
                style={item.title === '오늘의 소감' ? styles.textThoughtsInput : styles.textInput}
                placeholder={item.placeholder}
                value={
                  ['matchTeam', 'matchPlace', 'matchPlayer', 'todayFood', 'todayThoughts'].includes(item.value)
                    ? (writeData[item.value as keyof IWriteDataInterface] as string)
                    : ''
                }
                onFocus={() => {
                  if (item.value === 'matchTeam') {
                    Keyboard.dismiss()
                    setTeamModalVisible(true)
                  }
                  if (item.value === 'matchPlace') {
                    Keyboard.dismiss()
                    setPlaceModalVisible(true)
                  }
                }}
                placeholderTextColor="#D0CEC7"
                onChangeText={text => handleInputChange(item.value as keyof IWriteDataInterface, text)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footerButtonBox}>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.navigate('/write/todayTicketCard')}>
          <Text style={styles.footerButtonText}>오늘의 티켓 발급하기</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="none" transparent={true} visible={teamModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.teamModalContent}>
            <Text style={styles.modalTitle}>오늘의 상대구단</Text>
            <View style={styles.optionsContainer}>
              {teamOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.optionButton, writeData.matchTeam === option.label && styles.selectedOption]}
                  activeOpacity={1}
                  onPress={() => handleSelectTeam(option.label)}>
                  <Image source={option.teamLogo} style={styles.logoImg} resizeMode="contain" />
                  <Text style={[styles.optionText, writeData.matchTeam === option.label && styles.selectedOptionText]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="none" transparent={true} visible={placeModalVisible}>
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
      <Modal animationType="none" transparent={true} visible={tabMenuModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.writePlaceModalContent}>
            <Text style={styles.modalTitle}>기록하고 싶은 장소를 선택해주세요</Text>
            <View style={styles.writePlaceOptionsContainer}>
              {tabMenuConfig.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.writePlaceOptionButton, selectedTabMenu === option.title && styles.selectedOption]}
                  activeOpacity={1}
                  onPress={() => handleSelectTabMenuTemp(option.title)}>
                  <Text style={[styles.optionText, selectedTabMenu === option.title && styles.selectedWriteOptionText]}>
                    {option.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.writeButtonBox}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setTabMenuModalVisible(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTabMenu}>
                <Text style={styles.confirmText}>완료</Text>
              </TouchableOpacity>
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
    marginTop: 31,
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
    marginBottom: 28,
    marginTop: 20,
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
    paddingHorizontal: 24,
    borderColor: '#D0CEC7',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
  },
  footerButtonBox: {
    width: '100%',
    paddingHorizontal: 24,
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
  writePlaceModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    height: 285,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  placeModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    height: 334,
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
    flexWrap: 'wrap',
    gap: 12,
  },
  writePlaceOptionsContainer: {
    marginTop: 24,
    flexDirection: 'column',
    gap: 16,
  },
  optionButton: {
    width: 166,
    height: 48,
    borderWidth: 1,
    borderColor: '#D0CEC7',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 22,
    gap: 8,
  },
  writePlaceOptionButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D0CEC7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 13,
    gap: 8,
  },
  placeOptionButton: {
    width: 166,
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
    fontSize: 16,
    color: '#333',
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
})
