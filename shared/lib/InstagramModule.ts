import {NativeModules, Platform} from 'react-native';

interface InstagramModuleInterface {
  isInstagramInstalled(): Promise<boolean>;
}

const {InstagramModule} = NativeModules;

export const InstagramModuleNative: InstagramModuleInterface | null =
  Platform.OS === 'android' ? InstagramModule : null;
