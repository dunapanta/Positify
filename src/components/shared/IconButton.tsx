import React from 'react';
import { Image, Pressable } from 'react-native';

interface IconButtonProps {
    containerStyle?: any;
    onPress: () => void;
    icon: any;
    iconStyle?: any;
    onLongPress?: () => void;
}

export const IconButton = ({
    containerStyle,
    onPress,
    icon,
    iconStyle,
    onLongPress
}: IconButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.8 : 1,
                    ...containerStyle,
                },
            ]}
            onLongPress={onLongPress ? onLongPress : () => {}}
            onPress={onPress}>
            <Image
                source={icon}
                resizeMode="contain"
                style={{ width: 30, height: 30, ...iconStyle }}
            />
        </Pressable>
    );
};

export default IconButton;
