import React from 'react';
import {logEvent} from './func';
import {useSegments} from 'expo-router';
import {EVENT_TYPE} from './event';

type EventTrackerProps = {
  children: React.ReactElement;
  eventName: string;
  params?: Record<string, any>;
};

const EventTracker = ({children, eventName, params}: EventTrackerProps) => {
  // 자식이 하나인지 확인
  const child = React.Children.only(children) as React.ReactElement<{onPress?: () => void}>;
  const segments = useSegments();

  return React.cloneElement(child, {
    onPress: (...args: any[]) => {
      logEvent(EVENT_TYPE.CLICK_EVENT, {event_name: eventName, screen_name: segments.join('/'), ...params});
      // 자식이 원래 가지고 있던 onPress 실행
      if ((child.props as any)?.onPress) {
        (child.props as any).onPress(...args);
      }
    },
  });
};

export {EventTracker};
