import {color_token} from '@/constants/theme'
import React from 'react'
import {View} from 'react-native'

const Ellipse = ({size = 4, color = color_token.gray400}: {size?: number; color?: string}) => {
  return <View style={{width: size, height: size, borderRadius: size / 2, backgroundColor: color}} />
}

export default Ellipse
