import {fireEvent, render} from '@testing-library/react-native';
import {EventTracker} from './EventTracker';
import {Pressable} from '@/shared';

import * as func from './func';
import * as router from 'expo-router';

jest.mock('@/entities/user', () => ({
  useProfile: () => ({
    profile: {my_team: {name: 'LG'}},
  }),
}));

const FIXED_TIME = '2026-03-07 12:00:00';
jest.mock('dayjs', () => {
  const original = jest.requireActual('dayjs');
  const mockDayjs = (...args: any[]) => {
    const instance = (original as any)(...args);
    instance.format = jest.fn(() => FIXED_TIME);
    return instance;
  };
  Object.assign(mockDayjs, original);
  return {__esModule: true, default: mockDayjs};
});

describe('EventTracker', () => {
  let logEventSpy: jest.SpyInstance;
  let segmentsSpy: jest.SpyInstance;
  beforeEach(() => {
    logEventSpy = jest.spyOn(func, 'logEvent').mockImplementation();
    segmentsSpy = jest.spyOn(router, 'useSegments').mockImplementation(() => ['test'] as any) as jest.Mock;
  });
  afterEach(() => {
    logEventSpy.mockRestore();
    segmentsSpy.mockRestore();
  });

  it('EventTracker로 감싸진 컴포넌트가 터치될 경우, 이벤트가 로깅되어야 합니다.', () => {
    const eventName = 'test_event';
    const child = <Pressable accessibilityRole="button" />;
    const wrapper = render(<EventTracker eventName={eventName}>{child}</EventTracker>);
    fireEvent(wrapper.getByRole('button'), 'press');

    expect(logEventSpy).toHaveBeenCalledWith('click_event', {
      event_name: eventName,
      screen_name: 'test',
      tracking_time: FIXED_TIME,
      my_team: 'LG',
    });
  });
  it('EventTracker로 감싸진 컴포넌트가 터치될 경우, 추가 params도 함께 로깅되어야 합니다.', () => {
    const eventName = 'test_event';
    const child = <Pressable accessibilityRole="button" />;
    const wrapper = render(
      <EventTracker eventName={eventName} params={{test: 'test'}}>
        {child}
      </EventTracker>,
    );
    fireEvent(wrapper.getByRole('button'), 'press');

    expect(logEventSpy).toHaveBeenCalledWith('click_event', {
      event_name: eventName,
      screen_name: 'test',
      tracking_time: FIXED_TIME,
      my_team: 'LG',
      test: 'test',
    });
  });
});
