import {logEvent as logEventFirebase, getAnalytics} from '@react-native-firebase/analytics';
import {EventType, EVENT_TYPE} from './event';

const analytics = getAnalytics();

export const logEvent = (
  event: EventType | (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE],
  params: Record<string, any>,
) =>
  logEventFirebase(analytics, event, params)
    .then(() => console.log('logEvent :: success', event, params))
    .catch(error => console.error('logEvent :: error', error));
