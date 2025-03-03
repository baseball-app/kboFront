import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {TicketCalendarLog} from './home/Calendar'

const moodColors: any = {
  승리: require('@/assets/icons/emo/win.png'),
  패배: require('@/assets/icons/emo/lose.png'),
  무승부: require('@/assets/icons/emo/draw.png'),
  '경기 취소': require('@/assets/icons/emo/cancel.png'),
}

//TODO: 애니메이션 및 컴포넌트 리팩터링 필요함
const MatchResultCell = ({data, onPress}: {data: TicketCalendarLog[]; onPress: () => void}) => {
  const matchResult = data[0]?.result

  return (
    <View
      style={{
        width: 28,
        overflow: 'hidden',
      }}>
      {matchResult ? (
        <>
          <TouchableOpacity onPress={onPress}>
            <Image source={moodColors[matchResult as keyof typeof moodColors]} style={styles.moodContainer} />
          </TouchableOpacity>
          {data.length > 1 && (
            <View style={{flexDirection: 'row', gap: 3, justifyContent: 'center'}}>
              <View style={[styles.swiperDot, styles.swiperDotActive]} />
              <View style={[styles.swiperDot, styles.swiperDotActive]} />
            </View>
          )}
        </>
      ) : (
        <View style={[styles.moodContainer]} />
      )}
    </View>
  )
}

export default MatchResultCell

const styles = StyleSheet.create({
  moodContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 4,
  },
  swiperDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#D0CEC7',
  },
  swiperDotActive: {
    backgroundColor: '#1E5EF4',
  },
})
