import React from 'react'
import {StyleSheet, Pressable, Image, Text} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {useUploadPhoto} from '../model/useUploadPhoto'

type Props = {
  uri?: string
  onChange: (image: ImagePicker.ImagePickerAsset) => void
}

function TicketImageUploader({uri, onChange}: Props) {
  const {uploadPhoto} = useUploadPhoto()

  return (
    <Pressable
      style={styles.imageUploadBox}
      accessibilityRole="button"
      onPress={() =>
        uploadPhoto() //
          .then(res => {
            if (res) onChange(res)
          })
      }>
      {uri ? (
        <Image testID="ticket-image" source={{uri}} style={styles.todayImg} />
      ) : (
        <>
          <Image source={require('@/assets/icons/add_image.png')} style={styles.addImage} />
          <Text style={styles.uploadText}>오늘의 사진을 넣어주세요</Text>
          <Text style={styles.noticeText}>* 사진 미등록 시, 기본 사진으로 자동 설정됩니다</Text>
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  imageUploadBox: {
    width: '100%',
    aspectRatio: 307 / 270,
    backgroundColor: '#F3F2EE',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0CEC7',
    justifyContent: 'center',
    marginBottom: 8,
  },
  todayImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  addImage: {
    width: 34,
    height: 34,
  },
  uploadText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  noticeText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#8A8A8A',
    lineHeight: 16.8,
  },
})

export {TicketImageUploader}
