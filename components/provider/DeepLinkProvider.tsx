import {findQueryValueByName} from '@/hooks/deepLink/findQueryValueByName'
import useDeepLink from '@/hooks/deepLink/useDeepLink'
import useMakeFriend from '@/hooks/my/useMakeFriend'
import React, {useEffect} from 'react'

const DeepLinkProvider = ({children}: {children: React.ReactNode}) => {
  // TODO: 여기에서 확실히 저장되는지 확인해야 함
  // 테스트 코드 작성하는 것도 좋을듯?
  // const {temporarySaveFriendInvitationCode, friendInvitationCodeList, addFriendList} = useMakeFriend()

  // 딥링크 감지하여 invitationCode가 있을 경우 임시 저장
  // useDeepLink(url => {
  //   const invitationCode = findQueryValueByName(url, 'code')
  //   console.log('invitationCode', invitationCode)
  //   if (invitationCode) {
  //     temporarySaveFriendInvitationCode(invitationCode)
  //   }
  // })

  // useEffect(() => {
  //   if (friendInvitationCodeList) addFriendList()
  // }, [friendInvitationCodeList])

  return <>{children}</>
}

export default DeepLinkProvider
