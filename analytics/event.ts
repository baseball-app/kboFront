export const EVENTS = {
  DIARY_CREATE: 'diary_create',
  DIARY_EDIT: 'diary_edit',
  DIARY_DELETE: 'diary_delete',
  DIARY_SHARE: 'diary_share',
  WIN_PREDICTION_VIEW: 'win_prediction_view',
  WIN_PREDICTION_SUBMIT: 'win_prediction_submit',
  APP_OPEN: 'app_open',
  SESSION_DURATION: 'session_duration',
  SCREEN_VIEW: 'screen_view',
}

export type EventType = (typeof EVENTS)[keyof typeof EVENTS]
