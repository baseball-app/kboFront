import Header from '@/components/common/Header'
import Progress from '@/components/common/Progress'
import QuestionBox from '@/components/home/QuestionBox'
import useWriteTicket from '@/hooks/match/useWriteTicket'
import {useLocalSearchParams} from 'expo-router'
import React, {useEffect, useMemo, useState} from 'react'
import {StyleSheet, ScrollView, Image, TouchableOpacity, View} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import {ROUTES, size, useAppRouter} from '@/shared'
import {Match, MatchCard, useMatch} from '@/entities/match'
import {color_token} from '@/constants/theme'
import {BackButton, Txt} from '@/shared/ui'

/** 경기 결과 목업데이터 */
const matchResult = [
  {
    image: require('@/assets/icons/emo/win.png'),
    text: '승리',
  },
  {
    image: require('@/assets/icons/emo/lose.png'),
    text: '패배',
  },
  {
    image: require('@/assets/icons/emo/draw.png'),
    text: '무승부',
  },
  {
    image: require('@/assets/icons/emo/cancel.png'),
    text: '경기 취소',
  },
]
/** 날씨 목업 데이터 */
const weatherResult = [
  {
    image: require('@/assets/icons/emo/sunny.png'),
    text: '맑음',
  },
  {
    image: require('@/assets/icons/emo/cloudy.png'),
    text: '흐림',
  },
  {
    image: require('@/assets/icons/emo/rain.png'),
    text: '비',
  },
  {
    image: require('@/assets/icons/emo/wind.png'),
    text: '바람',
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

  const router = useAppRouter()
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
      // router.dismiss()
      router.dismissTo(ROUTES.WRITE_TICKET)
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

  const date = params?.date

  useEffect(() => {
    if (date) setSelectedDate(new Date(date as string))
    if (params.matchId && matchingList) {
      const targetMatch = matchingList?.find(match => match.id === Number(params.matchId))
      console.log(targetMatch)
      if (targetMatch) {
        // 경기가 종료되지 않은 경우, 결과를 undefined로 설정
        const match: Match = targetMatch.is_finished
          ? targetMatch
          : {...targetMatch, score_home: undefined, score_away: undefined}
        setSelectedMatch(match)
      }
    }
  }, [date, isSuccess])

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.headerContainer}>
        <Header
          leftButton={{
            content: <BackButton onPress={goToPreviousStep} />,
          }}
        />
        <Progress current={currentStep} max={3} />
      </View>
      {currentStep === 1 && (
        <ScrollView style={styles.scrollContainer}>
          <Txt size={24} weight="semibold" color={color_token.gray900} style={styles.title}>
            경기 일정을{'\n'}선택해주세요
          </Txt>
          <View style={styles.matchListBox}>
            {matchingList.length > 0 ? (
              <>
                {matchingList.map(match => (
                  <MatchCard
                    key={match.id}
                    isSelected={selectedMatch?.id === match.id}
                    match={match}
                    onClick={() => {
                      setSelectedMatch(match)
                      nextButtonClick()
                    }}
                  />
                ))}
                <View style={styles.doubleHeaderBox}>
                  <TouchableOpacity onPress={onClickDoubleHeaderMatch} style={styles.doubleHeaderButton}>
                    <Txt size={16} weight="medium" color={color_token.white}>
                      더블헤더 작성하기
                    </Txt>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.noMatchBox}>
                <Txt size={16} color={color_token.black} style={styles.noMatchText}>
                  경기 일정이 없어요.
                </Txt>
                <TouchableOpacity onPress={nextButtonClick} style={styles.doubleHeaderButton}>
                  <Txt size={16} weight="medium" color={color_token.white}>
                    직접 추가하기
                  </Txt>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
          <Txt size={24} weight="semibold" color={color_token.gray900} style={styles.title}>
            어디서{'\n'}경기를 보셨나요?
          </Txt>
          <TouchableOpacity onPress={() => onPlaceClick('직관')} activeOpacity={1}>
            <View style={selectedPlace === '직관' ? styles.selectButton : styles.defaultSelectButton}>
              <Image
                source={
                  selectedPlace === '직관'
                    ? require('@/assets/icons/round-check-active.png')
                    : require('@/assets/icons/round-check.png')
                }
                style={[styles.checkboxImage, selectedPlace === '직관' ? styles.roundCheck : {}]}
              />
              <Txt size={20} weight="semibold">
                직관
              </Txt>
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
                style={[styles.checkboxImage, selectedPlace === '집관' ? styles.roundCheck : {}]}
              />
              <Txt size={20} weight="semibold">
                집관
              </Txt>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {currentStep === 3 || autoSkipToNext[currentStep] ? (
        <View style={[styles.buttonBox, {paddingBottom: size(16) + insets.bottom}]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.buttonCenter, nextButtonEnabled ? styles.nextButton : styles.nextDisabledButton]}
            onPress={nextButtonClick}
            disabled={!nextButtonEnabled}>
            <Txt
              size={16}
              weight="semibold"
              color={nextButtonEnabled ? color_token.white : color_token.gray600}
              style={styles.buttonTextCenter}>
              {currentStep !== 3 ? '다음' : '오늘의 티켓 만들기'}
            </Txt>
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
    backgroundColor: color_token.white,
  },
  headerContainer: {
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: size(24),
    paddingTop: size(32),
    paddingBottom: size(45),
    backgroundColor: color_token.gray100,
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: size(24),
    paddingTop: size(32),
    paddingBottom: size(45),
    gap: size(20),
    flexDirection: 'column',
    backgroundColor: color_token.gray100,
  },
  title: {},
  matchListBox: {
    flexDirection: 'column',
    marginTop: size(28),
    gap: size(20),
    marginBottom: size(40),
  },
  doubleHeaderButton: {
    backgroundColor: color_token.gray800,
    paddingVertical: size(10),
    paddingHorizontal: size(24),
    borderRadius: size(99),
  },
  nextButton: {
    backgroundColor: color_token.primary,
    textAlign: 'center',
    paddingVertical: size(14),
    borderRadius: size(10),
    height: size(50),
  },
  nextDisabledButton: {
    backgroundColor: color_token.gray300,
    textAlign: 'center',
    paddingVertical: size(14),
    borderRadius: size(10),
    height: size(50),
  },
  buttonCenter: {
    justifyContent: 'center',
  },
  buttonTextCenter: {
    textAlign: 'center',
  },
  backImage: {
    width: 16,
    height: 28,
  },
  buttonBox: {
    width: '100%',
    paddingHorizontal: size(24),
    backgroundColor: color_token.gray100,
  },
  selectButton: {
    width: '100%',
    paddingVertical: size(14),
    borderRadius: size(10),
    paddingHorizontal: size(10),
    borderWidth: 1,
    borderColor: color_token.gray800,
    backgroundColor: color_token.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(6),
  },
  defaultSelectButton: {
    width: '100%',
    paddingVertical: size(14),
    borderRadius: size(10),
    paddingHorizontal: size(10),
    backgroundColor: color_token.gray150,
    borderWidth: 1,
    borderColor: color_token.gray300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(6),
  },
  checkboxImage: {
    width: size(24),
    height: size(24),
  },
  roundCheck: {
    tintColor: color_token.black,
  },
  doubleHeaderBox: {
    alignItems: 'center',
    marginTop: size(20),
    marginBottom: size(40),
  },
  noMatchText: {
    marginBottom: size(24),
  },
  noMatchBox: {
    alignItems: 'center',
    backgroundColor: color_token.white,
    borderColor: color_token.gray300,
    borderWidth: 1,
    borderRadius: size(10),
    paddingVertical: size(40),
  },
})
