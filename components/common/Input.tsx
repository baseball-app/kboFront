import React from 'react'
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native'

interface InputProps extends TextInputProps {
  variant?: 'default' | 'multiline'
  label?: string
}

const Input = ({variant = 'default', style, label, ...props}: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.base, style, props.editable && styles.editable]}
        placeholderTextColor="#D0CEC7"
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'flex-start',
    gap: 4,
    flexDirection: 'column',
  },
  base: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderColor: '#D0CEC7',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#171716',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    flex: 1,
    minHeight: 45,
  },
  editable: {
    backgroundColor: '#F3F2EE',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20.8,
    color: '#171716',
  },
})
