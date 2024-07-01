import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './router';

export type CalendarScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  '홈'
>;

export interface CalendarScreenProps {
  navigation: CalendarScreenNavigationProp;
}
