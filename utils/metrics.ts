import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal, likewise. from figma design
const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;

// height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, paddingVertical, likewise. from figma design
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

// font-size, borderRadius, likewise. from figma design
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };