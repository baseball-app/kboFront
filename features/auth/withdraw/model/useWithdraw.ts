import {usePopup} from '@/slice/commonSlice'
import * as api from '../api'
import {useAuthStore} from '@/entities/auth'
import {ROUTES, useAppRouter} from '@/shared'

const useWithdraw = () => {
  const {clear} = useAuthStore()
  const {modal} = usePopup()
  const router = useAppRouter()

  const withdraw = async () => {
    try {
      await api.withdraw()
      // TODO: logout이 좀 안 맞긴 하는데
      await clear()

      router.dismissAll()
      router.replace(ROUTES.AUTH_LOGIN)
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

  return {withdraw: withdrawUser}
}

export {useWithdraw}
