import {logEvent as logEventFirebase, getAnalytics} from '@react-native-firebase/analytics';
import {EventType, EVENT_TYPE} from './event';
import {Config} from '@/config/Config';

const analytics = getAnalytics();

export const logEvent = (
  event: EventType | (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE],
  params: Record<string, any>,
) => {
  if (params.mode) throw new Error('mode는 직접 설정할 수 없습니다.');

  return logEventFirebase(analytics, event, {...params, mode: Config.MODE})
    .then(() => console.log('logEvent :: success', event, {...params, mode: Config.MODE}))
    .catch(error => console.error('logEvent :: error', error));
};
