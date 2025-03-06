export const TEAMS = [
  {id: 1, name: 'LG 트윈스', shortName: 'LG', logo: require('../assets/team_logo/LG.png')},
  {id: 2, name: 'KT 위즈', shortName: 'KT', logo: require('../assets/team_logo/KT.png')},
  {
    id: 3,
    name: 'SSG 랜더스',
    shortName: 'SSG',
    logo: require('../assets/team_logo/SSG.png'),
  },
  {
    id: 4,
    name: 'NC 다이노스',
    shortName: 'NC',
    logo: require('../assets/team_logo/NC.png'),
  },
  {
    id: 5,
    name: '두산 베어스',
    shortName: '두산',
    logo: require('../assets/team_logo/DOOSAN.png'),
  },
  {
    id: 6,
    name: 'KIA 타이거즈',
    shortName: 'KIA',
    logo: require('../assets/team_logo/KIA.png'),
  },
  {
    id: 7,
    name: '롯데 자이언츠',
    shortName: '롯데',
    logo: require('../assets/team_logo/LOTTE.png'),
  },
  {
    id: 8,
    name: '삼성 라이온즈',
    shortName: '삼성',
    logo: require('../assets/team_logo/SAMSUNG.png'),
  },
  {
    id: 9,
    name: '한화 이글스',
    shortName: '한화',
    logo: require('../assets/team_logo/HANWHA.png'),
  },
  {
    id: 10,
    name: '키움 히어로즈',
    shortName: '키움',
    logo: require('../assets/team_logo/KIWOOM.png'),
  },
] as const

export const findTeamById = (id?: number) => TEAMS.find(team => team.id === id)

export type Team = (typeof TEAMS)[number]

export const PROFILE_IMAGES = [
  {id: 1, image: require('@/assets/profile_images/ball.png')},
  {id: 2, image: require('@/assets/profile_images/bat.png')},
  {id: 3, image: require('@/assets/profile_images/glove.png')},
] as const

export const findProfileImageById = (id?: number) => PROFILE_IMAGES.find(image => image.id === id)?.image

export const DEFAULT_PROFILE_IMAGE = require('../assets/profile_images/profile.png')

export type ProfileImage = (typeof PROFILE_IMAGES)[number]
