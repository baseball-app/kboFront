import React, {useCallback, useMemo, useRef} from 'react'
import ViewShotComponent from 'react-native-view-shot'
import {StyleProp, ViewStyle} from 'react-native'

const useCaptureView = () => {
  const ref = useRef<any>(null)
  const onCaptureView = async () => {
    try {
      if (ref.current) {
        const uri = await ref.current?.capture()
        return {uri}
      }
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  const ViewShot = useCallback(({children, style}: {children: React.ReactNode; style?: StyleProp<ViewStyle>}) => {
    return (
      <ViewShotComponent
        ref={ref}
        options={{fileName: 'todaybaseball', format: 'png', quality: 0.9}} //
        style={style}>
        {children}
      </ViewShotComponent>
    )
  }, [])

  return {onCaptureView, ref, ViewShot}
}

export {useCaptureView}
