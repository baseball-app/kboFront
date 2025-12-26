import {uploadFile} from '@/api'

export const createTicket = async (data: FormData) => {
  try {
    return uploadFile<{id: number}>(`/tickets/ticket_add/`, data)
  } catch (error) {
    //
  }
}

await FileSystemLegacy.uploadAsync(`${Config.API_URL}/tickets/ticket_add/`, resizedImage.uri, {
  fieldName: 'image',
  uploadType: FileSystemLegacy.FileSystemUploadType.MULTIPART,
  parameters: {
    date: dayjs(writeStore.selectedDate).format('YYYY-MM-DD'),
    game: String(writeStore.selectedMatch?.id || ''),
    result: writeStore.selectedMatchResult === '경기 취소' ? '취소' : writeStore.selectedMatchResult,
    weather: writeStore.selectedWeather,
    is_ballpark: JSON.stringify(tabMenu === '직관'),
    score_our: writeData.todayScore.our,
    score_opponent: writeData.todayScore.opponent,
    starting_pitchers: writeData.matchPlayer,
    gip_place: tabMenu === '직관' ? ballparkInfo?.name || writeData.matchPlace : writeData.matchPlace,
    food: writeData.todayFood,
    memo: writeData.todayThoughts,
    is_homeballpark: JSON.stringify(tabMenu === '집관'),
    only_me: JSON.stringify(writeData.onlyMeCheck),
    is_double: JSON.stringify(isDirectWrite),
    hometeam_id: String(writeStore.selectedMatch?.team_home_info.id || profile.my_team?.id),
    awayteam_id: String(writeStore.selectedMatch?.team_away_info.id || writeData.matchTeam?.id),
    direct_yn: JSON.stringify(isDirectWrite),
    is_cheer: JSON.stringify(isCheer),
  },
  headers: {
    'X-KBOAPP-TOKEN': user?.accessToken || '',
  },
})
