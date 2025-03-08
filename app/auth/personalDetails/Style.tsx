import { h } from "@/utils/Dimensions";
import { w } from "@/utils/Dimensions";
import { backgroundLight, text, textSecondary } from "@/constants/Colors";
import { StyleSheet, Platform } from "react-native";

export const createStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: w(24),

    },
    content: {
        flex: 1,
        paddingHorizontal: w(24),
    },
    title: {
        marginBottom: h(8),
    },
    subtitle: {
        marginBottom: h(32),
    },
    imageContainer: {
        alignSelf: 'center',
        marginVertical: h(24),
    },
    profileImage: {
        width: w(120),
        height: w(120),
        borderRadius: w(60),
    },
    imagePlaceholder: {
        width: w(120),
        height: w(120),
        borderRadius: w(60),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: textSecondary,
        borderStyle: 'dashed',
    },
    genderContainer: {
        gap: h(16),
    },
    genderButtons: {
        flexDirection: 'row',
        gap: w(12),
    },
    genderButton: {
        flex: 1,
    },
    selectedGender: {
        backgroundColor: 'red',
    },
    genderText: {
        fontSize: w(16),
        fontWeight: 'bold',
    },
    genderTextSelected: {
        color: text,
    },
    genderTextSecondary: {
        color: textSecondary,
    },
    datePickerButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: w(16),
        padding: w(16),
        gap: h(8),
        marginVertical: h(24),
    },
    dateContainer: {
        flexDirection: 'row',
        gap: w(16),
    },
    dateButton: {
        flex: 1,
    },
    selectedDate: {
        backgroundColor: 'red',
    },
    dateText: {
        fontSize: w(16),
        fontWeight: 'bold',
    },
    dateTextSelected: {
        color: text,
    },
    dateTextSecondary: {
        color: textSecondary,
    },
    button: {
        marginTop: h(32),
    },
    footer: {
        gap: w(12),
        marginVertical: h(34),
    },
    backButton: {
        flex: 1,
        minWidth: 0,
    },
    continueButton: {
        flex: 2,
    },
});
