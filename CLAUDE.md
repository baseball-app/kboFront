# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KBO (Korean Baseball Organization) 야구 앱 프론트엔드. React Native 0.81.5 + Expo ~54.0.0 + TypeScript 5.9.0.

- **Router**: Expo Router ~6.0.21 (file-based routing in `app/`)
- **Package Manager**: Yarn 1.22.22
- **Node Version**: 24.12.0 (see `.nvmrc`)
- **State**: Zustand 5 (client), TanStack Query 5 (server), MMKV (persistent storage)
- **Validation**: Zod 4
- **HTTP**: Axios via `ApiClient` (`@/api`) — auto-attaches `X-KBOAPP-TOKEN` header

## Commands

```bash
yarn start                    # Expo dev server
yarn start:dev                # Dev server with .env.dev
yarn ios                      # iOS simulator
yarn android                  # Android emulator
yarn android:dev              # Android with .env.dev
yarn lint                     # ESLint (expo lint)
yarn format                   # Prettier
yarn test                     # Jest watch mode
npx jest path/to/file.test.ts # Run single test file
```

### Build

```bash
yarn build:android:dev        # Android dev release bundle
yarn build:android:production # Android production release bundle
```

## Architecture: Feature-Sliced Design (FSD)

```
app/                  # Expo Router file-based routes
  (tabs)/             # Tab navigation
entities/             # Domain entities, each with api/, model/, types/, ui/
  ticket/, match/, user/, friend/, auth/, alarm/, stat/, terms/
features/             # Cross-entity feature modules
  match/, ticket/, auth/, stats/, push/, alarm/, user/, select-friend/
widgets/              # Page-level composite components
shared/
  ui/                 # Reusable UI: Button, Txt, Pressable, BottomSheet, SelectBox...
  lib/                # Utilities: size(), useFunnel, useShare, useCaptureView...
components/           # Legacy common components
slice/                # Zustand stores (commonSlice, sheetSlice, userJoinSlice, dailyWriteSlice)
hooks/                # Custom hooks by domain
api/                  # Axios client config (ApiClient)
constants/            # App constants, color_token theme
types/                # Global TypeScript types
```

### Key Patterns

- **Imports**: Always use `@/*` path alias (never relative). Order: React > React Native > Third-party > Local.
- **Responsive sizing**: Use `size()` from `@/shared` (375px base design).
- **Styling**: `StyleSheet.create`, not inline objects.
- **Components**: Function components, wrap with `memo` when appropriate, export types alongside.
- **API layer**: `entities/*/api/` uses `ApiClient` from `@/api`. Type responses with schemas from `entities/*/types/`.
- **Queries**: `useQuery` for fetching, `useMutation` with `queryClient.invalidateQueries` for mutations.
- **User popups**: `openCommonPopup` from `slice/commonSlice`.

## Code Style (Prettier)

Configured in `.prettierrc`: **semicolons on**, single quotes, 120 char width, 2-space indent, trailing commas, no bracket spacing, JSX brackets same line, arrow parens avoid.

## Testing

- **Preset**: `jest-expo`
- **Setup**: `jest.setup.ts` (setupFilesAfterEnv)
- Place tests next to implementation (`*.test.ts`, `*.test.tsx`)

### Testing Gotchas

- **`console.log` verification**: `jest.setup.ts` replaces `console.log` with a wrapper (`logWithRemapMessageRemoved`). You must use `jest.spyOn(console, 'log')` to verify calls — direct `expect(console.log)` won't work.
- **`getByRole('button')`**: `@/shared` `Pressable` doesn't set `accessibilityRole` by default. Add `accessibilityRole="button"` to the component for this query to work.
- **New native module deps**: Add mock to `jest.setup.ts`. See [testing troubleshooting guide](docs/testing-troubleshooting.md).

### jest.setup.ts Global Mocks

| Module                             | Notes                                               |
| ---------------------------------- | --------------------------------------------------- |
| `react-native` (doMock)            | Platform, NativeModules, Firebase modules           |
| `react-native-reanimated`          | Manual mock (all animation APIs are no-op)          |
| `react-native-worklets`            | `scheduleOnRN` mock                                 |
| `react-native-safe-area-context`   | insets default `{top:0, bottom:0, left:0, right:0}` |
| `expo-router`                      | useRouter, useSegments                              |
| `expo-media-library`               | permissions/assets                                  |
| `expo-modules-core`                | NativeModulesProxy                                  |
| `expo-constants`                   | appOwnership, platform info                         |
| `expo-file-system`                 | file system operations                              |
| `expo-image-picker`                | image selection                                     |
| `expo-linking`                     | createURL, openURL                                  |
| `react-native-view-shot`           | captureRef                                          |
| `react-native-toast-message`       | show/hide                                           |
| `react-native-share`               | open, shareSingle                                   |
| `react-native-config`              | API_URL, ENV                                        |
| `@react-native-firebase/messaging` | getMessaging, getToken, onMessage (named exports)   |

## Environment Variables

- `.env` / `.env.dev` / `.env.production` — accessed via `react-native-config` (`Config.API_URL`)
- Auth token stored in MMKV (`MmkvStoreKeys.USER_LOGIN`), auto-attached by API interceptor
