import {TextStyle} from 'react-native'

const color_token = {
  primary: '#1E5EF4',
  primary_10: '#1E5EF41A',
  secondary: '#081B46',
  secondary_10: '#21376C',
  black: '#000000',
  white: '#FFFFFF',
  gray100: '#FCFCFC',
  gray150: '#F3F3F4',
  gray200: '#EEEFF3',
  gray300: '#E4E4E5',
  gray350: '#C7C9D0',
  gray400: '#B3B4B9',
  gray500: '#8B8C95',
  gray600: '#6D6C77',
  gray700: '#505056',
  gray800: '#353430',
  gray900: '#161617',
  team_lg: '#C1163A',
  team_kt: '#4B4B4B',
  team_ssg: '#FDD484',
  team_nc: '#17477D',
  team_doosan: '#161332',
  team_kia: '#E61A1E',
  team_lotte: '#62AEDB',
  team_hanhwa: '#FF5A08',
  team_kiwoom: '#810924',
  team_samsung: '#2273FE',
  win: '#00A67D',
  cancel: '#7D8494',
  draw: '#FF9151',
  lose: '#F96A63',

  //
} as const

const color = {
  title: color_token.gray900,
  general_text: color_token.gray900,
  description_text: color_token.gray600,

  // button
  primary_button_bg: color_token.primary,
  primary_button_text: color_token.white,
  primary_button_border: color_token.primary,

  disabled_button_bg: color_token.gray300,
  disabled_button_text: color_token.gray600,
  disabled_button_border: color_token.gray300,

  secondary_button_bg: color_token.secondary,
  secondary_button_text: color_token.white,
  secondary_button_border: color_token.secondary,

  outline_button_bg: color_token.white,
  outline_button_text: color_token.gray900,
  outline_button_border: color_token.gray350,

  outline_button_active_border: color_token.primary,
  outline_button_active_text: color_token.primary,
  outline_button_active_bg: color_token.primary_10,

  // input
  input_placeholder: color_token.gray400,
  input_inactive_border: color_token.gray300,
  input_active_border: color_token.gray900,
  input_active_text: color_token.gray800,

  // profile
  profile_bg: color_token.gray150,
  profile_border: color_token.gray350,
  profile_active_border: color_token.gray800,
  profile_active_bg: color_token.gray100,
  profile_selected_border: color_token.secondary_10,

  // modal
  modal_bg: color_token.white,
  modal_content: color_token.gray800,
  modal_button_bg: color_token.primary,

  // bottom sheet
  bottom_sheet_bg: color_token.white,

  // calendar
  selected_calendar_border: color_token.gray500,
  calendar_other_month_text: color_token.gray400,
  calendar_day_text: color_token.gray600,
  sunday: '#FF0000',
  weekday: color_token.black,
  saturday: color_token.primary,
  today_calendar_bg: color_token.black,
  today_calendar_text: color_token.white,

  week_calendar_today_border: color_token.gray900,
  week_calendar_today_text: color_token.white,
  week_calendar_selected_border: color_token.gray900,
  week_calendar_selected_bg: color_token.gray900,
  week_calendar_selected_text: color_token.white,

  // card
  card_bg: color_token.white,
  card_border: color_token.gray300,
  card_active_border: color_token.gray800,

  ellipse_bg: color_token.gray400,
  tag_inactive_bg: color_token.gray200,

  team_tag_inactive_bg: color_token.gray200,
  team_tag_inactive_border: color_token.gray300,
  team_tag_inactive_text: color_token.gray900,

  team_tag_active_bg: color_token.primary_10,
  team_tag_active_border: color_token.primary,
  team_tag_active_text: color_token.primary,
}

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
} as const

const fontSize = {
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  32: 32,
} as const

type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extraBold'
type FontSize = 12 | 14 | 16 | 18 | 20 | 24 | 32
type LineHeight = 100 | 120 | 140

type Font = `${FontWeight}-${FontSize}` | `${FontWeight}-${FontSize}-${LineHeight}`

const font = (font: Font): TextStyle => {
  const [weight, size, lineHeight] = font.split('-') as [FontWeight, FontSize, LineHeight]

  return {
    fontWeight: fontWeight[weight],
    fontSize: fontSize[size],
    lineHeight: ((lineHeight ?? 140) / 100) * fontSize[size],
  }
}

export {font, color_token}
