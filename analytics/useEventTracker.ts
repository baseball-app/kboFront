import {EVENT_TYPE, EventType} from './event';
import {useSegments} from 'expo-router';
import {useProfile} from '@/entities/user';
import {logEvent} from './func';
import dayjs from 'dayjs';

const useEventTracker = () => {
  const segments = useSegments();
  const {profile} = useProfile();

  function _logEvent(
    eventType: EventType | (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE],
    eventName: string,
    params: Record<string, any>,
  ) {
    logEvent(eventType, {
      event_name: eventName,
      screen_name: segments.join('/'),
      tracking_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      my_team: profile.my_team?.name,
      ...params,
    });
  }

  return {
    logEvent: _logEvent,
  };
};

export {useEventTracker};
