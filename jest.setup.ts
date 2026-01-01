import * as ReactNative from 'react-native'
import {jest} from '@jest/globals'

// Mock global NativeUnimoduleProxy
;(global as any).NativeUnimoduleProxy = {
  modulesConstants: {},
  callMethod: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
}

// Mocking dependencies
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useSegments: jest.fn(),
}))

// Mock expo-media-library
jest.mock('expo-media-library', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({status: 'granted'})),
  getPermissionsAsync: jest.fn(() => Promise.resolve({status: 'granted'})),
  createAssetAsync: jest.fn(() => Promise.resolve({id: 'mock-asset-id'})),
  getAssetsAsync: jest.fn(() => Promise.resolve({assets: [], hasNextPage: false, endCursor: ''})),
  getAssetInfoAsync: jest.fn(() => Promise.resolve({id: 'mock-asset-id', filename: 'mock.jpg'})),
  deleteAssetsAsync: jest.fn(() => Promise.resolve()),
  MediaType: {
    photo: 'photo',
    video: 'video',
    audio: 'audio',
    unknown: 'unknown',
  },
  SortBy: {
    default: 'default',
    id: 'id',
    mediaType: 'mediaType',
    width: 'width',
    height: 'height',
    creationTime: 'creationTime',
    modificationTime: 'modificationTime',
    duration: 'duration',
  },
}))

// Mock expo modules
jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  EventEmitter: jest.fn(),
  requireNativeViewManager: jest.fn(),
  requireNativeModule: jest.fn(() => ({
    requestMediaLibraryPermissionsAsync: jest.fn(),
    launchImageLibraryAsync: jest.fn(),
  })),
  UnavailabilityError: jest.fn(),
}))

// Mock expo constants
jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    appOwnership: 'expo',
    expoVersion: '50.0.0',
    installationId: 'mock-installation-id',
    sessionId: 'mock-session-id',
    platform: {
      ios: {
        platform: 'ios',
        model: 'iPhone',
        osVersion: '15.0',
      },
      android: {
        platform: 'android',
        model: 'Android',
        osVersion: '11.0',
      },
    },
  },
}))

// Mock expo-file-system
jest.mock('expo-file-system', () => ({
  documentDirectory: 'file:///mock/document/directory/',
  cacheDirectory: 'file:///mock/cache/directory/',
  writeAsStringAsync: jest.fn(() => Promise.resolve()),
  readAsStringAsync: jest.fn(() => Promise.resolve('mock content')),
  deleteAsync: jest.fn(() => Promise.resolve()),
  makeDirectoryAsync: jest.fn(() => Promise.resolve()),
  readDirectoryAsync: jest.fn(() => Promise.resolve([])),
  getInfoAsync: jest.fn(() => Promise.resolve({exists: true, isDirectory: false})),
}))

// Mock react-native-view-shot
jest.mock('react-native-view-shot', () => {
  const React = require('react')
  const {View} = require('react-native')

  return {
    __esModule: true,
    default: React.forwardRef((props: any, ref: any) => {
      return React.createElement(View, {...props, ref})
    }),
    captureRef: jest.fn(() => Promise.resolve('mock-image-uri')),
    captureScreen: jest.fn(() => Promise.resolve('mock-image-uri')),
  }
})

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: {
    show: jest.fn(),
    hide: jest.fn(),
  },
  BaseToast: jest.fn(),
  ErrorToast: jest.fn(),
  InfoToast: jest.fn(),
  SuccessToast: jest.fn(),
}))

// Mock react-native-share
jest.mock('react-native-share', () => ({
  open: jest.fn(),
  shareSingle: jest.fn(),
  Social: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    WHATSAPP: 'whatsapp',
  },
}))

// Mock react-native-config
jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    API_URL: 'http://localhost:3000',
    ENV: 'test',
  },
}))

// Mock @react-native-firebase/messaging
jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: () => ({
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    hasPermission: jest.fn(() => Promise.resolve(true)),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    setBackgroundMessageHandler: jest.fn(),
    onTokenRefresh: jest.fn(),
    deleteToken: jest.fn(() => Promise.resolve()),
    isDeviceRegisteredForRemoteMessages: jest.fn(() => Promise.resolve(true)),
    registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
    unregisterDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
    getAPNSToken: jest.fn(() => Promise.resolve('mock-apns-token')),
    setAPNSToken: jest.fn(() => Promise.resolve()),
    isAutoInitEnabled: jest.fn(() => true),
    setAutoInitEnabled: jest.fn(() => Promise.resolve()),
  }),
  FirebaseMessagingTypes: {
    AuthorizationStatus: {
      NOT_DETERMINED: -1,
      DENIED: 0,
      AUTHORIZED: 1,
      PROVISIONAL: 2,
    },
    NotificationType: {
      UNKNOWN: 0,
      RECEIVED: 1,
      OPENED: 2,
    },
  },
}))

// Avoid log pollution with emulator URL remap messages during testing
// eslint-disable-next-line no-console
const logOrig = console.log
const logWithRemapMessageRemoved = (message?: any, ...optionalParams: any[]): void => {
  if (
    // Make sure it is a string before attempting to filter it out
    (typeof message !== 'string' && !(message instanceof String)) ||
    !message.includes('android_bypass_emulator_url_remap')
  ) {
    logOrig(message, ...optionalParams)
  }
}
// eslint-disable-next-line no-console
console.log = logWithRemapMessageRemoved

jest.doMock('react-native', () => {
  // @ts-ignore - react-native empty bridge config so native modules at least default init
  global.__fbBatchedBridgeConfig = {}

  // @ts-ignore - react-native new architecture interop flag to true
  global.RN$TurboInterop = true

  // make sure PlatformConstants is visible otherwise turbo modules default init fails
  ReactNative.NativeModules['PlatformConstants'] = {}

  return Object.setPrototypeOf(
    {
      Platform: {
        OS: 'android',
        select: jest.fn((obj: any) => obj.android || obj.default),
        Version: '1.0.0',
        isPad: false,
        isTVOS: false,
        isTesting: true,
      },
      AppRegistry: {
        registerHeadlessTask: jest.fn(),
      },
      NativeModules: {
        ...ReactNative.NativeModules,
        RNFBAnalyticsModule: {
          logEvent: jest.fn(),
        },
        RNFBAppModule: {
          NATIVE_FIREBASE_APPS: [
            {
              appConfig: {
                name: '[DEFAULT]',
              },
              options: {},
            },

            {
              appConfig: {
                name: 'secondaryFromNative',
              },
              options: {},
            },
          ],
          FIREBASE_RAW_JSON: '{}',
          addListener: jest.fn(),
          eventsAddListener: jest.fn(),
          eventsNotifyReady: jest.fn(),
          removeListeners: jest.fn(),
        },
        RNFBAuthModule: {
          APP_LANGUAGE: {
            '[DEFAULT]': 'en-US',
          },
          APP_USER: {
            '[DEFAULT]': 'jestUser',
          },
          addAuthStateListener: jest.fn(),
          addIdTokenListener: jest.fn(),
          setTenantId: jest.fn(),
          useEmulator: jest.fn(),
          configureAuthDomain: jest.fn(),
        },
        RNFBCrashlyticsModule: {},
        RNFBDatabaseModule: {
          on: jest.fn(),
          useEmulator: jest.fn(),
        },
        RNFBFirestoreModule: {
          settings: jest.fn(),
          documentSet: jest.fn(),
        },
        RNFBMessagingModule: {
          onMessage: jest.fn(),
        },
        RNFBPerfModule: {},
        RNFBConfigModule: {
          onConfigUpdated: jest.fn(),
        },
        RNFBStorageModule: {
          useEmulator: jest.fn(),
        },
        RNShare: {
          open: jest.fn(),
          shareSingle: jest.fn(),
        },
        RNCConfigModule: {
          getConfig: jest.fn(() => ({
            API_URL: 'http://localhost:3000',
            ENV: 'test',
          })),
        },
      },
    },
    ReactNative,
  )
})

// '@react-native-firebase/messaging'

// import {
//   FirebaseMessagingTypes,
//   getMessaging,
//   getToken,
//   requestPermission,
//   AuthorizationStatus,
//   onMessage,
// } from '@react-native-firebase/messaging'

// jest.mock('@react-native-firebase/messaging', () => ({
//   getMessaging: () => {},
// }))

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() =>
    Promise.resolve({
      granted: true,
      canAskAgain: true,
      status: 'granted',
    }),
  ),
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [
        {
          uri: 'file:///mock/image.jpg',
          width: 100,
          height: 100,
          type: 'image',
          fileName: 'mock-image.jpg',
          fileSize: 1000,
        },
      ],
    }),
  ),
  MediaTypeOptions: {
    Images: 'images',
    Videos: 'videos',
    All: 'all',
  },
}))
