import Ellipse from '@/components/common/Ellipse'
import {useTeam} from '@/entities/match'
import {TicketDetail} from '@/entities/ticket'
import useProfile from '@/hooks/my/useProfile'
import React, {memo} from 'react'
import {Image, StyleSheet, View, Text, ScrollView} from 'react-native'
import Svg, {Line} from 'react-native-svg'
import dayjs from 'dayjs'

type Props = {
  ticketDetail: TicketDetail
}

const TicketFrame = memo(({ticketDetail}: Props) => {
  const {findTeamById} = useTeam()
  const {profile} = useProfile()

  const hometeam = findTeamById(Number(ticketDetail.hometeam_id))
  const awayteam = findTeamById(Number(ticketDetail.awayteam_id))

  return (
    <>
      <View style={styles.ticketBackground}>
        <View style={[styles.ticketContent]}>
          <View style={{position: 'relative', width: '100%'}}>
            <Image
              source={{
                uri: ticketDetail?.image,
              }}
              style={{width: '100%', aspectRatio: 327 / 287}}
              resizeMode="cover"
            />
          </View>

          <View style={styles.matchInfoBox}>
            <View style={styles.scoreBox}>
              <View style={styles.teamScoreBox}>
                <Text style={styles.scoreText}>{ticketDetail?.score_our}</Text>
                <Text style={[styles.teamText]}>{hometeam?.short_name}</Text>
              </View>
              <View style={{gap: 6}}>
                <Ellipse size={5} />
                <Ellipse size={5} />
              </View>
              <View style={styles.teamScoreBox}>
                <Text style={styles.scoreText}>{ticketDetail?.score_opponent}</Text>
                <Text style={[styles.teamText]}>{awayteam?.short_name}</Text>
              </View>
            </View>
            <View style={styles.matchBox}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>경기 결과&날씨</Text>
                <Text style={styles.infoValue}>
                  {ticketDetail?.result === '취소' ? '경기 취소' : ticketDetail?.result} / {ticketDetail?.weather}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>오늘의 경기일정</Text>
                <Text style={styles.infoValue}>
                  {ticketDetail?.date ? dayjs(ticketDetail?.date).format('YYYY-MM-DD') : ''}
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>
                  {ticketDetail?.is_ballpark ? '오늘의 경기구장' : '오늘의 집관장소'}
                </Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.infoValue]} numberOfLines={2}>
                    {ticketDetail?.gip_place}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>오늘의 선발선수</Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.infoValue]} numberOfLines={2}>
                    {ticketDetail?.starting_pitchers}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>오늘의 직관푸드</Text>
                <View style={{flex: 1}}>
                  <Text style={[styles.infoValue]} numberOfLines={2}>
                    {ticketDetail?.food}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {Boolean(ticketDetail?.memo) && (
            <View
              style={{
                position: 'relative',
                width: '100%',
              }}>
              <Svg height="1" width="100%" style={{width: '100%', backgroundColor: 'white'}}>
                <Line x1="0" y1="0" x2="100%" y2="1" stroke="#55524E" strokeWidth="1" strokeDasharray={[4, 4]} />
              </Svg>
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  paddingHorizontal: 24,
                  paddingTop: 28,
                  paddingBottom: 56,
                }}>
                <View style={styles.thoughtsBox}>
                  {(() => {
                    if (!ticketDetail?.only_me) {
                      return (
                        <View style={styles.thoughtsTextBox}>
                          <ScrollView style={{maxHeight: 140}}>
                            <Text style={styles.thoughtsText}>{ticketDetail?.memo}</Text>
                          </ScrollView>
                        </View>
                      )
                    }

                    if (ticketDetail?.only_me && profile.id === ticketDetail.writer) {
                      return (
                        <>
                          <View style={styles.onlyMeButtonBox}>
                            <Image
                              source={require('@/assets/icons/lock.png')}
                              style={styles.lockButton}
                              resizeMode="contain"
                            />
                            <Text style={styles.onlyMeText}>나만보기</Text>
                          </View>
                          <View style={styles.thoughtsTextBox}>
                            <ScrollView style={{maxHeight: 140}}>
                              <Text style={styles.thoughtsText}>{ticketDetail?.memo}</Text>
                            </ScrollView>
                          </View>
                        </>
                      )
                    }

                    return null
                  })()}
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  )
})

export {TicketFrame}

const styles = StyleSheet.create({
  editIcon: {
    width: 24,
    height: 24,
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: '#202020', // 삭제
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
    // marginVertical: 2, // 삭제
  },
  scoreBox: {
    width: '100%',
    // height: 90, // 삭제
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 20,
    paddingBottom: 24,
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
    // backgroundColor: '#FDD484', // 삭제
    borderRadius: 4,
    color: '#171716',
  },
  matchBox: {
    width: '100%',
    // height: 150, // 삭제
    flexDirection: 'column',
    paddingBottom: 24,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    // paddingHorizontal: 22, // 위치 변경
    alignItems: 'flex-start',
    gap: 30,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    width: 95,
  },
  infoValue: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#353430',
  },
  thoughtsBox: {
    width: '100%',
  },
  thoughtsTextBox: {
    marginTop: 8,
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
    // paddingVertical: 32, // 삭제
    // backgroundColor: '#202020', // 삭제
    // marginTop: -1, // 삭제
    // marginBottom: -1, // 삭제
  },
  ticketContent: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    // paddingHorizontal: 10, // 삭제
  },
  onlyMeButtonBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  lockButton: {
    width: 20,
    height: 20,
  },
  onlyMeText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21,
    color: '#171716',
  },
})
