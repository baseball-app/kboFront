import {useSheet} from '@/slice/sheetSlice';
import {LoginHook} from '../types';
import {useLogin} from './useLogin';
import {usePopup} from '@/slice/commonSlice';
import {_LoginSheetContent} from '../ui/_LoginSheetContent';
import {AUTH_URL} from '@/entities/auth';

const useNaverLogin = (): LoginHook => {
  const channel = 'naver' as const;
  const {login} = useLogin();
  const {sheet} = useSheet();
  const {openCommonPopup} = usePopup();

  const onLoginSuccess = async (code: string) => {
    try {
      await login({channel, code, native: false});
    } catch (error) {
      openCommonPopup(`로그인에 실패했어요.\n다시 시도해주세요.`);
    } finally {
      sheet.hide();
    }
  };

  /** 컴포넌트 외부에서 딱 이 함수만 보고 사용하도록 설계 */
  const onPressButton = () => {
    sheet.open({content: <_LoginSheetContent url={AUTH_URL.NAVER} onLoginSuccess={onLoginSuccess} />});
  };

  return {onPressButton};
};

export {useNaverLogin};
