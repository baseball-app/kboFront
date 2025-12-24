import React from 'react'
import {Alert, Linking} from 'react-native'
import VersionCheck from 'react-native-version-check'

type CheckVersionFunc = () => Promise<[isNeeded: boolean, storeUrl: string]>

interface AppVersionGuard {
  checkVersion: CheckVersionFunc
  showNeedUpdateAlert: (storeUrl: string) => void
}

function useAppVersionGuard(): AppVersionGuard {
  const checkVersion: CheckVersionFunc = async () => {
    try {
      const result = await VersionCheck.needUpdate({depth: 2, forceUpdate: true})
      return [result.isNeeded, result.storeUrl]
    } catch (e) {
      // error logging
      return [false, '']
    }
  }

  const showNeedUpdateAlert = (storeUrl: string) => {
    Alert.alert('업데이트 필요', '최신 버전으로 업데이트 해주세요.', [
      {
        text: '업데이트',
        style: 'default',
        onPress: () => Linking.openURL(storeUrl),
      },
    ])
  }

  return {checkVersion, showNeedUpdateAlert}
}

export {useAppVersionGuard}

// const main = async () => {
//     const [isNeeded, storeUrl] = await checkVersion()
//     if (isNeeded) {
//       showNeedUpdateAlert(storeUrl)
//     } else {
//       // onSuccess
//     }
//   }
