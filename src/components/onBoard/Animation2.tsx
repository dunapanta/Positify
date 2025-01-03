import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useDynamicAnimation, MotiImage } from 'moti';
import { images, SIZES } from '@/src/constants';

interface Props {
    animate: boolean;
}

export const Animation2 = ({ animate }: Props) => {
    console.log("DIMENSIONS",SIZES.height);
    const motiImage1 = useDynamicAnimation(() => ({
        top: SIZES.height * 0.19,
        left: SIZES.height * 0.25,
    }));

    const motiImage3 = useDynamicAnimation(() => ({
        top: SIZES.height * 0.35,
        left: SIZES.height * 0.29,
    }));

    const motiImage4 = useDynamicAnimation(() => ({
        top: SIZES.height * 0.25,
        left: SIZES.height * 0.2,
    }));

    const motiImage5 = useDynamicAnimation(() => ({
        ttop: SIZES.height * 0.22,
        left: SIZES.height * 0.17,
    }));

    useEffect(() => {
        if (animate) {
            motiImage1.animateTo({
                top: SIZES.height * 0.11,
                left: SIZES.height * 0.09,
            });
            motiImage3.animateTo({
                top: SIZES.height < 1000 ? SIZES.height * 0.15 : SIZES.height * 0.1,
                left: SIZES.height < 1000 ? SIZES.height * 0.31 : SIZES.height * 0.5,
            });
            motiImage4.animateTo({
                top: SIZES.height * 0.4,
                left: SIZES.height * 0.07,
            });
            motiImage5.animateTo({
                top: SIZES.height * 0.4,
                left: SIZES.height < 1000 ? SIZES.height * 0.3 : SIZES.height * 0.5,
            });

        } else {
            motiImage1.animateTo({
                top: SIZES.height * 0.19,
                left: SIZES.height * 0.25,
            });
            motiImage3.animateTo({
                top: SIZES.height * 0.35,
                left: SIZES.height * 0.2,
            });
            motiImage4.animateTo({
                top: SIZES.height * 0.25,
                left: SIZES.height * 0.29,
            });
            motiImage5.animateTo({
                top: SIZES.height * 0.22,
                left: SIZES.height * 0.17,
            });

        }
    }, [animate]);

    return (
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <Image
                source={images.onBoard2}
                style={{
                    ...styles.image,
                    top: '40%',
                    left: '40%',
                    width: SIZES.width * 0.25,
                    height: SIZES.width * 0.38,
                    zIndex: 1,
                }}
            />

            <MotiImage state={motiImage1} source={images.onBoard4} style={styles.image} />
            <MotiImage state={motiImage3} source={images.onBoard5} style={styles.image} />
            <MotiImage state={motiImage4} source={images.onBoard3} style={styles.image} />
            <MotiImage state={motiImage5} source={images.onBoard7} style={styles.image} />

        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: SIZES.width * 0.228,
        height: SIZES.width * 0.35,
        zIndex: 0,
        borderRadius: SIZES.radius,
    },
});
