import {FriendStatus} from '../types';

class FriendEntity {
  constructor(private friend: FriendStatus) {}

  // 친구가 오늘 작성한 ticket을 가지고 있다면 writer_id가 존재함
  hasTicket = () => Boolean(this.friend?.ticket_info?.writer_id);

  // targetFriend와 friend가 동일하다면 선택된 친구임
  isSame = (targetFriend: FriendStatus) => targetFriend?.id === this.friend?.id;

  get info() {
    return this.friend;
  }
}

new FriendEntity({
  id: 0,
  nickname: '종현',
  profile_image: '',
  profile_type: 1,
}).hasTicket();

export {FriendEntity};
