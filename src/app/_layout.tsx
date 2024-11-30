import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/src/locales/i18n";
import { useStorage } from "@/src/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    //'Lato-SemiBold': require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { isOnBoardCompleted } = useStorage();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isOnBoardCompleted]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <I18nextProvider i18n={i18n}>
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        {/* <Stack.Screen name="username" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      </Stack>
    </I18nextProvider>
  );
}