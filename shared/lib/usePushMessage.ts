import {
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
  requestPermission,
  AuthorizationStatus,
  onMessage,
} from '@react-native-firebase/messaging'
import {useEffect} from 'react'
import {create} from 'zustand'

type RemoteMessageCallback = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>

const usePushMessageStore = create<{
  deviceToken: string
  setDeviceToken: (deviceToken: string) => void
}>(set => ({
  deviceToken: '',
  setDeviceToken: deviceToken => set({deviceToken}),
}))

const messaging = getMessaging()

/**
 * 푸시 메시지 관리 등록 훅
 * @params foregroundMessageHandler: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void> 포어그라운드 메시지 처리 함수
 * @returns { deviceToken: string }
 */
const usePushMessage = (foregroundMessageHandler?: RemoteMessageCallback) => {
  const {deviceToken, setDeviceToken} = usePushMessageStore()

  useEffect(() => {
    const getFcmToken = async () => {
      try {
        // 권한 요청
        const authStatus = await requestPermission(messaging)
        const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL

        if (!enabled) throw new Error('Push permission denied.')

        const fcmToken = await getToken(messaging)
        setDeviceToken(fcmToken)

        console.log('FCM Token:', fcmToken)
      } catch (error) {
        console.error('getFcmToken :: ', error)
      }
    }

    getFcmToken()
  }, [setDeviceToken])

  useEffect(() => {
    const unsubscribe = onMessage(messaging, async remoteMessage => {
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
