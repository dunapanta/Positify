import { View, Image, Text, TouchableOpacity } from "react-native";
import { Tabs, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
//import { Skottie } from "react-native-skottie";
import * as Haptics from "expo-haptics";

import { COLORS, icons, images, FONTS, SIZES } from "@/src/constants";

/* const TabBarCustomButton = ({ onPress }: any) => {
    const { t } = useTranslation();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                top: -30,
                height: 65,
                width: 65,
                backgroundColor: COLORS.white,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
            }}
            activeOpacity={0.7}
        >
            <View>
                <Skottie
                    source={require("@/src/assets/animations/bulb.json")}
                    autoPlay
                    loop
                    style={{
                        width: 65,
                        height: 65,
                        alignSelf: "center",
                    }}
                />
            </View>
        </TouchableOpacity>
    );
}; */

const Layout = () => {
    const { t } = useTranslation();
    const path = usePathname();
    const pathsHiddeTabBar = [
        "/affirmationscroll",
    ];
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.activeTab,
                    headerBackground: () => (
                        <View style={{ height: 100, backgroundColor: COLORS.primary }} />
                    ),
                    tabBarStyle: {
                        display: pathsHiddeTabBar.includes(path) ? "none" : "flex",
                        position: "absolute",
                        bottom: 5,
                        left: 10,
                        right: 10,
                        borderWidth: 0.5,
                        borderColor: COLORS.activeTab,
                        elevation: 0,
                        borderRadius: 15,
                        backgroundColor: COLORS.white,
                        borderTopColor: "transparent",
                        height: SIZES.height * 0.1,
                    },
                }}
            >
                {/* Home */}
                <Tabs.Screen
                    name="(home)"
                    listeners={() => ({
                        tabPress: () => {
                            Haptics.selectionAsync();
                        },
                    })}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={icons.home}
                                    resizeMode="contain"
                                    style={{
                                        width: 32,
                                        height: 32,
                                        tintColor: focused ? COLORS.activeTab : COLORS.secondary,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: focused ? COLORS.activeTab : COLORS.secondary,
                                        ...FONTS.body4,
                                    }}
                                >
                                    {t("tabsNav.home")}
                                </Text>
                            </View>
                        ),
                    }}
                />

                {/* Afirmation Scroll */}
                <Tabs.Screen
                    name="(affirmationscroll)"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    );
};

export default Layout;
