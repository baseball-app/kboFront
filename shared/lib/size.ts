import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

/**
 * 375px 기준 디자인을 현재 화면 크기에 맞게 스케일링하는 함수
 * @param px - 375px 기준 디자인 크기
 * @returns 현재 화면 크기에 맞게 스케일링된 크기
 */
function size(px: number): number {
  return (SCREEN_WIDTH / BASE_WIDTH) * px;
}

export {size};
