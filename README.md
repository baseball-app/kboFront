# 오늘의야구 (KBO Front)

## ✨ 주요 기능

### 🏠 홈 화면 (캘린더)

- 월별 캘린더 뷰로 경기 일정 및 나의 관람 기록 확인
- 친구들의 최근 활동 확인
- 오늘의 경기 정보 표시

### ⚾ 경기 일정

- KBO 정규시즌 경기 일정 확인
- 경기별 상세 정보 제공
- 관심 팀 설정을 통한 맞춤형 경기 정보

### 🎫 나의 티켓박스

- 관람한 경기의 후기 및 감상 기록
- 경기 관람 티켓 인증 및 보관
- 나만의 야구 일기 작성 및 관리

### 📊 야구 정보

- KBO 리그 팀 순위 및 통계
- 경기 결과 및 주요 기록
- 야구 관련 최신 정보 제공

### 👤 마이 페이지

- 개인 프로필 및 응원팀 설정
- 나의 관람 통계 및 활동 기록
- 친구 관리 및 소셜 기능

## 🛠 기술 스택

### Frontend

- **React Native** (0.76.6) - 크로스 플랫폼 모바일 개발
- **Expo** (52.0.0) - 개발 환경 및 빌드 도구
- **Expo Router** - 파일 기반 네비게이션
- **TypeScript** - 정적 타입 체크

### 상태 관리

- **Zustand** - 전역 상태 관리
- **TanStack Query** - 서버 상태 관리
- **React Native MMKV** - 로컬 스토리지

### UI/UX

- **React Native Reanimated** - 애니메이션
- **React Native Gesture Handler** - 제스처 처리
- **Lottie React Native** - 벡터 애니메이션
- **React Native SVG** - SVG 지원

### 백엔드 연동

- **Axios** - HTTP 클라이언트
- **Firebase** - 푸시 알림, 애널리틱스
- **React Native Config** - 환경 변수 관리

### 인증 & 소셜

- **Apple Sign In** - iOS 애플 로그인
- 카카오톡, 네이버 소셜 로그인 지원

### 미디어 & 공유

- **Expo Image Picker** - 이미지 선택
- **React Native Share** - 콘텐츠 공유
- **React Native View Shot** - 화면 캡처

## 🏗 프로젝트 구조

```
kboFront/
├── app/                    # 라우팅 (Expo Router 기반)
│   ├── (tabs)/            # 탭 네비게이션
│   ├── auth/              # 인증 관련
│   ├── my/                # 마이페이지
│   ├── write/             # 티켓 작성
│   └── match/             # 경기 상세
├── components/            # 재사용 가능한 컴포넌트
├── hooks/                 # 커스텀 훅
├── api/                   # API 클라이언트
├── assets/                # 이미지, 폰트, 애니메이션
│   ├── team_logo/         # KBO 10개 팀 로고
│   ├── icons/             # 아이콘
│   └── lottie/            # 로티 애니메이션
├── constants/             # 상수 정의
├── utils/                 # 유틸리티 함수
├── types/                 # TypeScript 타입 정의
└── store/                 # 스토어 설정
```

## 🚀 시작하기

### 환경 요구사항

- Node.js 18+
- Yarn
- Expo CLI
- React Native 개발 환경 (Android Studio, Xcode)

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 시작
yarn start

# iOS 시뮬레이터에서 실행
yarn ios

# Android 에뮬레이터에서 실행
yarn android

# 웹 브라우저에서 실행
yarn web
```

### 환경별 실행

```bash
# 개발 환경
yarn start:dev
yarn android:dev

# 프로덕션 환경
yarn android:production
```

## 📦 빌드

### Android

```bash
# 개발 버전 빌드
yarn build:android:dev

# 프로덕션 버전 빌드
yarn build:android:production
```

## 🎯 지원하는 KBO 팀

- 두산 베어스
- 한화 이글스
- KIA 타이거즈
- 키움 히어로즈
- KT 위즈
- LG 트윈스
- 롯데 자이언츠
- NC 다이노스
- 삼성 라이온즈
- SSG 랜더스

## 🔧 개발 스크립트

- `yarn start` - Expo 개발 서버 시작
- `yarn test` - Jest 테스트 실행
- `yarn lint` - ESLint 검사

## 📱 플랫폼 지원

- ✅ iOS (iPhone, iPad)
- ✅ Android

## 🎨 스타일링 가이드

### color_token으로 대체할 수 없는 색상

다음 색상들은 특수한 용도로 사용되며 `color_token`으로 대체하지 않습니다:

#### 투명도가 적용된 색상
- `rgba(0, 0, 0, 0.5)` - 모달 오버레이
- `rgba(0, 0, 0, 0.08)` - 그림자 효과

#### Pressed 상태 색상 (Button 컴포넌트 내부)
- `#1A4FD4` - primary 버튼 pressed 상태
- `#061436` - secondary 버튼 pressed 상태
- `#1E5EF430` - outline_active 버튼 pressed 상태

#### 특수 투명도 색상
- 이미 `color_token.primary_10`으로 정의되어 있음 (`#1E5EF41A`)

---
