import {ProfileImage} from '@/constants/join'
import {Team} from '@/entities/match'
import {create, StateCreator} from 'zustand'

export interface IUserJoinSlice {
  id: number
  profile: ProfileImage | null
  nickname: string
  myTeam: Omit<Team, 'logo_url'> | null
  code: string // 소셜로그인 할 때 반환되는 code ( 회원가입 시 or 로그인 시 사용 )
  checkedConsent: string[]
  setCheckedConsent: (checkedConsent: string[]) => void
  setCode: (code: string) => void
  setProfile: (profile: ProfileImage) => void
  setNickname: (nickname: string) => void
  setMyTeam: (team: Omit<Team, 'logo_url'>) => void
}

export const joinSlice: StateCreator<IUserJoinSlice> = set => ({
  id: 0,
  profile: null,
  nickname: '',
  myTeam: null,
  code: '',
  checkedConsent: [],
  setCheckedConsent: checkedConsent => set({checkedConsent}),
  setCode: code => set({code}),
  setProfile: profile => set({profile}),
  setNickname: nickname => set({nickname}),
  setMyTeam: myTeam => set({myTeam}),
})

export const userJoinSlice = create<IUserJoinSlice>(joinSlice)
