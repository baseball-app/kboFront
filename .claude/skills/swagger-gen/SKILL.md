---
name: swagger-gen
description: |
  스웨거 주소 기반으로 api 생성 스킬. 다음 상황에서 자동 호출:
  - "/swagger", "/swagger-gen", "api 생성"
  - "해당 주소 기반으로 API 생성해줘"
---

Generates corresponding types and APIs based on the given Swagger URL and Domain.
If the Domain is not provided, ask the user or determine it automatically.
If there are existing APIs that have changed, reflect the changes and output that they have been modified.

### 1. 코드 생성 (feature-generator 에이전트 호출)

```
src/{entities | features | widgets}/{domain}/
├── types/index.ts          # Zod 스키마
├── api/index.ts            # API 클래스
└── index.ts                # Public API
```


### types/index.ts (Zod 스키마)

```typescript
import z from 'zod';

// 기본 스키마
const {Domain}Schema = z.object({
  id: z.number(),
  name: z.string().min(1, '{필드명}을(를) 입력해 주세요.'),
  active: z.boolean(),
  // ... 스펙의 데이터 구조에 따라 필드 추가
});

type {Domain} = z.infer<typeof {Domain}Schema>;

// Edit 스키마 (검증 로직 추가)
const {Domain}EditSchema = {Domain}Schema.extend({
  check: z.object({
    isValid: z.boolean(),
    id: z.string(),
  }).optional(),
}).refine((data) => /* 검증 로직 */, {
  message: '검증 메시지',
});

// Create 스키마 (id 제외)
const {Domain}CreateSchema = {Domain}EditSchema.omit({ id: true })
  .refine((data) => /* 검증 로직 */, {
    message: '검증 메시지',
  });

type {Domain}Edit = z.infer<typeof {Domain}EditSchema>;
type {Domain}Create = z.infer<typeof {Domain}CreateSchema>;

export {
  type {Domain},
  type {Domain}Create,
  type {Domain}Edit,
  {Domain}Schema,
  {Domain}CreateSchema,
  {Domain}EditSchema,
};
```

### api/index.ts (API 클래스)

```typescript
import { KyInstance } from 'ky';
import { serverApi } from '@/shared/api';
import { Pageable } from '@/shared/types';
import { {Domain}, {Domain}Create, {Domain}Edit } from '../types';
import { DefaultQueryParams } from '@/widgets/template/ui/table';

export class {Domain}Api {
  constructor(private readonly http: KyInstance) {}

  // 목록 조회
  getList = async (params?: DefaultQueryParams): Promise<Pageable<{Domain}>> => {
    const response = await this.http.get<Pageable<{Domain}>>('{endpoints}', { searchParams: params });
    return response.json();
  };

  // 상세 조회
  getById = async (id: number) => {
    const response = await this.http.get<{Domain}>(`{endpoints}/${id}`);
    return response.json();
  };

  // 중복 확인 (필요시)
  existsBy{Field} = async ({field}: string): Promise<boolean> => {
    const response = await this.http.get('{endpoints}/exists', { searchParams: { {field} } });
    return response.json();
  };

  // 생성
  create = async (data: {Domain}Create): Promise<{Domain}> => {
    const { check, ...rest } = data;
    const response = await this.http.post('{endpoints}', { json: rest });
    return response.json();
  };

  // 수정
  update = async ({ id, check, ...data }: {Domain}Edit): Promise<{Domain}> => {
    const response = await this.http.patch(`{endpoints}/${id}`, { json: data });
    return response.json();
  };
}

export const {domain}Api = new {Domain}Api(serverApi);
```