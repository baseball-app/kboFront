import React from 'react'
import Svg, {Path} from 'react-native-svg'
import {color_token} from '@/constants/theme'

interface StatsIconProps {
  color?: string
  width?: number
  height?: number
}

export const StatsIcon = ({color = color_token.gray900, width = 24, height = 24}: StatsIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1.63867 13.3887C5.08102 13.51 8.03903 12.4184 10.4781 9.99267C12.8998 7.56692 13.9723 4.56939 13.8858 1.15601C18.4353 1.95304 21.6355 5.45305 22.3447 9.64614C18.9196 9.52485 15.9443 10.6164 13.5053 13.0595C11.0835 15.4853 10.0283 18.4828 10.1148 21.8962C5.49618 21.0818 2.3306 17.4259 1.65597 13.4061L1.63867 13.3887Z"
        fill={color}
      />
      <Path
        d="M22.4996 11.7597C22.465 17.3216 17.9328 21.9998 12.2417 21.9998C11.619 16.0914 16.8776 11.1013 22.4996 11.7597Z"
        fill={color}
      />
      <Path
        d="M11.7579 1C12.2941 7.23765 6.86246 11.8986 1.5 11.2575C1.5 5.86883 5.94565 1.03465 11.7579 1Z"
        fill={color}
      />
    </Svg>
  )
}
