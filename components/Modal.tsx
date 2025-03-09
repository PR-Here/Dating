import { EModalType } from '@/types/ModalType';
import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'center';
  height?: number;
  closeOnBackdropPress?: boolean;
  avoidKeyboard?: boolean;
}

const SCREEN = Dimensions.get('window');

export const MyModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  position = EModalType.BOTTOM,
  height,
  closeOnBackdropPress = true,
  avoidKeyboard = true,
}) => {
  function getInitialPosition() {
    switch (position) {
      case EModalType.TOP:
        return -SCREEN.height;
      case EModalType.BOTTOM:
        return SCREEN.height;
      case EModalType.CENTER:
        return SCREEN.height / 4;
      default:
        return SCREEN.height;
    }
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={closeOnBackdropPress ? onClose : undefined}
      avoidKeyboard={avoidKeyboard}
      onBackButtonPress={onClose}
    >
      <View style={[styles.backdrop,]}>
        <View style={[styles.modal, { height }]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  backdrop: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
});
