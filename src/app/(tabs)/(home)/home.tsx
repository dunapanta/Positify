import React from 'react'
import { View, Text, StatusBar, Image, Pressable } from 'react-native'
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
            <Pressable
            onPress={()=>{}}
            style={({ pressed }) => ({
                marginTop: -30,
                alignSelf: 'center',
                width: '90%',
                height: SIZES.height * 0.17,
                borderRadius: SIZES.radius,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
                opacity: pressed ? 0.8 : 1, // Opacidad al presionar
            })}
        >
            <LinearGradient
                colors={['#ffffff', COLORS.primaryDarker]}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderRadius: SIZES.radius,
                    overflow: 'hidden', // Asegura que la imagen no se desborde
                }}
            >
                {/* Contenedor del lado izquierdo */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center', // Centrado en el área izquierda
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    {/* Etiqueta diagonal */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 5,
                            left: -18,
                            transform: [{ rotate: '-30deg' }], // Rotación en diagonal
                            backgroundColor: COLORS.black, // Fondo negro
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            borderRadius: SIZES.radius / 2,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.body5,
                                color: COLORS.white, // Texto blanco
                                fontWeight: 'bold',
                            }}
                        >
                            Nueva afirmacion
                        </Text>
                    </View>

                    {/* Texto centrado */}
                    <Text
                        style={{
                            ...FONTS.h3,
                            textAlign: 'center',
                            color: COLORS.secondaryDarker,
                        }}
                    >
                        Your Weekly Affirmation:
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h2,
                            textAlign: 'center',
                            color: COLORS.primaryDarker,
                            marginTop: 5,
                        }}
                    >
                        Gratitude
                    </Text>
                </View>

                {/* Imagen en el lado derecho */}
                <View
                    style={{
                        flex: 1, // Ocupa la mitad derecha
                    }}
                >
                    <Image
                        source={images.homeBackground}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover', // La imagen cubre todo el espacio sin deformarse
                        }}
                    />
                </View>
            </LinearGradient>
        </Pressable>
        </View>
    )
}

export default Home
