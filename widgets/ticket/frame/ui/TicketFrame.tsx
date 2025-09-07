import Ellipse from '@/components/common/Ellipse'
import {findMatchResultImage, findWeatherImage} from '@/constants/match'
import {useTeam} from '@/entities/match'
import {TicketDetail} from '@/entities/ticket'
import useProfile from '@/hooks/my/useProfile'
import MaskedView from '@react-native-masked-view/masked-view'
import {format} from 'date-fns'
import React, {memo, useMemo} from 'react'
import {Image, StyleSheet, View, Text, ScrollView} from 'react-native'
import Svg, {Path} from 'react-native-svg'
import FastImage from '@d11/react-native-fast-image'

type Props = {
  ticketDetail: TicketDetail
}

const TicketFrame = memo(({ticketDetail}: Props) => {
  const {findTeamById} = useTeam()
  const {profile} = useProfile()

  const isWriter = profile?.id === ticketDetail.writer

  const hometeam = findTeamById(Number(ticketDetail.hometeam_id))
  const awayteam = findTeamById(Number(ticketDetail.awayteam_id))

  return (
    <>
      <TicketEdge edge="top" />
      <View style={styles.ticketBackground}>
        <View style={[styles.ticketContent]}>
          <View style={{position: 'relative', width: '100%'}}>
            <TicketImage image={ticketDetail.image} />
          </View>
          <View style={[styles.resultBox]}>
            <View style={styles.resultImgBox}>
              <Image source={findMatchResultImage(ticketDetail.result)} resizeMode="contain" style={styles.editIcon} />
              <Text style={styles.resultText}>
                {ticketDetail.result === '취소' ? '경기 취소' : ticketDetail.result}
              </Text>
            </View>
            <View style={styles.resultImgBox}>
              <Image source={findWeatherImage(ticketDetail.weather)} resizeMode="contain" style={styles.resultIcon} />
              <Text style={styles.resultText}>{ticketDetail.weather}</Text>
            </View>
          </View>

          <View style={styles.matchInfoBox}>
            <View style={styles.scoreBox}>
              <View style={styles.teamScoreBox}>
                <Text style={styles.scoreText}>{ticketDetail.score_our}</Text>
                <Text style={[styles.teamText, {backgroundColor: `${hometeam?.color}4D`}]}>{hometeam?.short_name}</Text>
              </View>
              <View style={{gap: 6}}>
                <Ellipse size={5} />
                <Ellipse size={5} />
              </View>
              <View style={styles.teamScoreBox}>
                <Text style={styles.scoreText}>{ticketDetail.score_opponent}</Text>
                <Text style={[styles.teamText, {backgroundColor: `${awayteam?.color}4D`}]}>{awayteam?.short_name}</Text>
              </View>
            </View>
            <View style={styles.matchBox}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>오늘의 경기일정</Text>
                <Text style={styles.infoValue}>{ticketDetail.date ? format(ticketDetail.date, 'yyyy-MM-dd') : ''}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>{ticketDetail.is_ballpark ? '오늘의 경기구장' : '오늘의 집관장소'}</Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.infoValue, {lineHeight: 17}]} numberOfLines={2}>
                    {ticketDetail.gip_place}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>오늘의 선발선수</Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.infoValue, {lineHeight: 17}]} numberOfLines={2}>
                    {ticketDetail.starting_pitchers}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>오늘의 직관푸드</Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.infoValue, {lineHeight: 17}]} numberOfLines={2}>
                    {ticketDetail.food}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{position: 'relative', width: '100%'}}>
            <TicketMemo memo={ticketDetail.memo} isOnlyMe={ticketDetail.only_me} isWriter={isWriter} />
          </View>
        </View>
      </View>
      <TicketEdge edge="bottom" />
    </>
  )
})

export {TicketFrame}

const TicketMemo = ({memo, isOnlyMe = false, isWriter}: {memo?: string; isOnlyMe?: boolean; isWriter?: boolean}) => {
  return (
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
          {(() => {
            if (!isOnlyMe) {
              return (
                <View style={styles.thoughtsTextBox}>
                  <ScrollView>
                    <Text style={styles.thoughtsText}>{memo}</Text>
                  </ScrollView>
                </View>
              )
            }

            if (isOnlyMe && isWriter) {
              return (
                <>
                  <View style={styles.onlyMeButtonBox}>
                    <Image source={require('@/assets/icons/lock.png')} style={styles.lockButton} resizeMode="contain" />
                    <Text style={styles.onlyMeText}>나만보기</Text>
                  </View>
                  <View style={styles.thoughtsTextBox}>
                    <ScrollView>
                      <Text style={styles.thoughtsText}>{memo}</Text>
                    </ScrollView>
                  </View>
                </>
              )
            }

            return null
          })()}
        </View>
      </View>
    </MaskedView>
  )
}

const TicketImage = memo(({image}: {image: string}) => {
  return (
    <MaskedView
      style={{
        aspectRatio: 307 / 270,
      }}
      maskElement={
        <Svg height="100%" width="100%" viewBox="0 0 307 270">
          <Path
            fill="white"
            d={`
                        M0 0
                        H307
                        V270
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
      <FastImage
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        style={{width: '100%', aspectRatio: 307 / 270}}
        resizeMode="cover"
      />
      <Svg height="100%" width="100%" viewBox="0 0 307 270" style={{position: 'absolute', top: 0, left: 0}}>
        <Path
          d={`
                        M0 0
                        H307
                        V270
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
  )
})

const TicketEdge = ({edge}: {edge: 'top' | 'bottom'}) => {
  return (
    <MaskedView
      style={{
        aspectRatio: 307 / 12,
      }}
      maskElement={
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 307 11"
          style={{transform: [{rotate: edge === 'bottom' ? '180deg' : '0deg'}]}}>
          {/* 오른쪽 절반만 흰색으로 그리기 */}
          <Path
            fill="white"
            d={`
                          M0 0
                          H15
                          M15 0
                          A10,10 0 0,0 35,0
                          H47
                          M47 0
                          A10,10 0 0,0 67,0
                          H79
                          M79 0
                          A10,10 0 0,0 99,0
                          H111
                          M111 0
                          A10,10 0 0,0 131,0
                          H143
                          M143 0
                          A10,10 0 0,0 163,0
                          H175
                          M175 0
                          A10,10 0 0,0 195,0
                          H207
                          M207 0
                          A10,10 0 0,0 227,0
                          H239
                          M239 0
                          A10,10 0 0,0 259,0
                          H271
                          M271 0
                          A10,10 0 0,0 291,0
                          H307
                          V11
                          H0
                          V0
                          Z
                          `}
          />
        </Svg>
      }>
      <View style={{width: '100%', height: 100, backgroundColor: '#202020'}} />
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  editIcon: {
    width: 24,
    height: 24,
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#202020',
    marginTop: 2,
    gap: 2.5,
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
    marginVertical: 2,
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
    paddingHorizontal: 22,
    alignItems: 'center',
    gap: 30,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    width: 95,
  },
  infoValue: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    color: '#353430',
  },
  thoughtsBox: {
    width: '100%',
  },
  thoughtsTextBox: {
    marginTop: 2,
  },
  thoughtsText: {
    color: '#353430',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 21,
  },
  ticketBackground: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingVertical: 32,
    backgroundColor: '#202020',
    marginTop: -1,
    marginBottom: -1,
  },
  ticketContent: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
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
  onlyMeText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21,
    color: '#171716',
  },
})
