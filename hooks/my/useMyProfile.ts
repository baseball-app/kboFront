import ApiClient from '@/api'
import {useCommonSlice} from '@/slice/commonSlice'
import {moderateScale, verticalScale} from '@/utils/metrics'
import {useMutation, useQuery} from '@tanstack/react-query'
import React from 'react'
import {useLogin} from '../useLogin'
import Clipboard from '@react-native-clipboard/clipboard'
import useFriends from './useFriends'

type Profile = {
    nickname: string
    predict_ratio: number
    my_team: {
        id: number // 3
        name: string // 'LG 트윈스'
        logo_url: string // 'https://image.com/'
    }
    followers: number // 20
    followings: number // 32
}

type InvitationCode = {
    code: string
}

const useMyProfile = () => {
    const {user} = useLogin()
    const {modal} = useCommonSlice()

    const {followers, followings} = useFriends()

    // TODO: 유저당 고정인지 확인해야 함
    const {data: invitation} = useQuery({
        queryKey: ['invitation-code', user],
        queryFn: () => ApiClient.get<InvitationCode>('/users/invitation-code/'),
        staleTime: 1000 * 60,
    })

    const {mutate: onPaste} = useMutation({
        mutationFn: () => pasteInviteCode(),
        onSuccess(data, variables, context) {},
        onError: error => {
            console.error('초대 코드 복사 오류 ::', error)
        },
    })

    const mockData: Profile = {
        nickname: 'nickname',
        predict_ratio: 76,
        my_team: {
            id: 3,
            name: 'LG 트윈스',
            logo_url: 'https://image.com/',
        },
        followers: 20,
        followings: 32,
    }

    const pasteInviteCode = async () => {
        if (!invitation) throw new Error('초대코드가 없습니다.')

        Clipboard.setString(invitation?.code)
    }

    const openSuccessPasteInvitationCodeModal = () => {
        modal.open({
            header: '안내',
            content: `초대코드가 복사되었어요! \n 초대코드를 공유해주세요.`,
            button: [
                {
                    text: '확인',
                    onPress: modal.hide,
                    buttonStyle: {
                        width: '100%',
                        paddingVertical: verticalScale(12),
                        borderRadius: 8,
                        backgroundColor: '#1E5EF4',
                    },
                    buttonTextStyle: {
                        color: 'white',
                    },
                },
            ],
        })
    }

    // 초대코드 복사
    const onPasteInviteCode = () => {
        try {
            pasteInviteCode()
            openSuccessPasteInvitationCodeModal()
        } catch (error) {
            console.error('초대 코드 복사 오류 ::', error)
        }
    }

    const withdrawUser = () => {
        modal.open({
            header: '안내',
            content: `회원 탈퇴를 진행하시겠습니까? \n회원 탈퇴시,계정은 삭제되며 복구되지 않습니다.`,
            button: [
                {
                    text: '취소',
                    onPress: modal.hide,
                    buttonStyle: {
                        paddingVertical: verticalScale(12),
                        borderRadius: 8,
                        backgroundColor: '#EEEEEE',
                        flex: 1,
                    },
                    buttonTextStyle: {
                        color: '#000000',
                        fontSize: moderateScale(16),
                        fontWeight: '600',
                        textAlign: 'center',
                    },
                },
                {
                    text: '회원탈퇴',
                    onPress: modal.hide,
                    buttonStyle: {
                        backgroundColor: '#1E5EF4',
                        flex: 1,
                        paddingVertical: verticalScale(12),
                        borderRadius: 8,
                    },
                    buttonTextStyle: {
                        color: 'white',
                        fontSize: moderateScale(16),
                        fontWeight: '600',
                        textAlign: 'center',
                    },
                },
            ],
        })
    }

    return {
        profile: mockData,
        onPasteInviteCode,
        withdrawUser,
    }
}

export default useMyProfile
