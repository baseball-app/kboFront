import ApiClient from '@/api'
import {usePopup} from '@/slice/commonSlice'
import {useQuery} from '@tanstack/react-query'
import {useLogin} from '@/hooks/auth/useLogin'
import Clipboard from '@react-native-clipboard/clipboard'
import useProfile from './useProfile'
import {useLogout} from '@/features/auth/logout'

type InvitationCode = {
  code: string
}

const useMyInfo = () => {
  const {user, isLogined} = useLogin()
  const {logout} = useLogout()
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
      // TODO: logout이 좀 안 맞긴 하는데
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
            borderRadius: 10,
            backgroundColor: '#EEEEEE',
            flex: 1,
          },
          buttonTextStyle: {
            color: '#000000',
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
            borderRadius: 10,
          },
          buttonTextStyle: {
            color: 'white',
          },
        },
      ],
    })
  }

  return {
    profile,
    onPasteInviteCode,
    withdrawUser,
  }
}

export default useMyInfo
