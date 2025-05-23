import Header from '@/components/common/Header'
import Progress from '@/components/common/Progress'
import QuestionBox from '@/components/home/QuestionBox'
import MatchTeamBox from '@/components/MatchTeamBox'
import useMatch from '@/hooks/match/useMatch'
import useTeam from '@/hooks/match/useTeam'
import useWriteTicket from '@/hooks/match/useWriteTicket'
import useProfile from '@/hooks/my/useProfile'
import {useLocalSearchParams, useRouter} from 'expo-router'
import React, {useEffect, useMemo, useState} from 'react'
import {StyleSheet, ScrollView, Image, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'

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

const DailyLogWriteScreen = () => {
  /** 스토어에서 가져온 상태와 set 함수 */
  const {
    selectedMatch,
    setSelectedMatch,
    selectedDate,
    setSelectedDate,
    selectedMatchResult,
    setSelectedMatchResult,
    selectedWeather,
    setSelectedWeather,
    selectedPlace,
    setSelectedPlace,
  } = useWriteTicket()
  const insets = useSafeAreaInsets()

  const router = useRouter()
  const params = useLocalSearchParams()

  /** 현재 단계를 나타내는 상태 */
  const [currentStep, setCurrentStep] = useState(Number(params?.step) || 1)

  /** 자동 다음 버튼 클릭 여부 */
  const [autoSkipToNext, setAutoSkipToNext] = useState<Record<number, boolean>>({})
  const skipToNextStep = (currentStep: number) => {
    if (!autoSkipToNext[currentStep]) {
      nextButtonClick()
      setAutoSkipToNext({...autoSkipToNext, [currentStep]: true})
    }
  }

  /** 경기 결과 이미지를 클릭하는 함수 */
  const onMatchResultClick = (pR: string) => {
    setSelectedMatchResult(pR)
    if (selectedWeather) skipToNextStep(currentStep)
  }

  /** 오늘의 날씨 이미지를 클릭하는 함수 */
  const onWeatherClick = (pW: string) => {
    setSelectedWeather(pW)
    if (selectedMatchResult) skipToNextStep(currentStep)
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
      router.dismiss()
      router.navigate('/write/ticket')
    }
  }

  const onClickDoubleHeaderMatch = () => {
    setCurrentStep(currentStep + 1)
    setSelectedMatch(null)
  }

  /** 이전 화살표 클릭 */
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.back()
    }
  }

  const {matchingList, isSuccess} = useMatch({selectedDate})
  const {profile} = useProfile()
  const {findTeamById} = useTeam()
  const myTeamName = findTeamById(profile.my_team?.id)?.short_name

  const date = params?.date

  useEffect(() => {
    if (date) setSelectedDate(new Date(date as string))
    if (params.matchId && matchingList)
      setSelectedMatch(matchingList?.find(match => match.id === Number(params.matchId))!)
  }, [date, isSuccess])

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{position: 'relative'}}>
        <Header
          leftButton={{
            content: <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />,
            onPress: goToPreviousStep,
          }}
        />
        <Progress current={currentStep} max={3} />
      </View>
      {currentStep === 1 && (
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>경기 일정을{'\n'}선택해주세요</Text>
          <View style={styles.matchListBox}>
            {matchingList.length > 0 ? (
              <>
                {matchingList.map((match, index) => (
                  <MatchTeamBox
                    key={index} //
                    isSelected={selectedMatch?.id === match.id}
                    match={match}
                    onClick={() => {
                      setSelectedMatch(match)
                      nextButtonClick()
                      // skipToNextStep(currentStep)
                    }}
                  />
                ))}
                <View style={styles.doubleHeaderBox}>
                  <TouchableOpacity onPress={onClickDoubleHeaderMatch} style={styles.doubleHeaderButton}>
                    <Text style={styles.doubleHeaderText}>더블헤더 작성하기</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.noMatchBox}>
                <Text style={[styles.noMatchText, {marginBottom: 24}]}>경기 일정이 없어요.</Text>
                <TouchableOpacity onPress={nextButtonClick} style={styles.doubleHeaderButton}>
                  <Text style={styles.doubleHeaderText}>직접 추가하기</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* <View style={styles.linkBox}>
            <Text>더블헤더 작성 시</Text>
            <TouchableOpacity onPress={() => router.navigate('/')} style={styles.linkTextButton}>
              <Text style={styles.linkText}> 직접 추가하기</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      )}
      {currentStep === 2 && (
        <View style={styles.viewContainer}>
          <QuestionBox
            type={'result'}
            title={'오늘의 경기 결과는 어땠나요?'}
            questionData={matchResult}
            onQuestionClick={onMatchResultClick}
            selectedQuestion={selectedMatchResult}
          />
          <QuestionBox
            type={'weather'}
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
          <TouchableOpacity onPress={() => onPlaceClick('직관')} activeOpacity={1}>
            <View style={selectedPlace === '직관' ? styles.selectButton : styles.defaultSelectButton}>
              <Image
                source={
                  selectedPlace === '직관'
                    ? require('@/assets/icons/round-check-active.png')
                    : require('@/assets/icons/round-check.png')
                }
                style={[{width: 24, height: 24}, selectedPlace === '직관' ? styles.roundCheck : {}]}
              />
              <Text style={styles.placeText}>직관</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPlaceClick('집관')} activeOpacity={1}>
            <View style={selectedPlace === '집관' ? styles.selectButton : styles.defaultSelectButton}>
              <Image
                source={
                  selectedPlace === '집관'
                    ? require('@/assets/icons/round-check-active.png')
                    : require('@/assets/icons/round-check.png')
                }
                style={[{width: 24, height: 24}, selectedPlace === '집관' ? styles.roundCheck : {}]}
              />
              <Text style={styles.placeText}>집관</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {currentStep === 3 || autoSkipToNext[currentStep] ? (
        <View style={[styles.buttonBox, {paddingBottom: 16 + insets.bottom}]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[{justifyContent: 'center'}, nextButtonEnabled ? styles.nextButton : styles.nextDisabledButton]}
            onPress={nextButtonClick}
            disabled={!nextButtonEnabled}>
            <Text style={nextButtonEnabled ? styles.buttonText : styles.buttonDisabledText}>
              {currentStep !== 3 ? '다음' : '오늘의 티켓 만들기'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

export default DailyLogWriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 33.6,
    color: '#171716',
  },
  matchListBox: {
    flexDirection: 'column',
    marginTop: 28,
    gap: 20,
    marginBottom: 40,
  },
  linkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 28,
    paddingBottom: 28,
    alignItems: 'center',
  },
  doubleHeaderButton: {
    backgroundColor: '#353430',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 99,
  },
  doubleHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 16 * 1.4,
  },
  nextButton: {
    backgroundColor: '#1E5EF4',
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    height: 50,
  },
  nextDisabledButton: {
    backgroundColor: '#E4E2DC',
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    height: 50,
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
    width: '100%',
    height: 4,
    backgroundColor: '#E4E2DC',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1E5EF4',
  },
  backImage: {
    width: 16,
    height: 28,
  },
  buttonBox: {
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fffcf3',
  },
  selectButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#353430',
    backgroundColor: 'white',
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
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 28,
  },
  roundCheck: {
    tintColor: '#000',
  },
  doubleHeaderBox: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  noMatchText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16 * 1.4,
    color: '#000000',
  },
  noMatchBox: {
    alignItems: 'center',
    borderColor: '#D0CEC7',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 40,
  },
})
