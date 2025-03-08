import { StyleSheet } from "react-native";
import { w, h } from '@/utils/Dimensions';
import { backgroundLight, text, textSecondary } from '@/constants/Colors';

export const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundLight,
    },
    header: {
        paddingHorizontal: w(24),
        paddingTop: h(60),
    },
    title: {
        marginBottom: h(8),
    },
    subtitle: {
        marginBottom: h(24),
    },
    formContainer: {
        flex: 1
    },
    button: {
        marginTop: h(24),
    },
    progressContainer: {
        marginTop: h(24),
    },
    progressDot: {
        width: w(10),
        height: w(10),
        borderRadius: w(5),
        backgroundColor: textSecondary,
    },
    activeDot: {
        backgroundColor: text,
    },
    completedDot: {
        backgroundColor: text,
    },
})
