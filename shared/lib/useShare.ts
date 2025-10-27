import {Platform} from 'react-native'
import Share, {Social} from 'react-native-share'
import * as Linking from 'expo-linking'
import {InstagramModuleNative} from './InstagramModule'

const useShare = () => {
  const checkCanOpenInstagram = async () => {
    // Android에서는 Native Module 사용
    if (Platform.OS === 'android' && InstagramModuleNative) {
      try {
        return await InstagramModuleNative.isInstagramInstalled()
      } catch (error) {
        console.error('Instagram 설치 확인 오류:', error)
        return false
      }
    }

    // iOS에서는 기존 방식 사용
    return Linking.canOpenURL('instagram://')
  }

  const shareInstagramStories = (url: string) => {
    // 로컬 파일 경로인 경우 file:// 프로토콜 추가
    const imageUrl = url.startsWith('/') ? `file:/${url}` : url

    return Share.shareSingle({
      social: Social.InstagramStories,
      appId: '아무거나',
      // backgroundImage: imageUrl, //'배경으로 지정할 이미지의 URL',
      // backgroundVideo: '배경으로 지정할 동영상의 URL',
      stickerImage: imageUrl,
      backgroundBottomColor: '#FFFFFF',
      backgroundTopColor: '#FFFFFF',
    })
  }

  return {shareInstagramStories, checkCanOpenInstagram}
}

export {useShare}
