import QuestionBox from '@/components/home/QuestionBox'
import MatchTeamBox from '@/components/MatchTeamBox'
import {useDailyWriteStore} from '@/slice/dailyWriteSlice'
import {useRouter} from 'expo-router'
import {useEffect, useMemo, useState} from 'react'
import {StyleSheet, ScrollView, Image, Text, TouchableOpacity} from 'react-native'
import {View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

/** 경기 결과 목업데이터 */
const matchResult = [
  {
    questionImage: require('@/assets/icons/emo/win.png'),
    questionText: '승리',
  },
  {
    questionImage: require('@/assets/icons/emo/lose.png'),
    questionText: '패배',
  },
  {
    questionImage: require('@/assets/icons/emo/draw.png'),
    questionText: '무승부',
  },
  {
    questionImage: require('@/assets/icons/emo/cancel.png'),
    questionText: '경기 취소',
  },
]
/** 날씨 목업 데이터 */
const weatherResult = [
  {
    questionImage: require('@/assets/icons/emo/sunny.png'),
    questionText: '맑음',
  },
  {
    questionImage: require('@/assets/icons/emo/cloudy.png'),
    questionText: '흐림',
  },
  {
    questionImage: require('@/assets/icons/emo/rain.png'),
    questionText: '비',
  },
  {
    questionImage: require('@/assets/icons/emo/wind.png'),
    questionText: '바람',
  },
]

/** 경기 매치 팀 목업 데이터 */
const matchTeam = [
  {
    time: '14:00',
    homeTeamImg: require('@/assets/team_logo/SSG.png'),
    awayTeamImg: require('@/assets/team_logo/KT.png'),
    homeTeamNm: 'SSG',
    awayTeamNm: 'KT',
  },
  {
    time: '15:00',
    homeTeamImg: require('@/assets/team_logo/SSG.png'),
    awayTeamImg: require('@/assets/team_logo/KT.png'),
    homeTeamNm: 'SSG',
    awayTeamNm: 'KT',
  },
  {
    time: '16:00',
    homeTeamImg: require('@/assets/team_logo/SSG.png'),
    awayTeamImg: require('@/assets/team_logo/KT.png'),
    homeTeamNm: 'SSG',
    awayTeamNm: 'KT',
  },
]
const DailyLogWriteScreen = () => {
  /** 스토어에서 가져온 상태와 set 함수 */
  const {
    selectedMatch,
    setSelectedMatch,
    selectedMatchResult,
    setSelectedMatchResult,
    selectedWeather,
    setSelectedWeather,
    selectedPlace,
    setSelectedPlace,
    clearState,
  } = useDailyWriteStore()

  console.log('selectedMatch', selectedMatch)
  const router = useRouter()
  /** 현재 단계를 나타내는 상태 */
  const [currentStep, setCurrentStep] = useState(1)
  /** 경기 결과 이미지를 클릭하는 함수 */
  const onMatchResultClick = (pR: string) => {
    setSelectedMatchResult(pR)
  }

  /** 오늘의 날씨 이미지를 클릭하는 함수 */
  const onWeatherClick = (pW: string) => {
    setSelectedWeather(pW)
  }

  /** 경기를 본 장소를 클릭하는 함수 */
  const onPlaceClick = (pP: string) => {
    setSelectedPlace(pP)
  }
  /** 다음 버튼을 제어하는 변수 */
  const nextButtonEnabled = useMemo(() => {
    if (currentStep === 1) {
      return selectedMatch && Object.keys(selectedMatch).length > 0
    }
    if (currentStep === 2) {
      return !!selectedMatchResult && !!selectedWeather
    }
    if (currentStep === 3) {
      return !!selectedPlace
    }
  }, [currentStep, selectedMatch, selectedMatchResult, selectedWeather, selectedPlace])

  /** 다음 버튼 클릭 */
  const nextButtonClick = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      router.navigate('/write/ticket')
    }
  }

  /** 이전 화살표 클릭 */
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.navigate('/')
    }
  }

  useEffect(() => {
    return () => {
      clearState()
    }
  }, [])
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.stepHeaderBox}>
        <TouchableOpacity onPress={goToPreviousStep}>
          <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, {width: `${(currentStep / 3) * 100}%`}]} />
        </View>
      </View>
      {currentStep === 1 && (
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>오늘의 경기 일정을{'\n'}선택해주세요</Text>
          <View style={styles.matchListBox}>
            {matchTeam.map((ev, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedMatch(ev)} activeOpacity={1}>
                <MatchTeamBox
                  homeTeamImg={ev.homeTeamImg}
                  awayTeamImg={ev.awayTeamImg}
                  time={ev.time}
                  homeTeamNm={ev.homeTeamNm}
                  awayTeamNm={ev.awayTeamNm}
                  isSelected={selectedMatch?.time === ev.time}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.linkBox}>
            <Text>기록할 경기가 없다면?</Text>
            <TouchableOpacity onPress={() => router.navigate('/')} style={styles.linkTextButton}>
              <Text style={styles.linkText}>직접 추가하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {currentStep === 2 && (
        <View style={styles.viewContainer}>
          <QuestionBox
            title={'오늘의 경기 결과는 어땠나요?'}
            questionData={matchResult}
            onQuestionClick={onMatchResultClick}
            selectedQuestion={selectedMatchResult}
          />
          <QuestionBox
            title={'오늘의 날씨는 어땠나요?'}
            questionData={weatherResult}
            onQuestionClick={onWeatherClick}
            selectedQuestion={selectedWeather}
          />
        </View>
      )}
      {currentStep === 3 && (
        <View style={styles.viewContainer}>
          <Text style={styles.title}>
            어디서
            {'\n'}경기를 보셨나요?
          </Text>
          <TouchableOpacity onPress={() => onPlaceClick('base')} activeOpacity={1}>
            <View style={selectedPlace === 'base' ? styles.selectButton : styles.defaultSelectButton}>
              <Image
                source={require('@/assets/icons/round-check.png')}
                style={selectedPlace === 'base' ? styles.roundCheck : {}}
              />
              <Text style={styles.placeText}>직관</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPlaceClick('home')} activeOpacity={1}>
            <View style={selectedPlace === 'home' ? styles.selectButton : styles.defaultSelectButton}>
              <Image
                source={require('@/assets/icons/round-check.png')}
                style={selectedPlace === 'home' ? styles.roundCheck : {}}
              />
              <Text style={styles.placeText}>집관</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonBox}>
        <TouchableOpacity
          activeOpacity={1}
          style={nextButtonEnabled ? styles.nextButton : styles.nextDisabledButton}
          onPress={nextButtonClick}
          disabled={!nextButtonEnabled}>
          <Text style={nextButtonEnabled ? styles.buttonText : styles.buttonDisabledText}>
            {currentStep !== 3 ? '다음' : '오늘의 티켓 만들기'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default DailyLogWriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 45,
    backgroundColor: '#fffcf3',
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 45,
    gap: 20,
    flexDirection: 'column',
    backgroundColor: '#fffcf3',
  },
  stepHeaderBox: {
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 33.6,
    color: '#000',
  },
  matchListBox: {
    flexDirection: 'column',
    marginTop: 28,
    gap: 20,
  },
  linkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 28,
    paddingBottom: 28,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#1E5EF4',
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  nextDisabledButton: {
    backgroundColor: '#E4E2DC',
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDisabledText: {
    color: '#77756C',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  linkTextButton: {
    marginLeft: 1,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  progressBarContainer: {
    height: 4,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#E0E0E0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1E5EF4',
  },
  backImage: {
    marginLeft: 24,
  },
  buttonBox: {
    width: '100%',
    paddingHorizontal: 24,
  },
  selectButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#353430',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  defaultSelectButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F3F2EE',
    borderWidth: 1,
    borderColor: '#E4E2DC',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  placeText: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  },
  roundCheck: {
    tintColor: '#000',
  },
})
