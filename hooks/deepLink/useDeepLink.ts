import React, {useEffect} from 'react'
import {Linking} from 'react-native'

const useDeepLink = (observer?: (url: string) => void) => {
  useEffect(() => {
    const handleDeepLink = (event: {url: string}) => {
      if (observer && event.url) {
        console.log('딥링크 감지:', event.url)
        observer(event.url)
      }
    }

    const subscription = Linking.addEventListener('url', handleDeepLink)

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url})
    })

    return () => subscription.remove()
  }, [observer])

  return {}
}

export default useDeepLink
