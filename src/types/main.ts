import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './router';

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  '홈'
>;

export interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}
