import {Config} from '@/config/Config'

const KAKAO_CLIENT_ID = Config.KAKAO_LOGIN_CLIENT_ID
const KAKAO_REDIRECT_URI = Config.KAKAO_LOGIN_REDIRECT_URI
const KAKAO_AUTH_URL = [
  'https://kauth.kakao.com/oauth/authorize?',
  `client_id=${KAKAO_CLIENT_ID}`,
  `redirect_uri=${KAKAO_REDIRECT_URI}`,
  'response_type=code',
].join('&')

console.log('KAKAO_CLIENT_ID', KAKAO_CLIENT_ID)
console.log('KAKAO_REDIRECT_URI', KAKAO_REDIRECT_URI)
console.log('KAKAO_AUTH_URL', KAKAO_AUTH_URL)

const NAVER_CLIENT_ID = Config.NAVER_LOGIN_CLIENT_ID
const NAVER_REDIRECT_URI = Config.NAVER_LOGIN_REDIRECT_URI

const NAVER_AUTH_URL = [
  'https://nid.naver.com/oauth2.0/authorize?',
  `client_id=${NAVER_CLIENT_ID}`,
  `redirect_uri=${NAVER_REDIRECT_URI}`,
  'response_type=code',
].join('&')

const APPLE_CLIENT_ID = Config.APPLE_LOGIN_CLIENT_ID
const APPLE_REDIRECT_URI = Config.APPLE_LOGIN_REDIRECT_URI

const APPLE_AUTH_URL =
  'https://appleid.apple.com/auth/authorize?' +
  [
    `client_id=${APPLE_CLIENT_ID}`,
    `redirect_uri=${APPLE_REDIRECT_URI}`,
    `response_type=${encodeURIComponent('code id_token')}`,
    `scope=${encodeURIComponent('email name')}`,
    'response_mode=form_post',
  ].join('&')

export const AUTH_URL = {
  KAKAO: KAKAO_AUTH_URL,
  NAVER: NAVER_AUTH_URL,
  APPLE: APPLE_AUTH_URL,
}
