import {ProfileImage, Team} from '@/constants/join'
import {create, StateCreator} from 'zustand'

export interface IUserJoinSlice {
    profile: ProfileImage | null
    nickname: string
    myTeam: Team | null
    setProfile: (profile: ProfileImage) => void
    setNickname: (nickname: string) => void
    setMyTeam: (team: Team) => void
}

export const joinSlice: StateCreator<IUserJoinSlice> = set => ({
    profile: null,
    nickname: '',
    myTeam: null,
    setProfile: profile => set({profile}),
    setNickname: nickname => set({nickname}),
    setMyTeam: myTeam => set({myTeam}),
})

export const userJoinSlice = create<IUserJoinSlice>(joinSlice)
