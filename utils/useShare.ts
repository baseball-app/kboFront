import Share, {Social} from 'react-native-share'

const useShare = () => {
  const shareInstagramStories = (url: string) => {
    // 로컬 파일 경로인 경우 file:// 프로토콜 추가
    const imageUrl = url.startsWith('/') ? `file:/${url}` : url

    return Share.shareSingle({
      social: Social.InstagramStories,
      appId: '아무거나',
      backgroundImage: imageUrl, //'배경으로 지정할 이미지의 URL',
      // backgroundVideo: '배경으로 지정할 동영상의 URL',
      // stickerImage: 'sticker 형식으로(작게) 공유할 이미지의 URL',
      backgroundBottomColor: '#FFFFFF',
      backgroundTopColor: '#FFFFFF',
    })
  }

  return {shareInstagramStories}
}

export {useShare}
