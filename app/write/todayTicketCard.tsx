import useTicket from '@/hooks/match/useTicket'
import {useRouter} from 'expo-router'
import React from 'react'
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

const emojis = [
  {emoji: '😆', count: 10},
  {emoji: '😆', count: 8},
  {emoji: '👍', count: 7},
  {emoji: '👏', count: 6},
  {emoji: '😒', count: 4},
  {emoji: '☝️', count: 1},
  {emoji: '👎', count: 0},
  {emoji: '😡', count: 0},
  {emoji: '😐', count: 0},
]
export default function GameCard() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <Image source={require('@/assets/icons/back.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>오늘의 티켓</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        <View style={styles.iconBox}>
          <Image source={require('@/assets/icons/heart.png')} resizeMode="contain" style={styles.editIcon} />
          <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
        </View>
        <View style={styles.matchButtonBox}>
          <TouchableOpacity style={styles.matchButton}>
            <Text style={styles.matchText}>1차 경기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.matchButton}>
            <Text style={styles.matchText}>2차 경기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ticketBox}>
          <ImageBackground
            source={require('@/assets/images/Subtract.png')}
            style={styles.ticketBackground}
            imageStyle={styles.backgroundImage}>
            <View style={styles.ticketContent}>
              <View style={styles.imgViewBox}>
                <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
              </View>
              <View style={styles.resultBox}>
                <View style={styles.resultImgBox}>
                  <Image source={require('@/assets/icons/emo/win.png')} resizeMode="contain" style={styles.editIcon} />
                  <Text style={styles.resultText}>승리</Text>
                </View>
                <View style={styles.resultImgBox}>
                  <Image
                    source={require('@/assets/icons/emo/cloudy.png')}
                    resizeMode="contain"
                    style={styles.resultIcon}
                  />
                  <Text style={styles.resultText}>흐림</Text>
                </View>
              </View>
              <View style={styles.matchInfoBox}>
                <View style={styles.scoreBox}>
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>3</Text>
                    <Text style={styles.teamText}>SSG</Text>
                  </View>
                  <Image source={require('@/assets/icons/matchDot.png')} resizeMode="contain" style={styles.matchDot} />
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>3</Text>
                    <Text style={styles.teamText}>SSG</Text>
                  </View>
                </View>
                <View style={styles.matchBox}>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 경기일정</Text>
                    <Text style={styles.infoValue}>2024-07-13 18:30</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 집관장소</Text>
                    <Text style={styles.infoValue}>마이 홈</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 선발선수</Text>
                    <Text style={styles.infoValue}>양의지</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 직관푸드</Text>
                    <Text style={styles.infoValue}>자몽 맥주 & 떡볶이</Text>
                  </View>
                </View>
              </View>
              <View style={styles.thoughtsBox}>
                <View style={styles.onlyMeButtonBox}>
                  <Image source={require('@/assets/icons/lock.png')} style={styles.lockButton} resizeMode="contain" />
                  <Text style={styles.onlyMeText}>나만보기</Text>
                </View>
                <View style={styles.thoughtsTextBox}>
                  <Text style={styles.thoughtsText}>
                    오늘의 소감입니다 임시 텍스트입니다 추후에 변경이 가능합니다 오늘의 소감입니다 임시 텍스트입니다.
                    추후에 변경이 가능합니다
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.emojiBox}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity key={index} style={styles.emojiButton}>
              <Text>{emoji.emoji}</Text>
              <Text>{emoji.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf3',
  },
  headerBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    left: 24,
  },
  scrollBox: {
    marginTop: 14,
    paddingHorizontal: 24,
    backgroundColor: '#fffcf3',
  },
  iconBox: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'flex-end',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  matchButtonBox: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  matchButton: {
    borderWidth: 1,
    borderColor: '#D0CEC7',
    borderRadius: 28.5,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  matchText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16.71,
    color: '#171716',
  },
  ticketBox: {
    width: '100%',
    marginTop: 24,
    height: 811,
  },
  imgViewBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#fff',
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 3,
    backgroundColor: '#202020',
  },
  resultImgBox: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  resultIcon: {
    width: 27,
    height: 28,
  },
  resultText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22.4,
  },
  matchInfoBox: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  scoreBox: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  teamScoreBox: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchDot: {
    width: 6,
    height: 16,
  },
  scoreText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 33.4,
  },
  teamText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#FDD484',
  },
  matchBox: {
    width: '100%',
    height: 148,
    flexDirection: 'column',
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 22,
    alignItems: 'center',
    gap: 52,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
  },
  infoValue: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    color: '#353430',
  },
  onlyMeText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21,
    color: '#171716',
  },
  emojiBox: {
    backgroundColor: '#fffcf3',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 28,
  },
  emojiButton: {
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: '#95938B',
    borderRadius: 40,
    paddingHorizontal: 12.5,
    paddingVertical: 4,
  },
  thoughtsBox: {
    height: 220,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  onlyMeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  lockButton: {
    width: 24,
    height: 24,
  },
  thoughtsTextBox: {
    flex: 1,
    marginTop: 12,
  },
  thoughtsText: {
    color: '#353430',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 21,
  },
  ticketBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  backgroundImage: {
    resizeMode: 'stretch',
  },
  ticketContent: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
    paddingHorizontal: 10,
  },
})
