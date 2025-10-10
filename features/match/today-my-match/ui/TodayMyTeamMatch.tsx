import {DAYS_OF_WEEK} from '@/constants/day'
import dayjs from 'dayjs'
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import {ROUTES, useAppRouter} from '@/shared'
import {TeamWithInfo, useMatch, useTeam} from '@/entities/match'
import useProfile from '@/hooks/my/useProfile'

const TodayMyTeamMatch = () => {
  const {matchingList} = useMatch({selectedDate: new Date()})
  const {profile} = useProfile()

  const todayMyTeamMatch = matchingList //
    .find(({team_away_info, team_home_info}) => {
      return team_away_info.id === profile.my_team?.id || team_home_info.id === profile.my_team?.id
    })

  const {findTeamById} = useTeam()

  const router = useAppRouter()

  const home_info = findTeamById(todayMyTeamMatch?.team_home_info.id)
  const away_info = findTeamById(todayMyTeamMatch?.team_away_info.id)

  const game_date = dayjs(todayMyTeamMatch?.game_date)
  const weekDay = DAYS_OF_WEEK[game_date.day()]
  const title = `${game_date.format(`M월D일(${weekDay}) HH:mm`)}`

  return (
    <View style={styles.container}>
      {todayMyTeamMatch ? (
        <MatchInfo
          title={title}
          home_info={home_info}
          away_info={away_info}
          ballpark_name={todayMyTeamMatch.ballpark_info.name.slice(0, 2)}
        />
      ) : (
        <EmptyMatch myTeamName={profile.my_team?.name || ''} />
      )}

      <TouchableOpacity style={styles.seeMoreButton} onPress={() => router.navigate(ROUTES.MATCH_TAB)}>
        <View style={styles.imgBox}>
          <Image
            source={require('@/assets/icons/see-more-calendar.png')}
            resizeMode="contain"
            style={{width: 24, height: 24}}
          />
        </View>
        <Text style={styles.buttonText}>경기일정 더보기</Text>
      </TouchableOpacity>
    </View>
  )
}

const MatchInfo = ({
  title,
  home_info,
  away_info,
  ballpark_name,
}: {
  title: string
  home_info: TeamWithInfo | undefined
  away_info: TeamWithInfo | undefined
  ballpark_name: string
}) => {
  return (
    <View style={styles.gameInfoBox}>
      <View style={styles.titleSection}>
        <Text style={styles.date}>{title}</Text>
        <Text style={styles.location}>{` ・ ${ballpark_name.slice(0, 2)}`}</Text>
      </View>
      <View style={styles.matchTeamBox}>
        <View style={styles.matchTeamInfo}>
          <Image source={home_info?.logo} resizeMode="contain" style={{width: 35, height: 35}} />
          <View style={styles.ellipseBox}>
            <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" style={{width: 5, height: 5}} />
            <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" style={{width: 5, height: 5}} />
          </View>
          <Image source={away_info?.logo} resizeMode="contain" style={{width: 35, height: 35}} />
        </View>
        <View style={styles.teamNameBox}>
          <Text style={styles.teamText}>{home_info?.short_name}</Text>
          <Text style={styles.teamText}>{away_info?.short_name}</Text>
        </View>
      </View>
    </View>
  )
}

const EmptyMatch = ({myTeamName}: {myTeamName: string}) => {
  return (
    <View style={styles.noGameInfoBox}>
      <Text style={styles.noGameText}>
        <Text style={{fontWeight: 'bold'}}>{myTeamName}</Text>의 경기 일정이 없어요.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00184F',
    borderRadius: 10,
    width: '100%',
    marginTop: 12,
    marginBottom: 26,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameInfoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  location: {
    color: '#77756C',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  date: {
    color: '#171716',
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontWeight: '500',
  },
  noGameInfoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    height: 113,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noGameText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22.4,
    color: '#000',
  },
  matchTeamBox: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  matchTeamInfo: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
  },
  ellipseBox: {
    flexDirection: 'column',
    gap: 6,
    justifyContent: 'center',
  },
  teamNameBox: {
    width: '100%',
    flexDirection: 'row',
    gap: 45,
    justifyContent: 'center',
    marginTop: 4,
  },
  seeMoreButton: {
    width: 133,
    height: 26,
    borderRadius: 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 13,
    color: '#353430',
  },
  teamText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
    textAlign: 'center',
    width: 35,
  },
})

export {TodayMyTeamMatch}
