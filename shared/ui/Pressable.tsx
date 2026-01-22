import React from 'react';
import {Pressable as RNPressable} from 'react-native';
import Animated from 'react-native-reanimated';

const Pressable = RNPressable;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export {Pressable, AnimatedPressable};
