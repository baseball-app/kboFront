const KAKAO_CLIENT_ID = process.env.EXPO_PUBLIC_KAKAO_LOGIN_CLIENT_ID
const KAKAO_REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_LOGIN_REDIRECT_URI
const KAKAO_AUTH_URL = [
    'https://kauth.kakao.com/oauth/authorize?',
    `client_id=${KAKAO_CLIENT_ID}`,
    `redirect_uri=${KAKAO_REDIRECT_URI}`,
    'response_type=code',
].join('&')

const NAVER_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_LOGIN_CLIENT_ID
const NAVER_REDIRECT_URI = process.env.EXPO_PUBLIC_NAVER_LOGIN_REDIRECT_URI

const NAVER_AUTH_URL = [
    'https://nid.naver.com/oauth2.0/authorize?',
    `client_id=${NAVER_CLIENT_ID}`,
    `redirect_uri=${NAVER_REDIRECT_URI}`,
    'response_type=code',
].join('&')

export const AUTH_URL = {
    KAKAO: KAKAO_AUTH_URL,
    NAVER: NAVER_AUTH_URL,
}
