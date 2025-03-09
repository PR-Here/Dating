import React from 'react';
import { View, StyleSheet, Modal as RNModal, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { backgroundLight } from '@/constants/Colors';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const MyModal = ({ visible, onClose, children }: ModalProps) => {
    const insets = useSafeAreaInsets();

    return (
        <RNModal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <TouchableOpacity 
                style={styles.backdrop} 
                activeOpacity={1} 
                onPress={onClose}
            >
                <View 
                    style={[
                        styles.content,
                        { paddingBottom: insets.bottom }
                    ]}
                >
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={e => e.stopPropagation()}
                    >
                        {children}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: backgroundLight,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
}); 