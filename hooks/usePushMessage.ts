import {Config} from '@/config/Config'
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging'
import {useEffect, useState} from 'react'
import {create} from 'zustand'

type RemoteMessageCallback = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>

const usePushMessageStore = create<{
  deviceToken: string
  setDeviceToken: (deviceToken: string) => void
}>(set => ({
  deviceToken: '',
  setDeviceToken: deviceToken => set({deviceToken}),
}))

/**
 * 푸시 메시지 관리 등록 훅
 * @params foregroundMessageHandler: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void> 포어그라운드 메시지 처리 함수
 * @returns { deviceToken: string }
 */
const usePushMessage = (foregroundMessageHandler?: RemoteMessageCallback) => {
  const {deviceToken, setDeviceToken} = usePushMessageStore()

  useEffect(() => {
    if (Config.MODE === 'production') return

    /**
     * FCM 토큰을 받습니다.
     */
    const getFcmToken = async () => {
      async function requestPermissionAndRegister() {
        const authStatus = await messaging().requestPermission()
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (enabled) {
          console.log('Authorization status:', authStatus)
          await messaging().registerDeviceForRemoteMessages()
          const fcmTokenInfo = await messaging().getToken()
          setDeviceToken(fcmTokenInfo)
        } else {
          throw new Error('Push permission denied.')
        }
      }

      try {
        await requestPermissionAndRegister()
        // await messaging().registerDeviceForRemoteMessages();
      } catch (error) {
        console.error('getFcmToken :: ', error)
      }
      // setFcmToken(fcmTokenInfo);
    }
    getFcmToken()
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📲 Foreground Push 수신됨:', remoteMessage)
      if (foregroundMessageHandler) {
        await foregroundMessageHandler(remoteMessage)
      }
    })

    return unsubscribe // 컴포넌트 unmount 시 정리
  }, [])

  return {deviceToken}
}

export {usePushMessage}
