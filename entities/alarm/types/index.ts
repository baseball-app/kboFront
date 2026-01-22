type NotificationType = 'FRIEND_FEEDBACK' | 'FRIEND_UPDATE';

type Notification = {
  id: number;
  user: number;
  user_info: {
    id: number;
    nickname: string;
    profile_image: string;
  };
  type: NotificationType; //'FRIEND_FEEDBACK' | 'FRIEND_UPDATE'
  is_read: boolean;
  created_at: string; // '2025-01-25T12:42:01.067Z'
  updated_at: string; // '2025-01-25T12:42:01.067Z'
  ticket: number;
};

export type {NotificationType, Notification};
