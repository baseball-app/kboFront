import {findProfileImageById} from '@/constants/join';
import {color_token} from '@/constants/theme';
import {FriendStatus} from '@/hooks/my/useFriends';
import {Pressable, size} from '@/shared';
import {Txt} from '@/shared/ui/Txt';
import {Image, StyleSheet, View} from 'react-native';

type Props = {
  friendStatus: FriendStatus;
  isMyProfile?: boolean;
  onClick?: () => void;
  choice?: {
    id: number;
  };
};

/**
 * 조건
 * 1. 선택한 캘린더가 내 것일 경우, 아무 것도 변하지 않음
 * 2. 선택한 캘린더가 친구의 것일 경우, 친구의 것만 파란색, 나머지 친구의 것은 회색
 */

const FriendStatusProfile = ({friendStatus, isMyProfile, onClick, choice}: Props) => {
  const getFirendStatus = () => {
    if (friendStatus.ticket_info?.writer_id) return 'HAS_TICKET';

    if (choice?.id === friendStatus.id) {
      return 'CHOICE';
    }

    return 'OTHER';
  };

  const type = getFirendStatus();

  const getStyle = () => {
    switch (type) {
      case 'CHOICE':
        return {
          borderWidth: 2,
          borderColor: color_token.primary,
        };
      case 'OTHER':
        return {
          borderWidth: 1,
          borderColor: color_token.gray350,
        };
      case 'HAS_TICKET':
        return {
          borderWidth: 2,
          borderColor: color_token.secondary_10,
        };
      default:
        return {
          borderWidth: 1,
          borderColor: color_token.gray350,
        };
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'CHOICE':
        return {
          color: color_token.primary,
          fontWeight: 700 as const,
        };
      case 'OTHER':
        return {
          color: color_token.gray900,
        };
      case 'HAS_TICKET':
        return {
          color: color_token.gray900,
        };
    }
  };

  return (
    <Pressable onPress={onClick} style={styles.friendItem}>
      <View
        style={[
          styles.profileImageBox, //
          getStyle(),
        ]}>
        <Image
          source={findProfileImageById(friendStatus.profile_type)}
          style={styles.profileImage}
          resizeMode="contain"
        />
        {isMyProfile && (
          <Image source={require('@/assets/icons/myHome.png')} style={styles.myHomeImage} resizeMode="contain" />
        )}
      </View>
      <Txt size={13} style={[getTextColor(), isMyProfile && {fontWeight: 500}]} numberOfLines={1}>
        {friendStatus.nickname}
      </Txt>
    </Pressable>
  );
};

export default FriendStatusProfile;

const styles = StyleSheet.create({
  profileImageBox: {
    backgroundColor: color_token.gray150,
    width: size(50),
    height: size(50),
    borderRadius: size(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color_token.gray350,
  },
  activeProfileImage: {
    borderWidth: 2,
    borderColor: color_token.secondary_10,
  },
  profileImage: {
    width: size(27),
    height: size(27),
  },
  myHomeImage: {
    width: size(16),
    height: size(16),
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  friendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
