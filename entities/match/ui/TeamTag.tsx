import {color_token} from '@/constants/theme';
import {Pressable, size} from '@/shared';
import {Txt} from '@/shared/ui';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
};

function TeamTag({name, isActive, onClick}: Props) {
  return (
    <Pressable onPress={onClick} style={[styles.tag, isActive && styles.tagActive]}>
      <Txt
        size={16}
        weight="semibold"
        color={color_token.gray900}
        style={[isActive && styles.textActive, {lineHeight: 24}]}>
        {name}
      </Txt>
    </Pressable>
  );
}

const MemoizedTeamTag = memo(TeamTag, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});

export {MemoizedTeamTag as TeamTag};

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    backgroundColor: color_token.gray200,
    borderColor: color_token.gray300,
    borderRadius: 999,
    paddingVertical: size(4),
    paddingHorizontal: size(12),
  },
  tagActive: {
    backgroundColor: color_token.primary_10,
    borderColor: color_token.primary,
  },
  textActive: {
    color: color_token.primary,
  },
});
