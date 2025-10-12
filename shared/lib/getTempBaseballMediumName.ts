const getTempBaseballMediumName = (ballparkName: string) => {
  ballparkName = ballparkName.replaceAll(' ', '')

  if (ballparkName === '대구삼성라이온즈파크') return '삼성 라이온즈 파크'
  if (ballparkName === '부산사직야구장') return '사직 야구장'
  if (ballparkName === '잠실종합운동장야구장') return '잠실 종합운동장'
  if (ballparkName === '고척스카이돔') return '고척 스카이돔'
  if (ballparkName === '인천SSG랜더스필드') return 'SSG 랜더스 필드'
  if (ballparkName === '수원KT위즈파크') return 'KT위즈파크'
  if (ballparkName === '대전한화생명볼파크') return '한화생명 볼파크'
  if (ballparkName === '창원NC파크') return 'NC파크'
  if (ballparkName === '광주기아챔피언스필드') return '기아 챔피언스 필드'
  return ballparkName
}

export {getTempBaseballMediumName}
