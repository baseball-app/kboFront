// 캘린더 화면
const CALENDAR_TAB = '/(tabs)'

// 경기일정 탭
const MATCH_TAB = '/(tabs)/match'

// 티켓 탭
const TICKET_TAB = '/(tabs)/ticket'

// 알림 탭
// ! deprecated
const ALARM_TAB = '/(tabs)/alarm'

const STATS_TAB = '/(tabs)/stats'
const STATS_DETAIL = '/(tabs)/stats/detail'

// 랭킹 탭
const RANK_TAB = '/(tabs)/rank'

// 마이 탭
const MY_TAB = '/(tabs)/my'

// 첫 로그인 화면
const AUTH_LOGIN = '/auth/login'

// 서비스 이용약관 동의 받는 페이지
const AUTH_TERM_OF_SERVICE = '/auth/term-of-service'

// 개인정보 처리방침
const AUTH_PRIVACY_POLICY = '/auth/term-of-service/privacy-policy'

// 서비스 이용약관
const AUTH_TERMS_OF_SERVICE = '/auth/term-of-service/terms-of-service'

// 회원가입 - 마이팀 선택화면
const AUTH_TEAM = '/auth/my-team'

// 회원가입 - 닉네임 설정 화면
const AUTH_NICKNAME = '/auth/nickname'

// 회원가입 - 프로필 이미지 설정 화면
const AUTH_PROFILE = '/auth/profile-image'

// MY 페이지들
const MY_ALARM = '/my/alarm'
const MY_CHANGE_NICKNAME = '/my/change-nickname'
const MY_CHANGE_TEAM = '/my/change-team'
const MY_INQUIRY = '/my/inquiry'
const MY_TERMS = '/my/terms'
const MY_TERMS_PRIVACY_POLICY = '/my/terms/privacy-policy'
const MY_TERMS_OF_SERVICE = '/my/terms/terms-of-service'

// MY 팔로워 페이지
// TODO: 해결방법 찾기 /my/[id] -> 타입 어떻게 되어야 하는지?
const MY_FOLLOWERS = '/my/followers' as any

// MY 팔로잉 페이지
const MY_FOLLOWINGS = '/my/followings' as any

// TICKET 페이지들
const TICKET_MY_STAT = '/ticket/my-stat'

// WRITE 페이지들
const WRITE = '/write'
const WRITE_EDIT = '/write/edit'
const WRITE_TICKET = '/write/ticket'
const WRITE_TODAY_TICKET_CARD = '/write/todayTicketCard'

export {
  CALENDAR_TAB,
  MATCH_TAB,
  TICKET_TAB,
  ALARM_TAB,
  STATS_TAB,
  RANK_TAB,
  MY_TAB,
  AUTH_LOGIN,
  AUTH_TERM_OF_SERVICE,
  AUTH_PRIVACY_POLICY,
  AUTH_TERMS_OF_SERVICE,
  AUTH_TEAM,
  AUTH_NICKNAME,
  AUTH_PROFILE,
  MY_ALARM,
  MY_CHANGE_NICKNAME,
  MY_CHANGE_TEAM,
  MY_INQUIRY,
  MY_TERMS,
  MY_TERMS_PRIVACY_POLICY,
  MY_TERMS_OF_SERVICE,
  TICKET_MY_STAT,
  WRITE,
  WRITE_EDIT,
  WRITE_TICKET,
  WRITE_TODAY_TICKET_CARD,
  MY_FOLLOWERS,
  MY_FOLLOWINGS,
  STATS_DETAIL,
}
