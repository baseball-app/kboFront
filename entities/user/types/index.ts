export type Profile = {
  nickname: string;
  predict_ratio: number;
  my_team: {
    id: number; // 3
    name: string; // 'LG 트윈스'
    logo_url: string; // 'https://image.com/'
  };
  followers: number; // 20
  followings: number; // 32
  profile_type: number; // 1
  id: number;
  is_unread: boolean;
};
