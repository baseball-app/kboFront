# 테스팅 트러블슈팅 가이드

Jest 테스트 실행 시 자주 발생하는 네이티브 모듈 에러와 해결 방법을 정리합니다.

## 네이티브 모듈 에러 해결

### react-native-reanimated

**에러**:

```
TypeError: _NativePlatformConstantsIOS.default.getConstants is not a function
```

**원인**: reanimated v4가 네이티브 iOS 모듈에 접근하려 하지만 Jest 환경에는 존재하지 않음. reanimated의 빌트인 `mock.js`도 내부적으로 실제 소스를 import하므로 동일한 에러 발생.

**해결**: `jest.setup.ts`에 수동 mock 등록. `useSharedValue`, `useAnimatedStyle`, `withTiming`, `Easing` 등 주요 API를 no-op으로 구현.

---

### @react-native-firebase/messaging (named export 누락)

**에러**:

```
TypeError: (0 , _messaging.getMessaging) is not a function
```

**원인**: 기존 mock이 `default` export만 제공하고 `getMessaging`, `getToken`, `onMessage` 등 named export를 포함하지 않음. Firebase messaging v21+에서는 named export 방식을 사용.

**해결**: mock에 named export 추가:

```ts
jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: () => mockInstance,
  getMessaging: jest.fn(() => mockInstance), // 추가
  getToken: jest.fn(), // 추가
  onMessage: jest.fn(), // 추가
  // ...
}));
```

---

### expo-linking (Platform.select 에러)

**에러**:

```
TypeError: Cannot read properties of undefined (reading 'select')
```

**원인**: `expo-linking`이 모듈 로드 시점에 `Platform.select`를 호출하는데, `jest.doMock('react-native', ...)`은 lazy mock이라 아직 적용되지 않은 상태.

**해결**: `expo-linking` 자체를 mock:

```ts
jest.mock('expo-linking', () => ({
  createURL: jest.fn(path => `exp://localhost/${path}`),
  parse: jest.fn(url => ({path: url, queryParams: {}})),
  openURL: jest.fn(),
  // ...
}));
```

---

## 테스트 작성 시 주의사항

### console.log 검증

`jest.setup.ts`에서 `console.log`를 emulator URL 로그 필터링용 wrapper로 교체합니다. 따라서 테스트에서 `console.log` 호출을 검증하려면 반드시 `jest.spyOn`을 사용해야 합니다:

```ts
// BAD - console.log는 mock이 아닌 wrapper 함수
expect(console.log).toHaveBeenCalledWith('test');

// GOOD
const spy = jest.spyOn(console, 'log').mockImplementation();
// ... 테스트 실행
expect(spy).toHaveBeenCalledWith('test');
spy.mockRestore();
```

### getByRole 쿼리

`@/shared`의 `Pressable` 컴포넌트는 기본적으로 `accessibilityRole`을 설정하지 않습니다. `getByRole('button')`을 사용하려면 테스트 대상 컴포넌트에 `accessibilityRole="button"`을 명시해야 합니다.

---

## 새 네이티브 모듈 mock 추가 절차

1. 테스트 실행 → 에러 메시지에서 실패하는 모듈 확인
2. 에러 스택에서 어떤 파일이 해당 모듈을 import하는지 추적 (직접 의존 vs 전이 의존)
3. `jest.setup.ts`에 `jest.mock('모듈명', () => ({ ... }))` 추가
4. 해당 모듈에서 테스트에 필요한 export만 최소한으로 mock
5. 빌트인 mock 파일(`모듈/mock.js`)이 있으면 먼저 시도, 실패 시 수동 mock 작성
