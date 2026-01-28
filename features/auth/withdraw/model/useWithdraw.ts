import { usePopup } from '@/slice/commonSlice';
import * as api from '../api';
import { useAuthStore } from '@/entities/auth';
import { ROUTES, useAppRouter } from '@/shared';

const useWithdraw = () => {
  const {clear} = useAuthStore();
  const {modal, openConfirmPopup} = usePopup();
  const router = useAppRouter();

  const withdraw = async () => {
    try {
      await api.withdraw();
      // TODO: logout이 좀 안 맞긴 하는데
      await clear();

      router.dismissAll();
      router.replace(ROUTES.AUTH_LOGIN);
    } catch (error) {
      console.error('회원 탈퇴 오류 :: ', error);
    }
  };

  const withdrawUser = () => {
    openConfirmPopup({
      content: '회원 탈퇴를 진행하시겠습니까? \n회원 탈퇴시,계정은 삭제되며 복구되지 않습니다.',
      confirm: {
        text: '회원탈퇴',
        onPress: () => {
            withdraw();
            modal.hide();
        },
      },
      cancel: {
        text: '취소',
        onPress: modal.hide,
      },
    })
  };

  return {withdraw: withdrawUser};
};

export {useWithdraw};
