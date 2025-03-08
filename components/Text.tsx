import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { font } from '@/utils/Dimensions';
import { Typography } from '@/constants/Typography';
import { text, textSecondary } from '@/constants/Colors';
import { ETextType } from '@/types/TextType';

interface CustomTextProps extends TextProps {
    variant?: ETextType;
    color?: string;
    weight?: keyof typeof Typography.fontFamily;
}

export function Text({ 
    variant = ETextType.Body1,
    color = text,
    weight,
    style,
    children,
    ...props 
}: CustomTextProps) {
    const styles = useStyles();
    return (
        <RNText 
            style={[
                styles.base,
                styles[variant],
                weight && styles[weight],
                { color },
                style
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
}

const useStyles = () => StyleSheet.create({
    base: {
        fontFamily: Typography.fontFamily.regular,
    },
    // Variants
    h1: {
        fontSize: font(32),
        lineHeight: font(40),
    },
    h2: {
        fontSize: font(24),
        lineHeight: font(32),
    },
    h3: {
        fontSize: font(20),
        lineHeight: font(28),
    },
    body1: {
        fontSize: font(16),
        lineHeight: font(24),
    },
    body2: {
        fontSize: font(14),
        lineHeight: font(20),
    },
    caption: {
        fontSize: font(12),
        lineHeight: font(16),
        letterSpacing: 0.4,
    },
    caption2: {
        fontSize: font(10),
        lineHeight: font(14),
        letterSpacing: 0.4,
    },
    caption3: {
        fontSize: font(8),
        lineHeight: font(12),
        letterSpacing: 0.4,
    },
    // Weights
    regular: {
        fontFamily: Typography.fontFamily.regular,
    },
    medium: {
        fontFamily: Typography.fontFamily.medium,
    },
    semibold: {
        fontFamily: Typography.fontFamily.semibold,
    },
    bold: {
        fontFamily: Typography.fontFamily.bold,
    },
});