import React, {memo} from 'react'
import {Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle, View} from 'react-native'
import {color_token} from '@/constants/theme'
import {Txt} from './Txt'
import {size} from '@/shared'
import LottieView from 'lottie-react-native'

type ButtonType = 'primary' | 'secondary' | 'outline' | 'outline_active' | 'gray'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  children: React.ReactNode
  onPress?: () => void
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const buttonColors = {
  primary: {
    bg: color_token.primary,
    text: color_token.white,
    border: color_token.primary,
    pressed: '#1A4FD4', // primary 더 어둡게
  },
  secondary: {
    bg: color_token.secondary,
    text: color_token.white,
    border: color_token.secondary,
    pressed: '#061436', // secondary 더 어둡게
  },
  outline: {
    bg: color_token.white,
    text: color_token.gray900,
    border: color_token.gray350,
    pressed: color_token.gray150,
  },
  outline_active: {
    bg: color_token.primary_10,
    text: color_token.primary,
    border: color_token.primary,
    pressed: '#1E5EF430', // primary_10 더 진하게
  },
  gray: {
    bg: color_token.gray300,
    text: color_token.gray600,
    border: color_token.gray300,
    pressed: color_token.gray300,
  },
}

const sizeStyles = {
  small: {
    paddingVertical: size(8),
    paddingHorizontal: size(16),
    fontSize: 14,
    borderRadius: size(8),
    height: size(36),
  },
  medium: {
    paddingVertical: size(14),
    paddingHorizontal: size(20),
    fontSize: 16,
    borderRadius: size(10),
    height: size(53),
  },
  large: {
    paddingVertical: size(16),
    paddingHorizontal: size(24),
    fontSize: 18,
    borderRadius: size(12),
    height: size(58),
  },
}

const Button = memo(
  ({
    children,
    onPress,
    type = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
  }: ButtonProps) => {
    const isDisabled = disabled || loading
    const colors = buttonColors[type]
    const sizeStyle = sizeStyles[size]

    return (
      <Pressable
        onPress={() => {
          if (isDisabled) return
          onPress?.()
        }}
        disabled={isDisabled}
        style={({pressed}) => [
          styles.button,
          {
            backgroundColor: pressed && !isDisabled ? colors.pressed : colors.bg,
            borderColor: colors.border,
            paddingVertical: sizeStyle.paddingVertical,
            paddingHorizontal: sizeStyle.paddingHorizontal,
            borderRadius: sizeStyle.borderRadius,
            opacity: pressed && !isDisabled ? 0.9 : 1,
            height: sizeStyle.height,
            maxHeight: sizeStyle.height,
          },
          style,
        ]}>
        {loading ? (
          <LottieView source={require('@/assets/lottie/loading.json')} autoPlay loop style={styles.lottieView} />
        ) : (
          <Txt weight="semibold" size={sizeStyle.fontSize as 14 | 16 | 18} color={colors.text} style={textStyle}>
            {children}
          </Txt>
        )}
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
  },
  lottieView: {
    width: size(90),
    height: size(90),
  },
})

export {Button}
export type {ButtonProps, ButtonType, ButtonSize}
