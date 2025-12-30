import ImageResizer from '@bam.tech/react-native-image-resizer'

async function resizeImage(uri: string, format: 'PNG' | 'JPEG' = 'PNG') {
  const resizedImage = await ImageResizer.createResizedImage(
    uri, // 원본 이미지
    800, // 리사이즈할 가로 크기 (필요한 크기로 변경)
    800, // 리사이즈할 세로 크기
    format, // 출력 포맷 ('JPEG' 또는 'PNG')
    100, // 품질 (0 ~ 100)
    0, // 회전 (0 = 그대로)
    undefined, // outputPath (설정하지 않으면 기본 캐시에 저장됨)
    false, // 메타데이터 유지 여부
  )

  return resizedImage
}

export {resizeImage}
