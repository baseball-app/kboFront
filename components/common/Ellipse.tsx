import {color_token} from '@/constants/theme'
import React from 'react'
import {View} from 'react-native'

const Ellipse = ({size = 4}: {size?: number}) => {
  return <View style={{width: size, height: size, borderRadius: size / 2, backgroundColor: color_token.gray400}} />
}

export default Ellipse
