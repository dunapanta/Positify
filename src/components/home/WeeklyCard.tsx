import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from "expo-haptics";

import { COLORS, FONTS, images, SIZES } from '@/src/constants';
import { useTranslation } from 'react-i18next';

export const WeeklyCard = () => {
    const { t } = useTranslation();
    return (
        <Pressable
            onPress={() => {
                Haptics.selectionAsync();
                // Navegar a la pantalla de la semana
            }}
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
                            {t("home.weeklyLabel")}
                        </Text>
                    </View>

                    {/* Texto centrado */}
                    <Text
                        style={{
                            ...FONTS.subheader2,
                            textAlign: 'center',
                            color: COLORS.secondaryLighter,
                            marginBottom: 5
                        }}
                    >
                        {t("home.weeklyTitle")}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.subheader1,
                            textAlign: 'center',
                            color: COLORS.secondaryDarker,
                            marginTop: 5,
                        }}
                    >
                        {t("home.weeklyTopic")}
                    </Text>
                </View>

                {/* Imagen en el lado derecho */}
                <View
                    style={{
                        flex: 1, // Ocupa la mitad derecha
                    }}
                >
                    <Image
                        source={images.weekly1}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover', // La imagen cubre todo el espacio sin deformarse
                        }}
                    />
                </View>
            </LinearGradient>
        </Pressable>
    )
}
