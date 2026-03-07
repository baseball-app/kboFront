import React from 'react';
import {EVENT_TYPE} from './event';
import {useEventTracker} from './useEventTracker';

type EventTrackerProps = {
  children: React.ReactElement;
  eventName: string;
  params?: Record<string, any>;
};

/**
 * 기본으로 추적되는 이벤트는 아래와 같다.
 *
 * - event_name: 이벤트 이름
 * - screen_name: 현재 화면 이름
 * - tracking_time: 이벤트 추적 시간
 * - my_team: 현재 유저의 팀 이름
 *
 * @param children 이벤트를 추적할 컴포넌트
 * @param eventName 이벤트 이름
 * @param params 이벤트 파라미터
 * @returns
 */
const EventTracker = ({children, eventName, params}: EventTrackerProps) => {
  // 자식이 하나인지 확인
  const child = React.Children.only(children) as React.ReactElement<{onPress?: () => void}>;
  const {logEvent} = useEventTracker();

  return React.cloneElement(child, {
    onPress: (...args: any[]) => {
      logEvent(EVENT_TYPE.CLICK_EVENT, eventName, {
        ...params,
      });
      // 자식이 원래 가지고 있던 onPress 실행
      if ((child.props as any)?.onPress) {
        (child.props as any).onPress(...args);
      }
    },
  });
};

export {EventTracker};
