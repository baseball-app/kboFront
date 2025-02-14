import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'

interface IGameInfoCard {
  matchSchedule?: string
}

const GameInfoCard = (props: IGameInfoCard) => {
  const {matchSchedule} = props
  return (
    <View style={styles.container}>
      {matchSchedule ? (
        <View style={styles.gameInfoBox}>
          <Text>{matchSchedule}</Text>
          <View style={styles.matchTeamBox}>
            <View style={styles.matchTeamInfo}>
              <Image source={require('@/assets/team_logo/SSG.png')} resizeMode="contain" />
              <View style={styles.ellipseBox}>
                <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" />
                <Image source={require('@/assets/icons/ellipse.png')} resizeMode="contain" />
              </View>
              <Image source={require('@/assets/team_logo/KT.png')} resizeMode="contain" />
            </View>
            <View style={styles.teamNameBox}>
              <Text style={styles.teamText}>SSG</Text>
              <Text style={styles.teamText}>KT</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noGameInfoBox}>
          <Text style={styles.noGameText}>경기 일정이 없어요.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.seeMoreButton}>
        <View style={styles.imgBox}>
          <Image source={require('@/assets/icons/see-more-calendar.png')} resizeMode="contain" />
        </View>
        <Text style={styles.buttonText}>경기일정 더보기</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00184F',
    borderRadius: 10,
    width: '100%',
    height: 175,
    marginTop: 12,
    marginBottom: 12,
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
    height: 113,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
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

export default GameInfoCard
