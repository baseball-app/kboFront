import ApiClient from '@/api'
import {usePopup} from '@/slice/commonSlice'
import {moderateScale, verticalScale} from '@/utils/metrics'
import {useQuery} from '@tanstack/react-query'
import {useLogin} from '@/hooks/auth/useLogin'
import Clipboard from '@react-native-clipboard/clipboard'
import useProfile from './useProfile'

type InvitationCode = {
  code: string
}

const useMyInfo = () => {
  const {user, isLogined, logout} = useLogin()
  const {openCommonPopup, modal} = usePopup()

  const {profile} = useProfile()

  const {data: invitation} = useQuery({
    queryKey: ['invitation-code', user],
    queryFn: () => ApiClient.get<InvitationCode>('/users/invitation-code/'),
    staleTime: 1000 * 60,
    enabled: Boolean(isLogined),
  })

  // TODO: copy인데 잘못씀
  const pasteInviteCode = async () => {
    if (!invitation) throw new Error('초대코드가 없습니다.')
    // const url = process.env.EXPO_PUBLIC_INVITATION_URL

    Clipboard.setString(invitation?.code)
  }

  const openSuccessPasteInvitationCodeModal = () => {
    openCommonPopup(`초대코드가 복사됐어요!\n친구들한테 공유해보세요.`)
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

  const withdraw = async () => {
    try {
      await ApiClient.post<InvitationCode>('/users/leave/', {})
      await logout()
    } catch (error) {
      console.error('회원 탈퇴 오류 :: ', error)
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
          onPress: () => {
            withdraw()
            modal.hide()
          },
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

  const updateMyTeam = async (teamId: number) => {
    modal.open({
      header: '안내',
      content: `마이팀 변경시, 기존의 데이터는 삭제가 됩니다.\n변경하시겠습니까?`,
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
          text: '팀 변경',
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
    profile,
    onPasteInviteCode,
    withdrawUser,
    updateMyTeam,
  }
}

export default useMyInfo
