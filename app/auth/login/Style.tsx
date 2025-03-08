import { StyleSheet } from "react-native";
import { w, h } from '@/utils/Dimensions';
import { backgroundLight } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundLight,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: w(24),
        paddingTop: h(60),
        paddingBottom: h(24),
    },
    title: {
        marginBottom: h(8),
    },
    subtitle: {
        marginBottom: h(32),
    },
    socialButtons: {
        gap: h(16),
        marginBottom: h(32),
    },
    socialButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: h(32),
        gap: w(16),
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    form: {
        gap: h(16),
        marginBottom: h(32),
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: h(-8),
        marginBottom: h(8),
    },
    button: {
        marginTop: 'auto',
        marginBottom: h(24),
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: h(32),
    },
    registerButton: {
        minWidth: 0,
        paddingHorizontal: w(8),
    },
    toggleMethod: {
        alignSelf: 'center',
        marginTop: h(8),
    },
});
