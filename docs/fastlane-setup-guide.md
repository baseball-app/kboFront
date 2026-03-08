# Fastlane 연동 가이드 — 오늘의야구 (KBO App)

> React Native 0.81.5 + Expo ~54.0.0 프로젝트에 Fastlane을 도입하여 로컬에서 iOS/Android 빌드·배포를 자동화하는 가이드.
> iOS 코드 사이닝은 Xcode Automatic Signing을 그대로 사용한다.

---

## 목차

1. [개요](#1-개요)
2. [사전 준비](#2-사전-준비)
3. [설치](#3-설치)
4. [디렉토리 구조](#4-디렉토리-구조)
5. [설정 파일](#5-설정-파일)
6. [App Store Connect API Key](#6-app-store-connect-api-key)
7. [Google Play Service Account](#7-google-play-service-account)
8. [Fastfile (빌드 & 배포 Lanes)](#8-fastfile-빌드--배포-lanes)
9. [사용법](#9-사용법)
10. [.gitignore 추가 항목](#10-gitignore-추가-항목)
11. [트러블슈팅](#11-트러블슈팅)

---

## 1. 개요

### 현재 프로젝트 구성

| 항목                | iOS                               | Android                               |
| ------------------- | --------------------------------- | ------------------------------------- |
| Bundle ID (prod)    | `xyz.kboapp`                      | `xyz.kboapp`                          |
| Bundle ID (staging) | `xyz.kboapp.staging`              | `xyz.kboapp.staging`                  |
| 버전                | 1.5.5 (build 89)                  | 1.5.5 (versionCode 89)               |
| 사이닝              | Automatic (Team `3377LPQ56P`)     | Release keystore (`local.properties`) |
| 스킴/Flavor         | ReleaseProduction, ReleaseStaging | `production`, `dev`                   |
| 환경 파일           | `.env.production`, `.env.dev`     | 동일                                  |

### Fastlane이 자동화하는 것

- iOS: 빌드 (gym) → TestFlight/App Store 업로드 (Xcode Automatic Signing 사용)
- Android: AAB 빌드 (gradle) → Play Store Internal/Production 업로드
- 공통: 버전/빌드넘버 동기화, Git 태깅

---

## 2. 사전 준비

### 필수 요구사항

- **Ruby** 3.0+ (`ruby -v`로 확인, macOS 기본 Ruby는 오래되었을 수 있음)
- **Xcode** 최신 버전 + Command Line Tools
- **Java 17** (Android 빌드용)
- **Apple Developer Program** 등록 완료
- **Google Play Console** 접근 권한

### Ruby 설치 (권장)

```bash
# rbenv 사용 권장
brew install rbenv ruby-build
rbenv install 3.3.6
rbenv global 3.3.6

# 확인
ruby -v  # 3.3.6
```

---

## 3. 설치

### Gemfile (프로젝트 루트에 이미 생성됨)

```ruby
# Gemfile
source "https://rubygems.org"

gem "fastlane", "~> 2.225"
gem "cocoapods", "~> 1.16"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
```

### 설치 실행

```bash
gem install bundler
bundle install
```

---

## 4. 디렉토리 구조

```
kboFront/
├── Gemfile
├── Gemfile.lock
└── fastlane/
    ├── Appfile                  # 앱 식별자, Apple ID
    ├── Fastfile                 # 빌드/배포 lanes
    ├── Pluginfile               # 플러그인 목록
    ├── .env.default             # 공통 환경변수 (커밋 O)
    ├── .env.staging             # 스테이징 환경 (커밋 X)
    └── .env.production          # 프로덕션 환경 (커밋 X)
```

---

## 5. 설정 파일

### Appfile

```ruby
# fastlane/Appfile

app_identifier ENV["APP_IDENTIFIER"]
apple_id ENV["APPLE_ID"]
itc_team_id ENV["ITC_TEAM_ID"]
team_id "3377LPQ56P"

# Android
json_key_file ENV["GOOGLE_PLAY_JSON_KEY_PATH"]
```

### 환경변수 파일

**`fastlane/.env.default`** (공통, Git 커밋):

```bash
# Apple
APPLE_ID=younakyoung25@gmail.com
ITC_TEAM_ID=127623349
TEAM_ID=3377LPQ56P

# Project
IOS_WORKSPACE=ios/kboFront.xcworkspace
IOS_PROJECT=ios/kboFront.xcodeproj
```

**`fastlane/.env.staging`** (Git 커밋 X):

```bash
APP_IDENTIFIER=xyz.kboapp.staging
IOS_SCHEME=ReleaseStaging
ANDROID_FLAVOR=dev
ENVFILE=.env.dev
```

**`fastlane/.env.production`** (Git 커밋 X):

```bash
APP_IDENTIFIER=xyz.kboapp
IOS_SCHEME=ReleaseProduction
ANDROID_FLAVOR=production
ENVFILE=.env.production
```

---

## 6. App Store Connect API Key

세션 기반 인증 대신 API Key를 사용하면 2FA 문제를 회피하고 안정적으로 동작합니다.

### 생성 방법

1. [App Store Connect](https://appstoreconnect.apple.com) → 사용자 및 액세스 → 통합 → App Store Connect API
2. **키 생성** 클릭
3. 이름: `Fastlane`, 역할: `앱 관리자`
4. `.p8` 파일 다운로드 (**한 번만 가능!**)
5. Key ID와 Issuer ID 메모

### 로컬 환경변수 설정

`.env.default` 또는 `.env.production`에 추가:

```bash
ASC_KEY_ID=XXXXXXXXXX
ASC_ISSUER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ASC_KEY_CONTENT=-----BEGIN PRIVATE KEY-----\nMIGT...내용...\n-----END PRIVATE KEY-----
```

또는 `.p8` 파일 경로를 직접 지정:

```bash
ASC_KEY_FILEPATH=~/keys/AuthKey_XXXXXXXXXX.p8
```

---

## 7. Google Play Service Account

### 생성 방법

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. Play Console과 연결된 프로젝트 선택 (또는 새로 생성)
3. **Google Play Android Developer API** 활성화
4. IAM 및 관리자 → 서비스 계정 → **서비스 계정 만들기**
   - 이름: `fastlane-deploy`
   - Cloud IAM 역할은 부여하지 않음
5. 생성된 서비스 계정 → 키 → **JSON 키 생성** → 다운로드
6. [Google Play Console](https://play.google.com/console) → 설정 → API 액세스
   - Google Cloud 프로젝트 연결
   - 서비스 계정에 **릴리스 관리자** 권한 부여
7. JSON 파일을 안전하게 보관 (Git에 절대 커밋하지 않음)

### 로컬 사용

```bash
# fastlane/.env.production에 추가
GOOGLE_PLAY_JSON_KEY_PATH=/path/to/google-play-key.json
```

---

## 8. Fastfile (빌드 & 배포 Lanes)

> 실제 파일은 `fastlane/Fastfile`에 위치. 아래는 주요 lane 요약.

### 공통 lane

| Lane | 설명 | 예시 |
|------|------|------|
| `bump_version` | iOS+Android 버전 동시 업데이트 | `bump_version type:patch` |
| `bump_build` | iOS+Android 빌드넘버 동시 업데이트 | `bump_build build_number:100` |
| `release_all` | iOS+Android 동시 릴리스 + Git 태그 | `release_all type:minor` |

### iOS lane

| Lane | 설명 |
|------|------|
| `ios install_pods` | CocoaPods 설치 |
| `ios beta` | Production → TestFlight |
| `ios beta_staging` | Staging → TestFlight |
| `ios release` | App Store 제출 |

### Android lane

| Lane | 설명 |
|------|------|
| `android beta` | Production → Play Store Internal |
| `android beta_staging` | Staging → Play Store Internal |
| `android release` | Play Store Production 배포 |

---

## 9. 사용법

### 기본 명령어

```bash
# ---- iOS ----
bundle exec fastlane ios beta --env production           # Production → TestFlight
bundle exec fastlane ios beta_staging --env staging       # Staging → TestFlight
bundle exec fastlane ios release --env production         # App Store 제출

# ---- Android ----
bundle exec fastlane android beta --env production        # Production → Internal
bundle exec fastlane android beta_staging --env staging   # Staging → Internal
bundle exec fastlane android release --env production     # Play Store 배포

# ---- 버전 관리 ----
bundle exec fastlane bump_version type:patch              # 1.5.5 → 1.5.6
bundle exec fastlane bump_version type:minor              # 1.5.5 → 1.6.0
bundle exec fastlane bump_version type:major              # 1.5.5 → 2.0.0
bundle exec fastlane bump_version version:2.0.0           # 명시적 지정
bundle exec fastlane bump_build                           # 89 → 90
bundle exec fastlane bump_build build_number:100          # 명시적 지정

# ---- 전체 릴리스 ----
bundle exec fastlane release_all type:minor               # iOS + Android + Git tag
```

### 환경별 실행

`--env` 플래그로 환경을 선택합니다. `fastlane/.env.{name}` 파일을 로드합니다:

```bash
bundle exec fastlane ios beta --env production   # .env.default + .env.production
bundle exec fastlane ios beta --env staging      # .env.default + .env.staging
```

### lane 목록 확인

```bash
bundle exec fastlane lanes                       # 모든 lane 목록 출력
```

---

## 10. .gitignore 추가 항목

```gitignore
# Fastlane
fastlane/report.xml
fastlane/Preview.html
fastlane/screenshots
fastlane/test_output
fastlane/README.md
fastlane/.env.staging
fastlane/.env.production
*.ipa
*.dSYM.zip
google-play-key.json
vendor/bundle
```

---

## 11. 트러블슈팅

### 빌드 관련

**Q: iOS 빌드 시 `No signing certificate` 에러**
A: Xcode에서 Automatic Signing이 활성화되어 있는지 확인. Apple Developer 계정이 Xcode에 로그인되어 있어야 합니다.

**Q: Android 빌드 시 keystore를 찾지 못함**
A: `android/local.properties`에 keystore 경로가 올바른지 확인.

**Q: `react-native-config` 환경변수가 적용되지 않음**
A: `ENVFILE` 환경변수가 빌드 전에 설정되어야 합니다. Fastfile에서 `ENV["ENVFILE"]`을 확인하세요.

### 버전 관련

**Q: iOS와 Android 버전이 다릅니다**
A: `bump_version`과 `bump_build` lane을 사용하면 양쪽이 동시에 업데이트됩니다. 수동으로 한쪽만 변경하지 마세요.

---

## 셋업 체크리스트

- [ ] Ruby 3.0+ 설치
- [ ] `bundle install` 실행
- [ ] `fastlane/.env.default` 값 확인 (APPLE_ID, ITC_TEAM_ID)
- [ ] `fastlane/.env.staging`, `.env.production` 작성
- [ ] App Store Connect API Key 생성 (`.p8` 파일 보관)
- [ ] Google Play Service Account 생성 (JSON 키 보관)
- [ ] `bundle exec fastlane ios beta --env production` 테스트
- [ ] `bundle exec fastlane android beta --env production` 테스트
