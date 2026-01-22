import React from 'react';
import {ModalProps, Modal as RNModal} from 'react-native';
const Modal = (props: ModalProps) => {
  return <RNModal {...props}>{props.children}</RNModal>;
};

export {Modal};
