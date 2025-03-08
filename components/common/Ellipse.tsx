import React from 'react'
import {View} from 'react-native'

const Ellipse = ({size = 4}: {size?: number}) => {
  return <View style={{width: size, height: size, borderRadius: size / 2, backgroundColor: '#B9B8B3'}} />
}

export default Ellipse
