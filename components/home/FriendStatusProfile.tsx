import {findProfileImageById} from '@/constants/join'
import {FriendStatus} from '@/hooks/my/useFriends'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

type Props = {
  friendStatus: FriendStatus
  isMyProfile?: boolean
  onClick?: () => void
  choice?: {
    id: number
  }
}

/**
 * 조건
 * 1. 선택한 캘린더가 내 것일 경우, 아무 것도 변하지 않음
 * 2. 선택한 캘린더가 친구의 것일 경우, 친구의 것만 파란색, 나머지 친구의 것은 회색
 */

const FriendStatusProfile = ({friendStatus, isMyProfile, onClick, choice}: Props) => {
  const getFirendStatus = () => {
    if (friendStatus.ticket_info?.writer_id) return 'HAS_TICKET'

    if (choice?.id === friendStatus.id) {
      return 'CHOICE'
    }

    return 'OTHER'
  }

  const type = getFirendStatus()

  const getStyle = () => {
    switch (type) {
      case 'CHOICE':
        return {}
      case 'OTHER':
        return {
          borderWidth: 1,
          borderColor: '#D0CEC7',
        }
      case 'HAS_TICKET':
        return {
          borderWidth: 2,
          borderColor: '#21376C',
        }
      default:
        return {
          borderWidth: 1,
          borderColor: '#D0CEC7',
        }
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'CHOICE':
        return {
          color: '#21376C',
          fontWeight: 700 as const,
        }
      case 'OTHER':
        return {
          color: '#77756C',
        }
      case 'HAS_TICKET':
        return {
          color: '#77756C',
        }
    }
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.9} //
      style={styles.friendItem}>
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
      <Text style={[styles.friendName, getTextColor(), isMyProfile && {fontWeight: 500}]} numberOfLines={1}>
        {friendStatus.nickname}
      </Text>
    </TouchableOpacity>
  )
}

export default FriendStatusProfile

const styles = StyleSheet.create({
  profileImageBox: {
    backgroundColor: '#FFFCF3',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0CEC7',
  },
  activeProfileImage: {
    borderWidth: 2,
    borderColor: '#21376C',
  },
  profileImage: {
    width: 30,
    height: 30,
  },
  myHomeImage: {
    width: 16,
    height: 16,
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  friendName: {
    fontSize: 13,
    color: '#171716',
    maxWidth: 60,
    fontWeight: 400,
  },
  friendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})
