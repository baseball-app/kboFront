import {findProfileImageById} from '@/constants/join'
import {FriendStatus} from '@/hooks/my/useFriends'
import {horizontalScale, verticalScale} from '@/utils/metrics'
import {Image, StyleSheet, Text, View} from 'react-native'

type Props = {
  friendStatus: FriendStatus
  isMyProfile?: boolean
}

const FriendStatusProfile = ({friendStatus, isMyProfile}: Props) => {
  return (
    <View style={styles.friendItem}>
      <View
        style={[
          styles.profileImageBox, //
          friendStatus.ticket_info?.writer_id ? styles.activeProfileImage : {},
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
      <Text style={styles.friendName} numberOfLines={1}>
        {friendStatus.nickname}
      </Text>
    </View>
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
    maxWidth: 50,
  },
  friendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})
