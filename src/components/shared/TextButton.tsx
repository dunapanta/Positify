import React from 'react';
import { Pressable, Text } from 'react-native';
import { FONTS, COLORS } from '@/src/constants';

interface TextButtonProps {
    contentContainerStyle?: any;
    disabled?: boolean;
    label: string;
    labelStyle?: any;
    onPress: () => void;
}

export const TextButton = ({
    contentContainerStyle,
    disabled,
    label,
    labelStyle,
    onPress,
}: TextButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: pressed ? COLORS.primaryDark : COLORS.primary,
                    ...contentContainerStyle,
                },
            ]}
            disabled={disabled}
            onPress={onPress}>
            <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
                {label}
            </Text>
        </Pressable>
    );
};

export default TextButton;
