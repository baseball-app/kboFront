# KBO Front - Agent Coding Guidelines

This document provides comprehensive guidelines for agentic coding agents working on this React Native + Expo codebase.

## Project Overview

- **Stack**: React Native 0.81.5 + Expo ~54.0.0 + TypeScript 5.9.0
- **Router**: Expo Router ~6.0.21 (file-based routing)
- **Package Manager**: Yarn 1.22.22
- **Node Version**: 24.12.0 (see `.nvmrc`)
- **State Management**: Zustand 5.0.0 (client state), TanStack Query 5.64.2 (server state)
- **Storage**: React Native MMKV 3.2.0 (persistent local storage)
- **Validation**: Zod 4.1.5
- **HTTP Client**: Axios 1.7.7

## Build, Lint, and Test Commands

### Development

```bash
yarn start                    # Start Expo dev server
yarn start:dev                # Start with .env.dev
yarn ios                      # Run on iOS simulator
yarn android                  # Run on Android emulator
yarn android:dev              # Run Android with dev config
yarn android:production       # Run Android with production config
```

### Build

```bash
yarn build:android            # Build Android release bundle
yarn build:android:dev        # Build Android dev release
yarn build:android:production # Build Android production release
```

### Testing

```bash
yarn test                     # Run Jest in watch mode
jest --testPathPattern=path/to/test.test.ts  # Run single test
jest path/to/test.test.ts    # Run specific test file
```

### Linting

```bash
yarn lint                     # Run Expo ESLint
```

## Architecture: Feature-Sliced Design (FSD)

```
/app/                         # Expo Router routes (file-based)
/entities/                    # Business entities (api, model, types, ui)
  /[entity]/api/              # API functions for entity
  /[entity]/types/            # TypeScript types/schemas
  /[entity]/model/            # Business logic, hooks
  /[entity]/ui/               # Entity-specific UI components
/features/                    # Feature modules (cross-entity features)
/widgets/                     # Page-level composite components
/shared/                      # Shared utilities and UI
  /lib/                       # Utility functions, custom hooks
  /ui/                        # Shared UI components (Button, Txt, etc.)
/components/                  # Legacy/common components
/slice/                       # Zustand stores
/hooks/                       # Custom React hooks by domain
/api/                         # API client configuration
/constants/                   # App constants, theme tokens
/types/                       # Global TypeScript types
/assets/                      # Static assets
```

## Import Organization

**Order**: React > React Native > Third-party > Local (absolute paths using @/\*)

```typescript
import React, {memo, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import ApiClient from '@/api';
import {color_token} from '@/constants/theme';
import {size} from '@/shared';
import {Button, Txt} from '@/shared/ui';
import {TicketDetail} from '@/entities/ticket';
```

## Code Style

### Prettier Configuration (.prettierrc)

- **No semicolons** (`semi: false`)
- **Single quotes** (`singleQuote: true`)
- **120 char line width** (`printWidth: 120`)
- **2 space indentation** (`tabWidth: 2`)
- **Trailing commas** (`trailingComma: "all"`)
- **No bracket spacing** (`bracketSpacing: false`)
- **JSX brackets same line** (`bracketSameLine: true`)
- **Arrow parens avoid** (`arrowParens: "avoid"`)

### TypeScript

- **Strict mode enabled** (`strict: true` in tsconfig.json)
- **Use explicit types** for function parameters and return values
- **Export types** alongside components
- **Path alias**: Use `@/*` for imports from root

```typescript
// Good
export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export const Button = ({children, onPress, disabled = false}: ButtonProps) => {
  // ...
};
```

### Components

- **Use function components** (not class components)
- **Wrap in `memo`** for performance optimization when appropriate
- **Export types** at the end of file
- **StyleSheet.create** for styles (not inline objects)
- **Use `size()` function** for responsive sizing (base: 375px)

```typescript
import React, {memo} from 'react'
import {View, StyleSheet} from 'react-native'
import {size} from '@/shared'

interface MyComponentProps {
  title: string
}

const MyComponent = memo(({title}: MyComponentProps) => {
  return <View style={styles.container}>{/* ... */}</View>
})

const styles = StyleSheet.create({
  container: {
    padding: size(16),
  },
})

export {MyComponent}
export type {MyComponentProps}
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `TicketDetail`)
- **Files**: Match component name (`Button.tsx`, `TicketDetail.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTicketDetail`, `useProfile`)
- **Constants**: UPPER_SNAKE_CASE (`SCREEN_WIDTH`, `BASE_WIDTH`)
- **Functions**: camelCase (`size`, `logEvent`, `getTicketCalendarLog`)
- **Types/Interfaces**: PascalCase with descriptive names (`ButtonProps`, `TicketDetail`)
- **API functions**: camelCase verbs (`getTicketCalendarLog`, `findTicketDetailById`)

### API Layer (entities/\*/api/)

- **Use ApiClient** from `@/api`
- **Add JSDoc comments** for API functions
- **Type responses** with schemas from `types/`
- **Keep functions pure** (no side effects)

```typescript
import ApiClient from '@/api';
import * as schema from '../types';

/**
 * 월별 티켓 목록 조회
 * @param req {date: 'YYYY-MM', user_id: number}
 */
export const getTicketCalendarLog = async (req: schema.TicketCalendarLogReq) => {
  return ApiClient.get<schema.TicketCalendarLog[]>('/tickets/ticket_calendar_log/', req);
};
```

### Hooks (TanStack Query)

- **Use `useQuery`** for data fetching
- **Use `useMutation`** for data modifications
- **Use optimistic updates** with `onMutate` for better UX
- **Invalidate queries** in `onSuccess` to refresh data
- **Handle errors** in `onError`

```typescript
const {data, isSuccess, refetch} = useQuery({
  queryKey: ['ticket', id, targetId],
  queryFn: () => ApiClient.get<TicketDetail[]>('/tickets/ticket_detail/', {id, target_id: targetId}),
  enabled: Boolean(id) && Boolean(targetId),
  retry: false,
});

const {mutateAsync: deleteTicket} = useMutation({
  mutationFn: () => ApiClient.post('/tickets/ticket_del/', {id}),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['ticket']});
  },
});
```

### State Management

- **Zustand** for client state (UI state, modals, forms)
- **TanStack Query** for server state (API data)
- **MMKV** for persistent storage (tokens, user preferences)

```typescript
// Zustand slice
import {create} from 'zustand';

interface MyState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useMyStore = create<MyState>(set => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
}));
```

### Error Handling

- **Catch errors** in API client (already handled in `@/api`)
- **Use `try/catch`** for async operations outside queries/mutations
- **Log errors** with `console.error` for debugging
- **Show user-friendly messages** using `openCommonPopup` from `slice/commonSlice`
- **Handle query errors** in `onError` callbacks

## Testing

- **Framework**: Jest with jest-expo preset
- **Mocking**: Comprehensive mocks in `jest.setup.ts`
- **Location**: Place tests next to implementation files (_.test.ts, _.test.tsx)
- **Run single test**: `jest path/to/test.test.ts`

## Environment Variables

- `.env` - default environment
- `.env.dev` - development environment
- `.env.production` - production environment
- Access via `react-native-config`: `Config.API_URL`

## Common Pitfalls

1. **Don't forget `size()`** for dimensions (375px base design)
2. **Always use `@/*` imports**, not relative paths
3. **Memoize components** that render frequently
4. **Use barrel exports** (index.ts) for clean imports
5. **Follow Prettier rules** (no semicolons, single quotes)
6. **Invalidate queries** after mutations to refresh UI
7. **Use typed routes** from expo-router for navigation

## Performance

- Use `React.memo` for components
- Use `useMemo` and `useCallback` for expensive computations
- Use `react-native-reanimated` for animations
- Use `react-native-fast-image` for image optimization
- Optimize large lists with FlatList (not ScrollView)

## Additional Notes

- This is a KBO (Korean Baseball Organization) app for tracking games and tickets
- Firebase is integrated for analytics and push notifications
- Social login supported: Apple, Kakao, Naver
- Multi-environment support via react-native-config
