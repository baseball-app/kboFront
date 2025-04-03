import analytics from '@react-native-firebase/analytics'
import {EventType} from './event'

export const logEvent = (event: EventType, params: Record<string, any>) =>
  analytics()
    .logEvent(event, params)
    .then(() => console.log('logEvent :: success', event, params))
    .catch(error => console.error('logEvent :: error', error))
