import {findProfileImageById} from '@/constants/join'
import {FriendStatus} from '@/hooks/my/useFriends'
import {horizontalScale, verticalScale} from '@/utils/metrics'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

type Props = {
  friendStatus: FriendStatus
  isMyProfile?: boolean
  onClick?: () => void
  choice?: {
    isChoiceTheOther: boolean
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
    if (choice?.isChoiceTheOther) {
      return choice.id === friendStatus.id ? 'CHOICE' : 'OTHER'
    } else {
      return friendStatus.ticket_info?.writer_id ? 'HAS_TICKET' : 'NO_TICKET'
    }
  }

  const type = getFirendStatus()

  const getStyle = () => {
    switch (type) {
      case 'CHOICE':
        return {
          borderWidth: 2,
          borderColor: '#1E5EF4',
        }
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
      case 'NO_TICKET':
        return {
          borderWidth: 1,
          borderColor: '#D0CEC7',
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
          color: '#1E5EF4',
          fontWeight: 700 as const,
        }
      case 'OTHER':
        return {
          color: '#77756C',
        }
      case 'HAS_TICKET':
        return {
          color: '#21376C',
        }
      case 'NO_TICKET':
        return {
          color: '#171716',
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
    width: horizontalScale(30),
    height: verticalScale(30),
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
