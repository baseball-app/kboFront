import * as MediaLibrary from 'expo-media-library'
import {showToast} from '@/utils/showToast'
import {NoPermissionError, useMediaPermission} from '@/utils/useMediaPermission'
import {useCaptureView} from '@/utils/useCaptureView'

const useSaveTicketImage = () => {
  const onSaveTicketImage = async (uri: string) => {
    // 저장
    const asset = await MediaLibrary.createAssetAsync(uri)
    showToast('이미지가 저장되었습니다')
  }

  return {onSaveTicketImage}
}

export {useSaveTicketImage}
