import {Pressable} from '@/shared'
import React, {useState} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

interface IQuestionBox {
  title: string
  questionData: {image: string; text: string}[]
  onQuestionClick: (p: string) => void
  selectedQuestion: string
  type: string
}

const QuestionBox = (props: IQuestionBox) => {
  const {title, questionData, onQuestionClick, selectedQuestion} = props
  return (
    <View style={[styles.container]}>
      <Text style={styles.questionTitle}>{title}</Text>
      <View style={styles.questionDataBox}>
        {questionData?.map((ev: any, idx: number) => (
          <Pressable key={idx} onPress={() => onQuestionClick(ev.questionText)}>
            <View style={styles.questionInfo}>
              <View style={[styles.imageContainer, props.type === 'weather' && {backgroundColor: '#F3F2EE'}]}>
                <Image
                  source={ev.questionImage}
                  style={[styles.questionImage, props.type === 'weather' && {width: 30, height: 30}]}
                />
                {selectedQuestion === ev.questionText && (
                  <>
                    <View style={styles.overlay} />
                    <Image source={require('@/assets/icons/check.png')} style={styles.checkImage} />
                  </>
                )}
              </View>
              <Text>{ev.questionText}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E4E2DC',
    height: 178,
    flexDirection: 'column',
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 28,
    alignItems: 'center',
  },
  disabledContainer: {
    backgroundColor: '#F3F2EE',
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E4E2DC',
    height: 178,
    flexDirection: 'column',
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 28,
    alignItems: 'center',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: '#171716',
  },
  questionDataBox: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 24,
  },
  questionInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  imageContainer: {
    position: 'relative',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
  questionImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
  },
  checkImage: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
  },
})

export default QuestionBox
