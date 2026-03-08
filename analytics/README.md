# Analytics

> Firebase Analytics 기반 이벤트 트래킹 모듈

## 구조

| 파일                 | 역할                                                     |
| -------------------- | -------------------------------------------------------- |
| `event.ts`           | 이벤트 타입 상수 (`EVENT_TYPE`, `EVENTS`), Zustand store |
| `func.ts`            | Firebase `logEvent` 래퍼 (mode 자동 주입)                |
| `EventTracker.tsx`   | 선언적 클릭 이벤트 래핑 컴포넌트                         |
| `useEventTracker.ts` | 프로그래밍 방식 이벤트 훅 (공통 데이터 자동 주입)        |

## 자동 주입되는 공통 데이터

모든 이벤트에 아래 데이터가 자동으로 포함된다:

- `event_name` — 이벤트 이름
- `screen_name` — 현재 화면 경로 (expo-router segments)
- `tracking_time` — 이벤트 발생 시각 (`YYYY-MM-DD HH:mm:ss`)
- `카테고리` - 직관일기 작성 프로세스
- `my_team` — 유저의 응원팀 이름
- `mode` — 앱 환경 (func.ts에서 자동 주입)

## 사용법

### 1. 선언적 방식 — `<EventTracker>`

`onPress`가 있는 컴포넌트를 래핑하면 클릭 시 자동으로 이벤트가 발생한다.

```tsx
import {EventTracker} from '@/analytics/EventTracker';

<EventTracker eventName="팔로워">
  <Pressable onPress={() => router.push(ROUTES.MY_FOLLOWERS)}>
    <Txt>팔로워</Txt>
  </Pressable>
</EventTracker>

// 커스텀 params 전달
<EventTracker eventName="경기 구단별 선택" params={{team_name: name}}>
  <Pressable onPress={onClick}>...</Pressable>
</EventTracker>
```

### 2. 프로그래밍 방식 — `useEventTracker`

콜백 내에서 직접 이벤트를 호출해야 할 때 사용한다.

```tsx
import {useEventTracker} from '@/analytics/useEventTracker';
import {EVENT_TYPE} from '@/analytics/event';

const {logEvent} = useEventTracker();

logEvent(EVENT_TYPE.CLICK_EVENT, '카테고리 변경', {category: value});
```

## 주의사항

- `params`에 `mode`를 직접 전달하면 에러가 발생한다 (`func.ts`에서 자동 주입됨).
- `EventTracker`는 자식이 반드시 **하나**여야 한다 (`React.Children.only` 사용).
- `EventTracker`는 자식의 `onPress`를 가로채서 이벤트를 먼저 발생시킨 후 원래 `onPress`를 실행한다.
