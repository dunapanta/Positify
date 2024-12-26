import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { COLORS, SIZES } from "@/src/constants";

const Layout = () => {
    const { t } = useTranslation();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
                screenOptions={
                    {
                        //headerShown: false,
                    }
                }
            >
                <Stack.Screen
                    name="search"
                    options={{
                        headerStyle: {
                            backgroundColor: COLORS.primaryLighter,
                        },
                        headerTitle: t("search.title"),
                    }}
                />
                {/*  <Stack.Screen name="bookdetail" options={{}} /> */}
            </Stack>
        </GestureHandlerRootView>
    );
};

export default Layout;
