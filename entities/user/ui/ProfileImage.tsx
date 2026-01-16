import {Image, StyleSheet, View} from 'react-native'
import {size} from '@/shared'
import {color_token} from '@/constants/theme'

const ProfileImage = ({source}: {source: any}) => {
  return (
    <View style={styles.profileImageBox}>
      <Image source={source} style={styles.profileImage} resizeMode="contain" />
    </View>
  )
}

export {ProfileImage}

const styles = StyleSheet.create({
  profileImageBox: {
    backgroundColor: color_token.gray200,
    width: size(80),
    height: size(80),
    borderRadius: size(50),
    marginRight: size(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: color_token.gray350,
  },
  profileImage: {
    width: size(46.44),
    height: size(50.58),
  },
})
