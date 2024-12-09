import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useStorage } from '@/src/store';
import { COLORS, FONTS, SIZES } from '@/src/constants';

export const WelcomeText = () => {
    const { top, } = useSafeAreaInsets();
    const { username } = useStorage();
    const { t } = useTranslation();
    return (
        <View
            style={{
                zIndex: 10,
                position: "absolute",
                backgroundColor: "transparent",
                flexDirection: "row",
                top: top + SIZES.height * 0.03,
                width: "100%",         // Asegura que el contenedor ocupe todo el ancho
                justifyContent: "center",  // Centra horizontalmente
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    ...FONTS.h2,
                    color: COLORS.secondaryDarker,

                }}
            >
                {t("home.hello")},{' '}
                <Text
                    style={{
                        ...FONTS.usernameText,
                        color: COLORS.secondaryDarker,
                    }}
                >
                    {username || "Usuario"}
                </Text>
            </Text>
        </View>
    )
}
