import React from 'react';
import { Image, View } from 'react-native';

import images from '@/src/constants/images';



export const Animation1 = () => {
    return (
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <Image
                source={images.onBoard1}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
        </View>
    );
};