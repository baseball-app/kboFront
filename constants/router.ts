import {Href} from 'expo-router'

interface ITabRoutes {
  CALENDAR: Href
  MATCH: Href
  TICKET: Href
  RANK: Href
  MY: Href
}
/** 라우터 경로 관련 상수 */
export const router_address: {TAB: ITabRoutes} = {
  TAB: {
    CALENDAR: '/(tabs)',
    MATCH: '/(tabs)/match',
    TICKET: '/(tabs)/ticket',
    RANK: '/(tabs)/rank',
    MY: '/(tabs)/my',
  },
}
