import { responsiveFontSize } from './metrics';

export const typography = {
  // Headers
  h1: responsiveFontSize(32, 24, 36),
  h2: responsiveFontSize(28, 20, 32),
  h3: responsiveFontSize(24, 18, 28),
  h4: responsiveFontSize(20, 16, 24),
  
  // Body text
  bodyLarge: responsiveFontSize(18, 16, 20),
  bodyMedium: responsiveFontSize(16, 14, 18),
  bodySmall: responsiveFontSize(14, 12, 16),
  
  // Other
  caption: responsiveFontSize(12, 10, 14),
  button: responsiveFontSize(16, 14, 18),
  label: responsiveFontSize(14, 12, 16),
};