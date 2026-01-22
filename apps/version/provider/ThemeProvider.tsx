import React, {createContext, useContext, useMemo, useState} from 'react';
import {StyleSheet, TextStyle, useColorScheme} from 'react-native';

// const ThemeContext = createContext<{
//   mode: 'light' | 'dark'
//   theme: {
//     color: typeof color
//     font: (font: Font) => TextStyle
//   }
// }>({
//   mode: 'light',
//   theme: {
//     color: color,
//     font: font,
//   },
// })

// function ThemeProvider({children}: {children: React.ReactNode}) {
//   const colorScheme = useColorScheme()

//   const value = useMemo(
//     () => ({
//       mode: colorScheme,
//       theme: {color: color, font: font},
//     }),
//     [colorScheme],
//   )

//   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
// }

// const useDesignSystem = () => {
//   const context = useContext(ThemeContext)
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider')
//   }
//   return context
// }

// const {theme} = useDesignSystem()

// const ThemeStyleSheet = <T extends Record<string, StyleSheet.NamedStyles<T>>>(value: T): T => {
//   return StyleSheet.create(value)
// }

// const style = StyleSheet.create({title: theme.font('bold-16-100')})

// ThemeStyleSheet({})

// // style.title

// export {ThemeProvider, useDesignSystem}
