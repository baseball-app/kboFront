import {useSelectedStatsFilter} from '@/entities/stat'

const useSelectStatsSeason = () => {
  const {selectedStatsFilter, onChangeSeasonYear} = useSelectedStatsFilter()

  return {selectedStatsFilter, onChangeSeasonYear}
}

export {useSelectStatsSeason}
