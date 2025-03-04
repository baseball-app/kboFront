export const MATCH_RESULT_IMAGE = {
  승리: require('@/assets/icons/emo/win.png'),
  패배: require('@/assets/icons/emo/lose.png'),
  무승부: require('@/assets/icons/emo/draw.png'),
  '경기 취소': require('@/assets/icons/emo/cancel.png'),
}

export const findMatchResultImage = (result?: string) => {
  if (!result) return

  if (!MATCH_RESULT_IMAGE[result as keyof typeof MATCH_RESULT_IMAGE]) {
    throw new Error('존재하지 않는 이미지입니다.')
  }

  return MATCH_RESULT_IMAGE[result as keyof typeof MATCH_RESULT_IMAGE]
}

export const WEATHER_IMAGE = {
  맑음: require('@/assets/icons/emo/sunny.png'),
  흐림: require('@/assets/icons/emo/cloudy.png'),
  비: require('@/assets/icons/emo/rain.png'),
  바람: require('@/assets/icons/emo/wind.png'),
}

export const findWeatherImage = (weather?: string) => {
  if (!weather) return

  if (!WEATHER_IMAGE[weather as keyof typeof WEATHER_IMAGE]) {
    throw new Error('존재하지 않는 날씨입니다.')
  }

  return WEATHER_IMAGE[weather as keyof typeof WEATHER_IMAGE]
}
