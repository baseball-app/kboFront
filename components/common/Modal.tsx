import React, {useEffect} from 'react'
import {Modal as RNModal, ModalProps} from 'react-native'

const Modal = (props: ModalProps) => {
  return <RNModal {...props}>{props.children}</RNModal>
}

export {Modal}
