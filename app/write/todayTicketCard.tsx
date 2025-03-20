import {findMatchResultImage, findWeatherImage} from '@/constants/match'
import useTeam from '@/hooks/match/useTeam'
import useTicketDetail from '@/hooks/match/useTicketDetail'
import {format} from 'date-fns'
import {useLocalSearchParams, useRootNavigationState, useRouter} from 'expo-router'
import React from 'react'
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import MaskedView from '@react-native-masked-view/masked-view'
import Svg, {Path} from 'react-native-svg'
import useProfile from '@/hooks/my/useProfile'
import Header from '@/components/common/Header'
export default function GameCard() {
  const router = useRouter()
  const {id, date, target_id} = useLocalSearchParams()
  const {findTeamById} = useTeam()

  console.log(id, date, target_id)

  const navigationState = useRootNavigationState()
  const previousRoute = navigationState.routes.at(-1)?.name || ''

  const {
    ticketDetail, //
    onChangeTicket,
    ticketIndex,
    data,
    toggleFavorite,
    reactionList,
    toggleReaction,
  } = useTicketDetail(Number(id) || (date as string), Number(target_id))

  const {profile} = useProfile()

  const isMyTicket = profile?.id === ticketDetail?.writer

  const hometeam = findTeamById(Number(ticketDetail?.hometeam_id))
  const awayteam = findTeamById(Number(ticketDetail?.awayteam_id))

  const heartIcon = ticketDetail?.favorite
    ? require('@/assets/icons/heart_fill.png')
    : require('@/assets/icons/heart.png')

  const onBackButtonClick = () => {
    if (previousRoute.includes('write')) {
      router.dismiss(2)
    }
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="오늘의 티켓"
        variants="transparent"
        leftButton={{
          onPress: onBackButtonClick,
          content: <Image source={require('@/assets/icons/back.png')} style={styles.backImage} />,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        {isMyTicket && (
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image source={heartIcon} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                router.push({pathname: '/write/ticket', params: {id: ticketDetail?.id, date: ticketDetail?.date}})
              }}>
              <Image source={require('@/assets/icons/edit.png')} resizeMode="contain" style={styles.editIcon} />
            </TouchableOpacity> */}
          </View>
        )}
        {Number(data?.length) > 1 ? (
          <View style={styles.matchButtonBox}>
            {data?.map((_, index) => (
              <TouchableOpacity
                key={index}
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
                    aspectRatio: 307 / 220,
                  }}
                  maskElement={
                    <Svg height="100%" width="100%" viewBox="0 0 307 220">
                      <Path
                        fill="white"
                        d={`
                          M0 0 
                          H307 
                          V220 
                          H0 
                          Z
                          
                          M0 0 
                          V0 20
                          C0 20, 20 20, 20 0 
                          Z
                          
                          M287 0
                          C287 20, 307 20, 307 20
                          V307 0
                          Z
                          `}
                      />
                    </Svg>
                  }>
                  {/* 마스킹된 부분에 이미지 표시 */}
                  <Image
                    source={{
                      uri: ticketDetail?.image,
                    }}
                    style={{width: '100%', height: 260}}
                    resizeMode="cover"
                  />
                  <Svg height="100%" width="100%" viewBox="0 0 307 220" style={{position: 'absolute', top: 0, left: 0}}>
                    <Path
                      d={`
                          M0 0 
                          H307 
                          V220 
                          H0 
                          Z
                          
                          M0 0 
                          V0 20
                          C0 20, 20 20, 20 0 
                          Z
                          
                          M287 0
                          C287 20, 307 20, 307 20
                          V307 0
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
                    <Text style={[styles.teamText, {backgroundColor: `${hometeam?.color}4D`}]}>
                      {hometeam?.short_name}
                    </Text>
                  </View>
                  <Image source={require('@/assets/icons/matchDot.png')} resizeMode="contain" style={styles.matchDot} />
                  <View style={styles.teamScoreBox}>
                    <Text style={styles.scoreText}>{ticketDetail?.score_opponent}</Text>
                    <Text style={[styles.teamText, {backgroundColor: `${awayteam?.color}4D`}]}>
                      {awayteam?.short_name}
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
                  style={{aspectRatio: 307 / 220}}
                  maskElement={
                    <Svg height="100%" width="100%" viewBox="0 0 307 220">
                      <Path
                        fill="red"
                        d={`
                          M0 0 
                          H307 
                          V220 
                          H0 
                          Z
                          
                          M307 220 
                          V307 200
                          C307 200, 287 200, 287 220 
                          Z

                          M20 220
                          C20 220, 20 200, 0 200
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
          {reactionList.map(reaction => (
            <TouchableOpacity
              key={reaction.key}
              style={[styles.emojiButton, reaction.isPressed && {borderColor: '#1E5EF4'}]}
              onPress={() => toggleReaction(reaction.key)}>
              <Text>{reaction.title}</Text>
              <Text>{reaction.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {Number(data?.length) <= 1 && (
          <TouchableOpacity
            onPress={() => {
              router.push({pathname: '/write', params: {date: ticketDetail?.date}})
            }}
            style={{
              backgroundColor: '#1E5EF4',
              borderRadius: 10,
              paddingVertical: 10,
              marginTop: 10,
              marginBottom: 32,
              height: 50,
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
        )}
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
    gap: 24,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  matchButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
    // height: 840,
    width: '100%',
    aspectRatio: 327 / 840,
    marginHorizontal: 'auto',
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
    height: 150,
    flexDirection: 'column',
    paddingBottom: 10,
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
    marginBottom: 30,
  },
  emojiButton: {
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: '#95938B',
    borderRadius: 40,
    paddingHorizontal: 8,
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
    paddingVertical: 16,
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
    paddingTop: 20,
  },
  backImage: {
    width: 16,
    height: 28,
  },
})
