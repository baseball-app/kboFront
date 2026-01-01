// interface TicketRegisterDto {
//   date: string
//   game: string
//   result: string
//   weather: string
//   is_ballpark: boolean
//   score_our: number
//   score_opponent: number
//   starting_pitchers: string
//   gip_place: string
//   food: string
//   memo: string
//   is_homeballpark: boolean
// }

// class TicketRegisterDtoImpl implements TicketRegisterDto {
//   date: string
//   game: string
//   result: string
//   weather: string
//   is_ballpark: boolean
//   score_our: number
//   score_opponent: number
//   starting_pitchers: string
//   gip_place: string
//   food: string
//   memo: string
//   is_homeballpark: boolean
// }

interface TicketRegisterRequestDto {
  date: Date

  game: number
  hometeam_id: number
  awayteam_id: number

  result: string
  weather: string

  score_our: number
  score_opponent: number

  starting_pitchers: string
  gip_place: string
  food: string
  memo: string
  only_me: boolean
  image: string
  is_cheer: boolean

  // 자동으로 계산되는 데이터들
  direct_yn: boolean
  is_double: boolean

  is_ballpark: boolean // 직관 or 집관
  is_homeballpark: boolean // 홈 or 어웨이
}

const TicketRegisterRequestMapper = (data: TicketRegisterRequestDto): FormData => {
  const formData = new FormData()

  return formData
}

export {TicketFormDataMapper, TicketRegisterRequestDto} from './TicketFormDataMapper'
