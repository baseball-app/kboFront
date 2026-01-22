import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useFollowFriend} from '../model';
import {color_token} from '@/constants/theme';
import {size} from '@/shared';
import {Pressable, Txt} from '@/shared/ui';

const AddFriendInput = () => {
  const inputRef = useRef<TextInput>(null);
  const [inviteCode, setInviteCode] = useState<string | undefined>(undefined);
  const {follow} = useFollowFriend();

  return (
    <View style={styles.inviteCodeInputBox}>
      <TextInput
        placeholder="초대코드를 입력해주세요"
        style={styles.inviteCodeInput}
        value={inviteCode}
        onChangeText={setInviteCode}
        placeholderTextColor="#95938B"
        ref={inputRef}
      />
      <Pressable
        style={[styles.inviteCodeInputButton, !inviteCode && {backgroundColor: color_token.gray350}]} //
        disabled={!inviteCode}
        onPress={() => {
          inputRef.current?.blur();
          inviteCode &&
            follow(inviteCode).finally(() => {
              setInviteCode(undefined);
            });
        }}>
        <Txt size={14} weight="medium" color={!inviteCode ? color_token.gray600 : color_token.white}>
          확인
        </Txt>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inviteCodeInputBox: {
    marginHorizontal: size(20),
    marginTop: size(14),
    backgroundColor: color_token.white,
    paddingVertical: size(12),
    paddingHorizontal: size(14),
    paddingLeft: size(16),
    borderRadius: size(10),
    borderWidth: 1,
    borderColor: color_token.gray350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inviteCodeInput: {
    fontSize: size(16),
    fontWeight: '400',
    color: color_token.gray900,
    maxWidth: '60%',
  },
  inviteCodeInputButton: {
    backgroundColor: color_token.primary,
    paddingVertical: size(5),
    paddingHorizontal: size(14),
    borderRadius: size(4),
  },
});

export {AddFriendInput};
