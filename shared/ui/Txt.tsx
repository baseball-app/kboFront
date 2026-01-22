import {color_token} from '@/constants/theme';
import React, {memo} from 'react';
import {Text, TextStyle, StyleProp} from 'react-native';
import {size as scaleSize} from '..';

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
} as const;

const fontSize = {
  10: 10,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  32: 32,
} as const;

type FontWeight = keyof typeof fontWeight;
type FontSize = keyof typeof fontSize;

interface TxtProps {
  weight?: FontWeight;
  size?: FontSize;
  style?: StyleProp<TextStyle>;
  color?: string;
  children?: React.ReactNode;
  numberOfLines?: number;
}

const Txt = memo(
  ({weight = 'regular', color = color_token.gray900, size = 16, style, children, numberOfLines}: TxtProps) => {
    const textStyle: TextStyle = {
      fontWeight: fontWeight[weight],
      fontSize: scaleSize(fontSize[size]),
      lineHeight: fontSize[size] * 1.4,
      color,
    };

    return (
      <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  },
);

export {Txt};
