import {logEvent as logEventFirebase, getAnalytics} from '@react-native-firebase/analytics';
import {EventType} from './event';

const analytics = getAnalytics();

export const logEvent = (event: EventType, params: Record<string, any>) =>
  logEventFirebase(analytics, event, params)
    .then(() => console.log('logEvent :: success', event, params))
    .catch(error => console.error('logEvent :: error', error));
