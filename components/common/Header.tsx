import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {size, useAppRouter} from '@/shared';
import {color_token} from '@/constants/theme';
import {Txt} from '@/shared/ui';

type ButtonType = {
  onPress?: () => void;
  content: React.ReactNode;
};

type Props = {
  variants?: 'white' | 'transparent' | '#F3F2EE';
  hasBackButton?: boolean;
  rightButton?: ButtonType;
  leftButton?: ButtonType;
  title?: string | React.ReactNode;
  topInset?: number;
};

/**
 * TODO: variants 변경해야 함
 */
const Header = ({variants = 'white', leftButton, hasBackButton = true, rightButton, title, topInset = 0}: Props) => {
  const router = useAppRouter();

  const onBackButtonClick = () => {
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            variants === 'white' ? color_token.white : variants === '#F3F2EE' ? '#F3F2EE' : 'transparent',
          paddingTop: topInset + 18,
        },
      ]}>
      {leftButton ? (
        leftButton.onPress ? (
          <TouchableOpacity style={styles.icon} onPress={leftButton.onPress}>
            {leftButton.content}
          </TouchableOpacity>
        ) : (
          <View style={styles.icon}>{leftButton.content}</View>
        )
      ) : hasBackButton ? (
        <TouchableOpacity style={styles.icon} onPress={onBackButtonClick}>
          <Image source={require('@/assets/icons/back.png')} style={{width: 16, height: 28}} />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon} />
      )}
      {typeof title === 'string' ? (
        <Txt size={18} weight="semibold" color={color_token.black}>
          {title}
        </Txt>
      ) : (
        title
      )}
      {rightButton ? (
        rightButton.onPress ? (
          <TouchableOpacity style={styles.icon} onPress={rightButton.onPress}>
            {rightButton.content}
          </TouchableOpacity>
        ) : (
          <View style={styles.icon}>{rightButton.content}</View>
        )
      ) : (
        <View style={styles.icon} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: size(10),
    paddingHorizontal: size(24),
  },
  icon: {
    minWidth: size(28),
    minHeight: size(28),
  },
});
