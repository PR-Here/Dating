import React from 'react';
import {
  View,
  StyleSheet,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { backgroundLight } from '@/constants/Colors';
import { w, h } from '@/utils/Dimensions';
import { EModalType } from '@/types/ModalType';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?:    EModalType;
  height?: number;
  width?: number;
  closeOnBackdropPress?: boolean;
  avoidKeyboard?: boolean;
  onBackdropPress?: () => void;
}

const SCREEN = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  position = 'bottom',
  height,
  width = SCREEN.width,
  closeOnBackdropPress = true,
  avoidKeyboard = true,
  onBackdropPress,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(getInitialPosition())).current;

  function getInitialPosition() {
    switch (position) {
      case EModalType.TOP:
        return -SCREEN.height;
      case EModalType.BOTTOM:
        return SCREEN.height;
      case EModalType.CENTER:
        return 0;
      default:
        return SCREEN.height;
    }
  }

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          mass: 0.8,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: getInitialPosition(),
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);

  const modalStyle = React.useMemo(() => ({
    ...styles.modal,
    ...(position === 'bottom' && styles.bottomModal),
    ...(position === 'top' && styles.topModal),
    ...(position === 'center' && styles.centerModal),
    ...(height && { height }),
    ...(width && { width }),
  }), [position, height, width]);

  return (
    <RNModal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.backdrop,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableWithoutFeedback onPress={closeOnBackdropPress ? onClose : onBackdropPress}>
            <View style={styles.backdropTouchable} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={[
            modalStyle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          {(position === 'bottom' || position === 'top') && (
            <View style={styles.handle} />
          )}
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  modal: {
    backgroundColor: backgroundLight,
    borderRadius: w(24),
    padding: w(16),
    margin: w(16),
    maxHeight: SCREEN.height * 0.9,
    zIndex: 1,
  },
  bottomModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: w(24),
    borderTopRightRadius: w(24),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: Platform.OS === 'ios' ? h(34) : h(24),
  },
  topModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: w(24),
    borderBottomRightRadius: w(24),
    paddingTop: Platform.OS === 'ios' ? h(44) : h(24),
  },
  centerModal: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  handle: {
    width: w(40),
    height: h(4),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: h(2),
    alignSelf: 'center',
    marginVertical: h(8),
  },
}); 