import {Pressable, size} from '@/shared';
import React from 'react';
import {StyleSheet, View, Image, ImageSourcePropType} from 'react-native';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

interface IQuestionBox {
  title: string;
  questionData: {image: ImageSourcePropType; text: string}[];
  onQuestionClick: (p: string) => void;
  selectedQuestion: string;
  type: string;
}

const QuestionBox = (props: IQuestionBox) => {
  const {title, questionData, onQuestionClick, selectedQuestion} = props;
  return (
    <View style={styles.container}>
      <Txt size={20} weight="semibold" color={color_token.gray900}>
        {title}
      </Txt>
      <View style={styles.questionDataBox}>
        {questionData?.map((ev, idx: number) => (
          <Pressable key={idx} onPress={() => onQuestionClick(ev.text)}>
            <View style={styles.questionInfo}>
              <View style={[styles.imageContainer, props.type === 'weather' && styles.weatherContainer]}>
                <Image
                  source={ev.image}
                  style={[styles.questionImage, props.type === 'weather' && styles.weatherImage]}
                />
                {selectedQuestion === ev.text && (
                  <>
                    <View style={styles.overlay} />
                    <Image source={require('@/assets/icons/check.png')} style={styles.checkImage} />
                  </>
                )}
              </View>
              <Txt>{ev.text}</Txt>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color_token.white,
    borderRadius: size(12),
    width: '100%',
    borderWidth: 1,
    borderColor: color_token.gray300,
    height: size(178),
    flexDirection: 'column',
    paddingHorizontal: size(26),
    paddingTop: size(16),
    paddingBottom: size(28),
    alignItems: 'center',
  },
  questionDataBox: {
    marginTop: size(24),
    flexDirection: 'row',
    gap: size(24),
  },
  questionInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: size(12),
  },
  imageContainer: {
    position: 'relative',
    width: size(50),
    height: size(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size(999),
  },
  weatherContainer: {
    backgroundColor: color_token.gray150,
  },
  questionImage: {
    width: size(50),
    height: size(50),
    resizeMode: 'contain',
  },
  weatherImage: {
    width: size(30),
    height: size(30),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: size(50),
    height: size(50),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: size(25),
  },
  checkImage: {
    position: 'absolute',
    top: size(10),
    left: size(10),
    width: size(30),
    height: size(30),
  },
});

export default QuestionBox;
