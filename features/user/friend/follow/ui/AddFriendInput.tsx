import React, {useRef, useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useFollowFriend} from '../model'

const AddFriendInput = () => {
  const inputRef = useRef<TextInput>(null)
  const [inviteCode, setInviteCode] = useState<string | undefined>(undefined)
  const {follow} = useFollowFriend()

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
      <TouchableOpacity
        style={[styles.inviteCodeInputButton, !inviteCode && {backgroundColor: '#D0CEC7'}]} //
        disabled={!inviteCode}
        onPress={() => {
          inputRef.current?.blur()
          inviteCode &&
            follow(inviteCode).finally(() => {
              setInviteCode(undefined)
            })
        }}>
        <Text style={[styles.inviteCodeInputButtonText, !inviteCode && {color: '#77756C'}]}>확인</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inviteCodeInputBox: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: '#F3F2EE',
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingLeft: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0CEC7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inviteCodeInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171716',
    maxWidth: '60%',
  },
  inviteCodeInputButton: {
    backgroundColor: '#1E5EF4',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  inviteCodeInputButtonText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: '#FFFFFF',
  },
})

export {AddFriendInput}
