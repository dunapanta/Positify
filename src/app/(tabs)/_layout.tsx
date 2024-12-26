import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import { Tabs, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
//import { Skottie } from "react-native-skottie";
import * as Haptics from "expo-haptics";

import { COLORS, icons, images, FONTS, SIZES } from "@/src/constants";
import { FontAwesome } from "@expo/vector-icons";

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
        "/affirmationscroll", "/affirmationaudio"
    ];
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.activeTab,

                    tabBarLabelStyle: {
                        ...FONTS.tabBarTitle,

                        //marginTop: 5,
                    },
                    tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: COLORS.weeklyColor15 }} />,
                    tabBarStyle: {
                        display: pathsHiddeTabBar.includes(path) ? "none" : "flex",
                        /*  backgroundColor: COLORS.white,
                         position: "relative",
                         height: 50,
                         justifyContent: "center",
                         alignItems: "center", */

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
                        title: t("tabsNav.home"),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? COLORS.activeTab : COLORS.secondary,
                                    ...FONTS.tabBarTitle,
                                }}
                            >
                                {t("tabsNav.home")}
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.activeTab : COLORS.secondary,
                            }}
                        />,
                    }}
                />

                {/* Search */}
                <Tabs.Screen
                    name="(search)"
                    listeners={() => ({
                        tabPress: () => {
                            Haptics.selectionAsync();
                        },
                    })}
                    options={{
                        title: t("tabsNav.search"),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? COLORS.activeTab : COLORS.secondary,
                                    ...FONTS.tabBarTitle,
                                }}
                            >
                                {t("tabsNav.search")}
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 22,
                                tintColor: focused ? COLORS.activeTab : COLORS.secondary,
                            }}
                        />,
                    }}

                />

                {/* Afirmation Scroll */}
                <Tabs.Screen
                    name="(affirmationscroll)"
                    options={{
                        href: null,
                    }}
                />
                {/* Afirmation Audio */}
                <Tabs.Screen
                    name="(affirmationaudio)"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    );
};

export default Layout;
