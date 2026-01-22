import {usePopup} from '@/slice/commonSlice';
import {LoginHook} from '../types';
import {useLogin} from './useLogin';
import appleAuth from '@invertase/react-native-apple-authentication';

const useAppleLogin = (): LoginHook => {
  const channel = 'apple' as const;
  const {openCommonPopup} = usePopup();
  const {login} = useLogin();

  const onLoginSuccess = async (code: string, identityToken: string) => {
    try {
      await login({channel, code, id_token: identityToken, native: true});
    } catch (error) {
      openCommonPopup(`로그인에 실패했어요.\n다시 시도해주세요.`);
    } finally {
    }
  };

  const onPressButton = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME],
    });

    const authCode = appleAuthRequestResponse.authorizationCode;

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (!authCode || !appleAuthRequestResponse.identityToken) {
      throw new Error('애플 로그인 실패 :: 인증 코드 또는 식별자 토큰이 없습니다.');
    }

    if (credentialState === appleAuth.State.AUTHORIZED) {
      onLoginSuccess(authCode!, appleAuthRequestResponse.identityToken!);
    }
  };

  return {onPressButton};
};

export {useAppleLogin};
