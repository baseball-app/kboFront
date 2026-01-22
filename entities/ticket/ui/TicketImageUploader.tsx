import React from 'react';
import {StyleSheet, Pressable, Image, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useUploadPhoto} from '../model/useUploadPhoto';
import {Txt} from '@/shared/ui';
import {color_token} from '@/constants/theme';
import {size} from '@/shared';

type Props = {
  uri?: string;
  onChange: (image: ImagePicker.ImagePickerAsset) => void;
};

function TicketImageUploader({uri, onChange}: Props) {
  const {uploadPhoto} = useUploadPhoto();

  return (
    <Pressable
      style={styles.imageUploadBox}
      accessibilityRole="button"
      onPress={() =>
        uploadPhoto() //
          .then(res => {
            if (res) onChange(res);
          })
      }>
      {uri ? (
        <Image testID="ticket-image" source={{uri}} style={styles.todayImg} />
      ) : (
        <View style={styles.addImageBox}>
          <Image source={require('@/assets/icons/add_image.png')} style={styles.addImage} />
          <Txt size={14} color={color_token.gray500} weight="medium">
            오늘의 사진을 넣어주세요
          </Txt>
          <Txt size={12} color={'#8A8A8A'} weight="regular">
            * 사진 미등록 시, 기본 사진으로 자동 설정됩니다
          </Txt>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageUploadBox: {
    width: '100%',
    aspectRatio: 307 / 270,
    backgroundColor: color_token.gray150,
    borderRadius: size(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color_token.gray350,
    justifyContent: 'center',
    marginBottom: size(8),
  },
  todayImg: {
    width: '100%',
    height: '100%',
    borderRadius: size(10),
  },
  addImage: {
    width: size(34),
    height: size(34),
  },
  addImageBox: {
    alignItems: 'center',
    gap: size(2),
  },
});

export {TicketImageUploader};
