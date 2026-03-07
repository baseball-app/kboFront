import {fireEvent, render} from '@testing-library/react-native';
import {EventTracker} from './EventTracker';
import {Pressable} from '@/shared';

import * as func from './func';
import * as router from 'expo-router';
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
    });
  });
  it('EventTracker로 감싸진 컴포넌트가 터치될 경우, 이벤트가 로깅되어야 합니다.', () => {
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
      test: 'test',
    });
  });
});
