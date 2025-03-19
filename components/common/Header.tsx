import {useRouter} from 'expo-router'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type ButtonType = {
  onPress: () => void
  content: React.ReactNode
}

type Props = {
  variants?: 'white' | 'transparent'
  hasBackButton?: boolean
  rightButton?: ButtonType
  leftButton?: ButtonType
  title?: string
}

const Header = ({variants = 'white', leftButton, hasBackButton = true, rightButton, title}: Props) => {
  const router = useRouter()
  const {top} = useSafeAreaInsets()

  const onBackButtonClick = () => {
    router.back()
  }

  return (
    <View style={[styles.container, {backgroundColor: variants === 'white' ? '#fff' : '#FFFCF3', paddingTop: top}]}>
      {leftButton ? (
        <TouchableOpacity style={styles.icon} onPress={leftButton.onPress}>
          {leftButton.content}
        </TouchableOpacity>
      ) : hasBackButton ? (
        <TouchableOpacity style={styles.icon} onPress={onBackButtonClick}>
          <Image source={require('@/assets/icons/back.png')} style={{width: 16, height: 28}} />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon} />
      )}
      <Text style={styles.text}>{title}</Text>
      {rightButton ? (
        <TouchableOpacity style={styles.icon} onPress={rightButton.onPress}>
          {rightButton.content}
        </TouchableOpacity>
      ) : (
        <View style={styles.icon} />
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  icon: {
    minWidth: 16,
    minHeight: 28,
  },
  text: {
    color: '#171716',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 18 * 1.4,
  },
})
