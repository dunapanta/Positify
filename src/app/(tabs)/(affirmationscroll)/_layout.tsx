import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { COLORS } from "@/src/constants";

const Layout = () => {
    const { t } = useTranslation();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="affirmationscroll"
                    options={
                        {
                            //title: t("tabBar.affirmattionscroll"),
                        }
                    }
                />
            </Stack>
        </GestureHandlerRootView>
    );
};

export default Layout;
