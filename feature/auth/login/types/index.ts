import {z} from 'zod'

const ChannelSchema = z.enum(['kakao', 'naver', 'apple'])
type Channel = z.infer<typeof ChannelSchema>

const LoginServerResponseSchema = z.object({
  // 액세스 토큰
  access_token: z.string(),
  // 토큰 만료 시간(초)
  expires_in: z.number(),
  // 리프레시 토큰
  refresh_token: z.string(),
  // 토큰 범위(read write)
  scope: z.string(),
  // 토큰 타입(Bearer)
  token_type: z.string(),
  // 회원가입 | 로그인 여부
  is_new_user: z.boolean(),
})

type LoginServerResponse = z.infer<typeof LoginServerResponseSchema>

const LoginRequestSchema = z.object({
  code: z.string(),
  channel: ChannelSchema,
  id_token: z.string().optional(),
  native: z.boolean(),
})

type LoginRequest = z.infer<typeof LoginRequestSchema>

export {
  ChannelSchema,
  type Channel,
  LoginServerResponseSchema,
  type LoginServerResponse,
  LoginRequestSchema,
  type LoginRequest,
}
