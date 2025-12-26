import {create} from 'zustand'

type FriendTicketInfo = {
  writer_id: number // 1
  game_id: number // 1
  id: number
}

type Friend = {
  id: number
  nickname: string
  profile_image: string
  profile_type: number
  ticket_info?: Partial<FriendTicketInfo>
}

const useSelectFriendStore = create<{
  friend: Friend | null
  selectFriend: (friend: Friend) => void
  clearSelectedFriend: () => void
}>(set => ({
  friend: null,
  selectFriend: friend => set({friend}),
  clearSelectedFriend: () => set({friend: null}),
}))

const useSelectFriend = () => {
  const {friend: selectedFriend} = useSelectFriendStore()

  // 친구가 오늘 작성한 ticket을 가지고 있다면 writer_id가 존재함
  const hasTicket = (friend: Friend) => Boolean(friend.ticket_info?.writer_id)

  // selectedFriend와 friend가 동일하다면 선택된 친구임
  const isSelected = (friend: Friend) => selectedFriend?.id === friend.id

  const Friend = (friend: Friend) => {
    return {
      hasTicket: () => hasTicket(friend),
      isSelected: () => isSelected(friend),
    }
  }

  Friend({
    id: 0,
    nickname: '종현',
    profile_image: '',
    profile_type: 1,
  }).hasTicket()

  return {}
}

export {useSelectFriend}
