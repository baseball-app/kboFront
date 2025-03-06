import {DAYS_OF_WEEK} from '@/constants/day'
import {findMatchResultImage, findWeatherImage} from '@/constants/match'
import useTeam from '@/hooks/match/useTeam'
import useTicketDetail from '@/hooks/match/useTicketDetail'
import {format} from 'date-fns'
import dayjs from 'dayjs'
import {useLocalSearchParams, useRouter} from 'expo-router'
import React from 'react'
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import MaskedView from '@react-native-masked-view/masked-view'
import Svg, {Path} from 'react-native-svg'
import useProfile from '@/hooks/my/useProfile'

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
  const {id} = useLocalSearchParams()
  const {findTeamById} = useTeam()

  const {
    ticketDetail, //
    onChangeTicket,
    ticketIndex,
    data,
    toggleFavorite,
  } = useTicketDetail(Number(id))

  const {profile} = useProfile()

  const isMyTicket = profile?.id === ticketDetail?.writer

  const opponent = findTeamById(ticketDetail?.opponent)

  const heartIcon = ticketDetail?.favorite
    ? require('@/assets/icons/heart_fill.png')
    : require('@/assets/icons/heart.png')

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
          <TouchableOpacity onPress={toggleFavorite}>
            <Image source={heartIcon} resizeMode="contain" style={styles.editIcon} />
          </TouchableOpacity>
          {isMyTicket && (
            <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
          )}
        </View>
        {Number(data?.length) > 1 ? (
          <View style={styles.matchButtonBox}>
            {data?.map((_, index) => (
              <TouchableOpacity
                style={[styles.matchButton, ticketIndex === index && styles.matchButtonActive]}
                onPress={() => onChangeTicket(index)}>
                <Text style={[styles.matchText, ticketIndex === index && styles.matchTextActive]}>
                  {index + 1}차 경기
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <View style={styles.ticketBox}>
          <ImageBackground
            source={require('@/assets/images/Subtract.png')}
            style={styles.ticketBackground}
            imageStyle={styles.backgroundImage}>
            <View style={[styles.ticketContent]}>
              <View style={{position: 'relative', width: '100%'}}>
                <Image
                  //
                  source={require('@/assets/icons/star.png')}
                  style={{width: 14, height: 14, position: 'absolute', top: 0, left: 0}}
                  resizeMode="cover"
                />
                <Image
                  //
                  source={require('@/assets/icons/star.png')}
                  style={{width: 14, height: 14, position: 'absolute', top: 0, right: 0}}
                  resizeMode="cover"
                />
                <MaskedView
                  style={{
                    aspectRatio: 400 / 220,
                  }}
                  maskElement={
                    <Svg height="100%" width="100%" viewBox="0 0 400 220">
                      <Path
                        fill="white"
                        d={`
                          M0 0 
                          H400 
                          V220 
                          H0 
                          Z
                          
                          M0 0 
                          V0 25
                          C0 25, 25 25, 25 0 
                          Z
                          
                          M375 0
                          C375 25, 400 25, 400 25
                          V400 0
                          Z
                          `}
                      />
                    </Svg>
                  }>
                  {/* 마스킹된 부분에 이미지 표시 */}
                  <Image source={require('./test_baseball.jpg')} style={{width: '100%'}} resizeMode="cover" />
                  <Svg height="100%" width="100%" viewBox="0 0 400 220" style={{position: 'absolute', top: 0, left: 0}}>
                    <Path
                      d={`
                    M0 0 
                    H400 
                    V220 
                    H0 
                    Z

                    M0 0 
                    V0 25
                    C0 25, 25 25, 25 0 
                    Z

                    M375 0
                    C375 25, 400 25, 400 25
                    V400 0
                    Z
                `}
                      fill="none"
                      stroke="white"
                      strokeWidth="6"
                    />
                  </Svg>
                </MaskedView>
              </View>

              {/* <View style={styles.imgViewBox}>
                <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
              </View> */}
              <View style={[styles.resultBox]}>
                <View style={styles.resultImgBox}>
                  <Image
                    source={findMatchResultImage(ticketDetail?.result)}
                    resizeMode="contain"
                    style={styles.editIcon}
                  />
                  <Text style={styles.resultText}>{ticketDetail?.result}</Text>
                </View>
                <View style={styles.resultImgBox}>
                  <Image
                    source={findWeatherImage(ticketDetail?.weather)}
                    resizeMode="contain"
                    style={styles.resultIcon}
                  />
                  <Text style={styles.resultText}>{ticketDetail?.weather}</Text>
                </View>
              </View>

              <View style={styles.matchInfoBox}>
                <View style={styles.scoreBox}>
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>{ticketDetail?.score_our}</Text>
                    <Text style={styles.teamText}></Text>
                  </View>
                  <Image source={require('@/assets/icons/matchDot.png')} resizeMode="contain" style={styles.matchDot} />
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>{ticketDetail?.score_opponent}</Text>
                    <Text style={[styles.teamText, {backgroundColor: `${opponent?.color}4B`}]}>
                      {opponent?.shortName}
                    </Text>
                  </View>
                </View>
                <View style={styles.matchBox}>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 경기일정</Text>
                    <Text style={styles.infoValue}>
                      {ticketDetail?.date ? format(ticketDetail?.date, 'yyyy-MM-dd HH:mm') : ''}
                    </Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 집관장소</Text>
                    <Text style={styles.infoValue}>{ticketDetail?.gip_place}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 선발선수</Text>
                    <Text style={styles.infoValue}>{ticketDetail?.starting_pitchers}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>오늘의 직관푸드</Text>
                    <Text style={styles.infoValue}>{ticketDetail?.food}</Text>
                  </View>
                </View>
              </View>
              <View style={{position: 'relative', width: '100%'}}>
                <Image
                  //
                  source={require('@/assets/icons/star.png')}
                  style={{width: 14, height: 14, position: 'absolute', bottom: 0, left: 0}}
                  resizeMode="cover"
                />
                <Image
                  //
                  source={require('@/assets/icons/star.png')}
                  style={{width: 14, height: 14, position: 'absolute', bottom: 0, right: 0}}
                  resizeMode="cover"
                />
                <MaskedView
                  style={{aspectRatio: 400 / 220}}
                  maskElement={
                    <Svg height="100%" width="100%" viewBox="0 0 400 220">
                      <Path
                        fill="red"
                        d={`
                          M0 0 
                          H400 
                          V220 
                          H0 
                          Z
                          
                          M400 220 
                          V400 195
                          C400 195, 375 195, 375 220 
                          Z

                          M25 220
                          C25 220, 25 195, 0 195
                          V0 220
                          Z
                          `}
                      />
                    </Svg>
                  }>
                  {/* 마스크로 보여질 영역 */}
                  <View style={{width: '100%', height: '100%', backgroundColor: 'white', padding: 10}}>
                    <View style={styles.thoughtsBox}>
                      {ticketDetail?.only_me && (
                        <View style={styles.onlyMeButtonBox}>
                          <Image
                            source={require('@/assets/icons/lock.png')}
                            style={styles.lockButton}
                            resizeMode="contain"
                          />
                          <Text style={styles.onlyMeText}>나만보기</Text>
                        </View>
                      )}
                      <View style={styles.thoughtsTextBox}>
                        <Text style={styles.thoughtsText}>{ticketDetail?.memo}</Text>
                      </View>
                    </View>
                  </View>
                </MaskedView>
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
        <TouchableOpacity
          style={{
            backgroundColor: '#1E5EF4',
            borderRadius: 10,
            paddingVertical: 10,
            marginTop: 32,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              lineHeight: 22.4,
              margin: 'auto',
            }}>
            더블헤더 티켓 추가하기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maskContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
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
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25.2,
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
  matchButtonActive: {
    backgroundColor: '#1E5EF4',
    borderColor: '#1E5EF4',
  },
  matchText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16.71,
    color: '#171716',
  },
  matchTextActive: {
    color: '#fff',
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
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
    borderRadius: 4,
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
    width: '100%',
  },
  onlyMeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  lockButton: {
    width: 24,
    height: 24,
  },
  thoughtsTextBox: {
    marginTop: 12,
  },
  thoughtsText: {
    color: '#353430',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 21,
  },
  ticketBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingVertical: 36,
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
