import React from 'react'
import {DetailSummary} from './DetailSummary'
import {View} from 'react-native'

function HomeStatsDetail({is_homeballpark}: {is_homeballpark: boolean}) {
  // const {data} = useHomeAwayWinPercentByYear({year: 2025})
  return (
    <View>
      <DetailSummary title="홈 승률" percent={100} win={10} draw={0} lose={0} />
    </View>
  )
}

export {HomeStatsDetail}
