import {horizontalScale, moderateScale, verticalScale} from '@/utils/metrics'
import {Image, StyleSheet, View} from 'react-native'

const ProfileImageBox = ({source}: {source: any}) => {
  return (
    <View style={styles.profileImageBox}>
      <Image source={source} style={styles.profileImage} resizeMode="contain" />
    </View>
  )
}

export default ProfileImageBox

const styles = StyleSheet.create({
  profileImageBox: {
    backgroundColor: '#F3F2EE',
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#D0CEC7',
  },
  profileImage: {
    width: 46.44,
    height: 50.58,
  },
})
