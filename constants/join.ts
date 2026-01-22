export const PROFILE_IMAGES = [
  {id: 1, image: require('@/assets/profile_images/ball.png')},
  {id: 2, image: require('@/assets/profile_images/bat.png')},
  {id: 3, image: require('@/assets/profile_images/glove.png')},
] as const;

export const findProfileImageById = (id?: number) => PROFILE_IMAGES.find(image => image.id === id)?.image;

export const DEFAULT_PROFILE_IMAGE = require('../assets/profile_images/profile.png');

export type ProfileImage = (typeof PROFILE_IMAGES)[number];
