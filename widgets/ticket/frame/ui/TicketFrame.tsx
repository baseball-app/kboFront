import Ellipse from '@/components/common/Ellipse'
import {useTeam} from '@/entities/match'
import {TicketDetail} from '@/entities/ticket'
import useProfile from '@/hooks/my/useProfile'
import React, {memo} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import dayjs from 'dayjs'
import FastImage from '@d11/react-native-fast-image'
import {size} from '@/shared'
import {color_token} from '@/constants/theme'
import {Txt} from '@/shared/ui'

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
            <FastImage
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
                <Txt size={24} weight="semibold" color={color_token.black}>
                  {ticketDetail?.score_our}
                </Txt>
                <Txt size={14} weight="regular" color={color_token.gray900}>
                  {hometeam?.short_name}
                </Txt>
              </View>
              <View style={{gap: 6}}>
                <Ellipse size={5} />
                <Ellipse size={5} />
              </View>
              <View style={styles.teamScoreBox}>
                <Txt size={24} weight="semibold" color={color_token.black}>
                  {ticketDetail?.score_opponent}
                </Txt>
                <Txt size={14} weight="regular" color={color_token.gray900}>
                  {awayteam?.short_name}
                </Txt>
              </View>
            </View>
            <View style={styles.matchBox}>
              <_InfoRow
                label="경기 결과&날씨"
                value={`${ticketDetail?.result === '취소' ? '경기 취소' : ticketDetail?.result} / ${
                  ticketDetail?.weather
                }`}
              />
              <_InfoRow
                label="오늘의 경기일정"
                value={ticketDetail?.date ? dayjs(ticketDetail?.date).format('YYYY-MM-DD') : ''}
              />
              <_InfoRow
                label={ticketDetail?.is_ballpark ? '오늘의 경기구장' : '오늘의 집관장소'}
                value={ticketDetail?.gip_place}
              />
              <_InfoRow
                label="오늘의 선발선수" //
                value={ticketDetail?.starting_pitchers}
              />
              <_InfoRow
                label="오늘의 직관푸드" //
                value={ticketDetail?.food}
              />
            </View>
          </View>
          {Boolean(ticketDetail?.memo) && (
            <View
              style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                marginTop: -1,
              }}>
              {/* <Svg height="1" width="100%" style={{width: '100%', backgroundColor: 'white'}}>
                <Line x1="0" y1="0" x2="100%" y2="1" stroke="#55524E" strokeWidth="1" strokeDasharray={[4, 4]} />
              </Svg> */}
              <View
                style={{
                  // width: Dimensions.get('window').width,
                  backgroundColor: 'white',
                  paddingHorizontal: 24,
                  paddingTop: 28,
                  paddingBottom: 56,
                  borderWidth: 1,
                  borderColor: '#55524E',
                  borderStyle: 'dashed',
                  marginLeft: -3,
                  marginBottom: -2,
                  marginRight: -3,
                }}>
                <View style={styles.thoughtsBox}>
                  {(() => {
                    if (!ticketDetail?.only_me) {
                      return (
                        <View style={styles.thoughtsTextBox}>
                          <ScrollView style={{maxHeight: 140}}>
                            <Txt size={15} weight="regular" color={color_token.gray800}>
                              {ticketDetail?.memo}
                            </Txt>
                          </ScrollView>
                        </View>
                      )
                    }

                    if (ticketDetail?.only_me && profile.id === ticketDetail.writer) {
                      return (
                        <>
                          <View style={styles.onlyMeButtonBox}>
                            <FastImage
                              source={require('@/assets/icons/lock.png')}
                              style={styles.lockButton}
                              resizeMode="contain"
                            />
                            <Txt size={15} weight="bold" color={color_token.gray900}>
                              나만보기
                            </Txt>
                          </View>
                          <View style={styles.thoughtsTextBox}>
                            <ScrollView style={{maxHeight: 140}}>
                              <Txt size={15} weight="regular" color={color_token.gray800}>
                                {ticketDetail?.memo}
                              </Txt>
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

const _InfoRow = ({label, value}: {label: string; value?: string}) => {
  if (!value) return null
  return (
    <View style={styles.infoBox}>
      <Txt size={14} weight="regular" color={color_token.gray900} style={styles.infoLabel}>
        {label}
      </Txt>
      <View style={{flex: 1}}>
        <Txt size={14} weight="medium" color={color_token.gray800}>
          {value}
        </Txt>
      </View>
    </View>
  )
}

export {TicketFrame}

const styles = StyleSheet.create({
  editIcon: {
    width: size(24),
    height: size(24),
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: '#202020', // 삭제
    marginTop: size(2),
    gap: size(2.5),
  },
  resultImgBox: {
    flex: 1,
    backgroundColor: color_token.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: size(44),
    gap: size(8),
  },
  resultIcon: {
    width: size(27),
    height: size(28),
  },
  matchInfoBox: {
    width: '100%',
    backgroundColor: color_token.white,
    flexDirection: 'column',
    // marginVertical: 2, // 삭제
  },
  scoreBox: {
    width: '100%',
    // height: 90, // 삭제
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
    paddingTop: size(20),
    paddingBottom: size(24),
  },
  teamScoreBox: {
    flex: 1,
    flexDirection: 'column',
    gap: size(4),
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: size(30),
    paddingVertical: size(8),
    paddingHorizontal: size(22),
  },
  infoLabel: {
    width: size(95),
  },
  thoughtsBox: {
    width: '100%',
  },
  thoughtsTextBox: {
    marginTop: size(8),
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
    gap: size(5),
    alignItems: 'center',
  },
  lockButton: {
    width: size(20),
    height: size(20),
  },
})
