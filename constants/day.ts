import dayjs from 'dayjs'
export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export const CALENDAR_START_DATE = dayjs('2024-01-01')
export const CALENDAR_END_DATE = dayjs(`${dayjs().year() + 1}-12-31`)
