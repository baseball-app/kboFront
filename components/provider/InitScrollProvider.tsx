import {useSegments} from 'expo-router'
import React, {useEffect, useRef} from 'react'
import {ScrollView, StyleProp, ViewStyle} from 'react-native'

const InitScrollProvider = ({children, style}: {children: React.ReactNode; style?: StyleProp<ViewStyle>}) => {
  const segments = useSegments()
  const ref = useRef<ScrollView>(null)
  useEffect(() => {
    ref.current?.scrollTo({y: 0})
  }, [segments])

  return (
    <ScrollView ref={ref} style={[{flex: 1, backgroundColor: '#fff'}, style]}>
      {children}
    </ScrollView>
  )
}

export {InitScrollProvider}
