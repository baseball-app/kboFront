import {useSelectedStatsFilter} from '@/entities/stat'

const useSelectStatsType = () => {
  const {selectedStatsFilter, onChangeType} = useSelectedStatsFilter()

  return {selectedStatsFilter, onChangeType}
}

export {useSelectStatsType}
