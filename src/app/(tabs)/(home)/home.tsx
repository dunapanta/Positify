import React from 'react'
import { View, Text, StatusBar, Image } from 'react-native'
import Lottie from "lottie-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTS, images, SIZES } from '@/src/constants'
import { WelcomeText } from '@/src/components/home';

const Home = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />

            <WelcomeText />
            {/* Header */}
            <View style={{ overflow: "hidden" }}>
                <Image
                    source={images.homeBackground}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        position: "absolute",
                        top: 0,

                    }}
                />
                {/* Animation */}
                <View
                    style={{
                        top: SIZES.height * 0.07,
                        paddingVertical: SIZES.height * 0.08,
                    }}
                >
                    <Lottie
                        source={require("@/src/assets/animations/hello.json")}
                        autoPlay
                        loop
                        style={{
                            width: SIZES.width * 0.45,
                            height: SIZES.width * 0.45,
                            alignSelf: "center",
                        }}
                    />
                </View>
            </View>
            <LinearGradient
                colors={['#ffffff', COLORS.primaryDarker]} // Gradiente transparente al color principal
                style={{
                    marginTop: -30, // Superposición del card al header
                    alignSelf: 'center',
                    width: '90%',
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    padding: SIZES.padding,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5, // Sombra en Android
                }}
            >
                <Text style={{
                    ...FONTS.h2,
                    color: COLORS.secondaryLight,
                }}>10 of 120</Text>
                <Text style={{
                    ...FONTS.h3,
                    color: COLORS.secondaryLight,
                }}>Day challenge</Text>
            </LinearGradient>
        </View>
    )
}

export default Home
