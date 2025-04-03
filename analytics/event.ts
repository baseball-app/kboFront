import {create} from 'zustand'

export const EVENTS = {
  DIARY_CREATE: 'diary_create',
  DIARY_EDIT: 'diary_edit',
  WIN_PREDICTION_CLICK: 'winpower_button_click',
  SCREEN_VIEW: 'screen_view',
  FRIEND_PROFILE_VIEW: 'friend_profile_view',
  TICKET_REACTION: 'ticket_reaction',
}

export type EventType = (typeof EVENTS)[keyof typeof EVENTS]

export const useAnalyticsStore = create<{
  diary_create: string
  screen_name: string
  setScreenName: (screenName: string) => void
  setDiaryCreate: (diaryCreate: string) => void
}>(set => ({
  diary_create: '메인 버튼',
  screen_name: '',
  setScreenName: (screenName: string) => set({screen_name: screenName}),
  setDiaryCreate: (diaryCreate: string) => set({diary_create: diaryCreate}),
}))
