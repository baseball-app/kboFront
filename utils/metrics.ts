import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

// Font scaling
export const scaleFontSize = (size: number) => {
    const scale = width / guidelineBaseWidth;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };
  
  // Advanced font scaling with min/max boundaries
  export const responsiveFontSize = (size: number, min?: number, max?: number) => {
    const calculatedSize = scaleFontSize(size);
    
    if (min && calculatedSize < min) return min;
    if (max && calculatedSize > max) return max;
    
    return calculatedSize;
  };