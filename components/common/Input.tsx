import {color_token} from '@/constants/theme';
import {size} from '@/shared';
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {Txt} from '@/shared/ui';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'multiline';
  label?: string | React.ReactNode;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({variant = 'default', editable = true, style, label, ...props}, ref) => {
    return (
      <View style={styles.container}>
        {label && typeof label === 'string' ? (
          <Txt size={14} weight="medium">
            {label}
          </Txt>
        ) : null}
        {label && typeof label !== 'string' ? label : null}
        <TextInput
          ref={ref}
          style={[styles.base, style, !editable && styles.editable]}
          editable={editable}
          placeholderTextColor="#D0CEC7"
          {...props}
        />
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'flex-start',
    gap: 4,
    flexDirection: 'column',
  },
  base: {
    paddingHorizontal: size(18),
    paddingVertical: size(10),
    paddingBottom: size(14),
    // paddingTop: 8,
    borderColor: color_token.gray350,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: size(5),
    backgroundColor: color_token.white,
    color: color_token.gray900,
    fontSize: size(16),
    fontWeight: '500',
    lineHeight: size(16 * 1.4),
    flex: 1,
    height: size(48),
    minHeight: size(48),
  },
  editable: {
    backgroundColor: color_token.gray150,
  },
});
