import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
                    name="affirmationaudio"
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
