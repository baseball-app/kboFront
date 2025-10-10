import React from 'react'
import {Image} from 'react-native'

const MATCH_RESULT_IMAGE: Record<string, any> = {
  승리: require('@/assets/icons/emo/win.png'),
  패배: require('@/assets/icons/emo/lose.png'),
  무승부: require('@/assets/icons/emo/draw.png'),
  '경기 취소': require('@/assets/icons/emo/cancel.png'),
  취소: require('@/assets/icons/emo/cancel.png'),
}

type EmoProps = Props & {
  type: keyof typeof MATCH_RESULT_IMAGE
}

const Emoji = ({type, size}: EmoProps) => {
  return (
    <Image //
      source={MATCH_RESULT_IMAGE[type]}
      style={{width: size, height: size}}
    />
  )
}

type Props = {
  size: number
}

const WinEmoji = ({size}: Props) => {
  return <Emoji type="승리" size={size} />
}

const LoseEmoji = ({size}: Props) => {
  return <Emoji type="패배" size={size} />
}

const DrawEmoji = ({size}: Props) => {
  return <Emoji type="무승부" size={size} />
}

const CancelEmoji = ({size}: Props) => {
  return <Emoji type="경기 취소" size={size} />
}

export {WinEmoji, LoseEmoji, DrawEmoji, CancelEmoji}
