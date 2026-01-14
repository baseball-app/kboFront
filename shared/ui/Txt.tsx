import {color_token} from '@/constants/theme'
import React, {memo} from 'react'
import {Text, TextStyle, StyleProp} from 'react-native'

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
} as const

const fontSize = {
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  32: 32,
} as const

type FontWeight = keyof typeof fontWeight
type FontSize = keyof typeof fontSize

interface TxtProps {
  weight?: FontWeight
  size?: FontSize
  style?: StyleProp<TextStyle>
  color?: string
  children?: React.ReactNode
}

const Txt = memo(({weight = 'regular', color = color_token.gray900, size = 16, style, children}: TxtProps) => {
  const textStyle: TextStyle = {
    fontWeight: fontWeight[weight],
    fontSize: fontSize[size],
    lineHeight: fontSize[size] * 1.4,
    color,
  }

  return <Text style={[textStyle, style]}>{children}</Text>
})

export {Txt}
