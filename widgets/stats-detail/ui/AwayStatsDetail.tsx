import React from 'react'
import {DetailSummary} from './DetailSummary'

function AwayStatsDetail({is_homeballpark}: {is_homeballpark: boolean}) {
  // const {data} = useHomeAwayWinPercentByYear({year: 2025})
  return <DetailSummary title="원정 승률" percent={100} win={10} draw={0} lose={0} />
}

export {AwayStatsDetail}
