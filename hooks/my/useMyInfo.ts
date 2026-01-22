import ApiClient from '@/api';
import {usePopup} from '@/slice/commonSlice';
import {useQuery} from '@tanstack/react-query';
import Clipboard from '@react-native-clipboard/clipboard';
import useProfile from './useProfile';

type InvitationCode = {
  code: string;
};

const useMyInfo = () => {
  const {openCommonPopup} = usePopup();

  const {profile} = useProfile();

  const {data: invitation} = useQuery({
    queryKey: ['invitation-code'],
    queryFn: () => ApiClient.get<InvitationCode>('/users/invitation-code/'),
    staleTime: 1000 * 60,
  });

  // TODO: copy인데 잘못씀
  const pasteInviteCode = async () => {
    if (!invitation) throw new Error('초대코드가 없습니다.');

    Clipboard.setString(invitation?.code);
  };

  const openSuccessPasteInvitationCodeModal = () => {
    openCommonPopup(`초대코드가 복사됐어요!\n친구들한테 공유해보세요.`);
  };

  // 초대코드 복사
  const onPasteInviteCode = () => {
    try {
      pasteInviteCode();
      openSuccessPasteInvitationCodeModal();
    } catch (error) {
      console.error('초대 코드 복사 오류 ::', error);
    }
  };

  return {
    profile,
    onPasteInviteCode,
  };
};

export default useMyInfo;
